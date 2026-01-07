#!/bin/bash

# Nginx update script to add www.digicon.pro alongside digicon.pro
# This script updates the existing nginx configuration to support both domains
# Usage: bash update-nginx.sh

set -e

# Configuration
DOMAIN="digicon.pro"
WWW_DOMAIN="www.digicon.pro"
APP_PORT="3016"
EMAIL="digicon@digicon.pro"  # Change this to your email for SSL certificate notifications

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 Updating Nginx configuration to add ${WWW_DOMAIN}...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}❌ Please run as root (use sudo)${NC}"
  exit 1
fi

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${RED}❌ Nginx is not installed. Please run setup-nginx.sh first.${NC}"
    exit 1
fi

# Check if Certbot is installed
if ! command -v certbot &> /dev/null; then
    echo -e "${RED}❌ Certbot is not installed. Please run setup-nginx.sh first.${NC}"
    exit 1
fi

# Check if the existing configuration exists
if [ ! -f /etc/nginx/sites-available/${DOMAIN} ]; then
    echo -e "${RED}❌ Nginx configuration for ${DOMAIN} not found. Please run setup-nginx.sh first.${NC}"
    exit 1
fi

echo -e "${YELLOW}📝 Step 1: Backing up existing Nginx configuration...${NC}"
# Backup existing configuration
cp /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-available/${DOMAIN}.backup.$(date +%Y%m%d_%H%M%S)
echo -e "${GREEN}✅ Configuration backed up${NC}"

echo -e "${YELLOW}📝 Step 2: Updating Nginx configuration to include ${WWW_DOMAIN}...${NC}"

# Read the existing SSL configuration to preserve it
SSL_CONFIG=""
if grep -q "ssl_certificate" /etc/nginx/sites-available/${DOMAIN}; then
    # Extract SSL configuration from existing file
    SSL_CONFIG=$(grep -A 20 "ssl_certificate" /etc/nginx/sites-available/${DOMAIN} | head -n 20)
fi

# Create updated configuration with both domains
cat > /etc/nginx/sites-available/${DOMAIN} << EOF
# HTTP server - redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    # Logging
    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;

    # Redirect all HTTP to HTTPS
    return 301 https://\$host\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Logging
    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;

    # Client body size (for file uploads)
    client_max_body_size 50M;

    # Proxy settings for Next.js
    location / {
        proxy_pass http://localhost:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Chunked encoding support (fixes ERR_INCOMPLETE_CHUNKED_ENCODING)
        proxy_buffering off;
        proxy_request_buffering off;
        chunked_transfer_encoding on;
        
        # Timeouts (increased for large responses)
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Cache static files
    location /_next/static {
        proxy_pass http://localhost:${APP_PORT};
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Handle Next.js image optimization
    location /_next/image {
        proxy_pass http://localhost:${APP_PORT};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

echo -e "${GREEN}✅ Nginx configuration updated${NC}"

echo -e "${YELLOW}🧪 Step 3: Testing Nginx configuration...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors. Restoring backup...${NC}"
    cp /etc/nginx/sites-available/${DOMAIN}.backup.* /etc/nginx/sites-available/${DOMAIN} 2>/dev/null || true
    exit 1
fi

echo -e "${YELLOW}🔄 Step 4: Reloading Nginx...${NC}"
systemctl reload nginx
echo -e "${GREEN}✅ Nginx reloaded${NC}"

echo -e "${YELLOW}🔐 Step 5: Updating SSL certificate to include ${WWW_DOMAIN}...${NC}"
echo "This may take a few moments..."

# Update SSL certificate to include www subdomain
certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} --non-interactive --agree-tos --email ${EMAIL} --redirect --expand

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificate updated to include both domains${NC}"
else
    echo -e "${RED}❌ Failed to update SSL certificate${NC}"
    echo "Please check:"
    echo "  1. DNS records for ${WWW_DOMAIN} are pointing to this server"
    echo "  2. Port 80 and 443 are open in firewall"
    echo "  3. ${WWW_DOMAIN} is accessible from internet"
    echo ""
    echo -e "${YELLOW}⚠️  The configuration has been updated, but SSL certificate update failed.${NC}"
    echo -e "${YELLOW}⚠️  You may need to manually run: certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} --expand${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Step 6: Final Nginx reload...${NC}"
systemctl reload nginx

echo -e "${YELLOW}⚙️  Step 7: Testing SSL auto-renewal...${NC}"
# Test auto-renewal
certbot renew --dry-run

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL auto-renewal is configured for both domains${NC}"
else
    echo -e "${YELLOW}⚠️  SSL auto-renewal test had issues (but certificate is installed)${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Update completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📊 Configuration Summary:"
echo "  Primary Domain: ${DOMAIN}"
echo "  Additional Domain: ${WWW_DOMAIN}"
echo "  Backend Port: ${APP_PORT}"
echo "  SSL: Enabled for both domains"
echo ""
echo "🌐 Your site is now available at:"
echo "  https://${DOMAIN}"
echo "  https://${WWW_DOMAIN}"
echo ""
echo "📋 Useful commands:"
echo "  systemctl status nginx    - Check Nginx status"
echo "  systemctl reload nginx    - Reload Nginx configuration"
echo "  certbot renew             - Manually renew SSL certificate"
echo "  certbot certificates      - List all certificates"
echo "  tail -f /var/log/nginx/${DOMAIN}.access.log - View access logs"
echo "  tail -f /var/log/nginx/${DOMAIN}.error.log  - View error logs"
echo ""
echo "🔐 SSL Certificate will auto-renew before expiration for both domains"
echo ""

