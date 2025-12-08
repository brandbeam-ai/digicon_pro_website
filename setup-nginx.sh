#!/bin/bash

# Nginx configuration script with SSL for creator.digicon.pro
# This script should be run ON THE VULTR SERVER
# Usage: bash setup-nginx.sh

set -e

# Configuration
DOMAIN="digicon.pro"
APP_PORT="3023"
EMAIL="digicon@digicon.pro"  # Change this to your email for SSL certificate notifications

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 Setting up Nginx for ${DOMAIN}...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}❌ Please run as root (use sudo)${NC}"
  exit 1
fi

# Function to check and install system dependencies
check_and_install_dependencies() {
  echo -e "${YELLOW}🔍 Checking system dependencies...${NC}"
  
  # Detect package manager
  if command -v apt-get &> /dev/null; then
    PKG_MANAGER="apt-get"
    UPDATE_CMD="apt-get update -qq"
    INSTALL_CMD="apt-get install -y"
  elif command -v yum &> /dev/null; then
    PKG_MANAGER="yum"
    UPDATE_CMD="yum check-update -q || true"
    INSTALL_CMD="yum install -y"
  elif command -v dnf &> /dev/null; then
    PKG_MANAGER="dnf"
    UPDATE_CMD="dnf check-update -q || true"
    INSTALL_CMD="dnf install -y"
  else
    echo -e "${RED}❌ Unknown package manager. Please install dependencies manually.${NC}"
    exit 1
  fi
  
  # Update package list
  $UPDATE_CMD
  
  # Check and install Nginx
  if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📦 Nginx is not installed. Installing Nginx...${NC}"
    $INSTALL_CMD nginx
    if command -v nginx &> /dev/null; then
      echo -e "${GREEN}✅ Nginx installed: $(nginx -v 2>&1)${NC}"
    else
      echo -e "${RED}❌ Failed to install Nginx${NC}"
      exit 1
    fi
  else
    echo -e "${GREEN}✅ Nginx found: $(nginx -v 2>&1)${NC}"
  fi
  
  # Check and install Certbot
  if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}📦 Certbot is not installed. Installing Certbot...${NC}"
    if [ "$PKG_MANAGER" = "apt-get" ]; then
      $INSTALL_CMD certbot python3-certbot-nginx
    else
      # For RHEL/CentOS, install from EPEL or use snap
      if command -v snap &> /dev/null; then
        snap install --classic certbot
        ln -sf /snap/bin/certbot /usr/bin/certbot
      else
        $INSTALL_CMD certbot python3-certbot-nginx || {
          echo -e "${YELLOW}⚠️  Installing certbot from EPEL...${NC}"
          $INSTALL_CMD epel-release
          $INSTALL_CMD certbot python3-certbot-nginx
        }
      fi
    fi
    if command -v certbot &> /dev/null; then
      echo -e "${GREEN}✅ Certbot installed: $(certbot --version)${NC}"
    else
      echo -e "${RED}❌ Failed to install Certbot${NC}"
      exit 1
    fi
  else
    echo -e "${GREEN}✅ Certbot found: $(certbot --version)${NC}"
  fi
  
  # Check and install curl (needed for various operations)
  if ! command -v curl &> /dev/null; then
    echo -e "${YELLOW}📦 curl is not installed. Installing curl...${NC}"
    $INSTALL_CMD curl
    echo -e "${GREEN}✅ curl installed${NC}"
  else
    echo -e "${GREEN}✅ curl found${NC}"
  fi
  
  # Check and install wget (backup tool)
  if ! command -v wget &> /dev/null; then
    echo -e "${YELLOW}📦 wget is not installed. Installing wget...${NC}"
    $INSTALL_CMD wget
    echo -e "${GREEN}✅ wget installed${NC}"
  else
    echo -e "${GREEN}✅ wget found${NC}"
  fi
  
  # Ensure systemd is available (for service management)
  if ! command -v systemctl &> /dev/null; then
    echo -e "${RED}❌ systemctl is not available. This script requires systemd.${NC}"
    exit 1
  else
    echo -e "${GREEN}✅ systemctl found${NC}"
  fi
}

# Install dependencies if missing
check_and_install_dependencies

echo -e "${YELLOW}📝 Step 1: Creating initial Nginx configuration (HTTP only)...${NC}"

# Create initial HTTP-only configuration for Certbot verification
cat > /etc/nginx/sites-available/${DOMAIN} << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name clients.digicon.pro;

    # Logging
    access_log /var/log/nginx/clients.digicon.pro.access.log;
    error_log /var/log/nginx/clients.digicon.pro.error.log;

    # Client body size (for file uploads)
    client_max_body_size 50M;

    # Proxy settings for Next.js
    location / {
        proxy_pass http://localhost:3016;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
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
        proxy_pass http://localhost:3016;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Handle Next.js image optimization
    location /_next/image {
        proxy_pass http://localhost:3016;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

echo -e "${GREEN}✅ Nginx configuration created${NC}"

echo -e "${YELLOW}🔗 Step 2: Enabling site...${NC}"
# Create symbolic link to enable the site
ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}

# Remove default site if exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
    echo -e "${GREEN}✅ Removed default site${NC}"
fi

echo -e "${YELLOW}🧪 Step 3: Testing Nginx configuration...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Step 4: Reloading Nginx...${NC}"
systemctl reload nginx
echo -e "${GREEN}✅ Nginx reloaded${NC}"

echo -e "${YELLOW}🔐 Step 5: Setting up SSL certificate with Certbot...${NC}"
echo "This may take a few moments..."

# Stop Nginx temporarily for Certbot standalone mode (optional, we're using webroot)
# systemctl stop nginx

# Obtain SSL certificate
certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email ${EMAIL} --redirect

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificate obtained and configured${NC}"
else
    echo -e "${RED}❌ Failed to obtain SSL certificate${NC}"
    echo "Please check:"
    echo "  1. DNS records are pointing to this server"
    echo "  2. Port 80 and 443 are open in firewall"
    echo "  3. Domain is accessible from internet"
    exit 1
fi

echo -e "${YELLOW}🔄 Step 6: Final Nginx reload...${NC}"
systemctl reload nginx

echo -e "${YELLOW}⚙️  Step 7: Setting up auto-renewal for SSL certificate...${NC}"
# Test auto-renewal
certbot renew --dry-run

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL auto-renewal is configured${NC}"
else
    echo -e "${YELLOW}⚠️  SSL auto-renewal test had issues (but certificate is installed)${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📊 Configuration Summary:"
echo "  Domain: ${DOMAIN}"
echo "  Backend Port: ${APP_PORT}"
echo "  SSL: Enabled"
echo ""
echo "🌐 Your site is now available at:"
echo "  https://${DOMAIN}"
echo ""
echo "📋 Useful commands:"
echo "  systemctl status nginx    - Check Nginx status"
echo "  systemctl reload nginx    - Reload Nginx configuration"
echo "  certbot renew             - Manually renew SSL certificate"
echo "  certbot certificates      - List all certificates"
echo "  tail -f /var/log/nginx/clients.digicon.pro.access.log - View access logs"
echo "  tail -f /var/log/nginx/clients.digicon.pro.error.log  - View error logs"
echo ""
echo "🔐 SSL Certificate will auto-renew before expiration"
echo ""

