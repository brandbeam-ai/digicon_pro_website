#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment of Digicon Pro Website...${NC}"


# Clone the repository
echo -e "${GREEN}Cloning the repository...${NC}"
cd /root
if [ -d "digicon_pro_website" ]; then
    echo -e "${YELLOW}Repository already exists. Pulling latest changes...${NC}"
    cd digicon_pro_website
    git pull
else
    echo -e "${GREEN}Cloning fresh repository...${NC}"
    git clone https://github.com/brandbeam-ai/digicon_pro_website.git
    cd digicon_pro_website
fi

# Install dependencies
echo -e "${GREEN}Installing npm dependencies...${NC}"
npm install

# Build the application
echo -e "${GREEN}Building the application...${NC}"
# Set Node.js memory limit and disable interactive prompts
export NODE_OPTIONS="--max-old-space-size=2048"
export NODE_ENV=production
npm run build

# Setup PM2 configuration
echo -e "${GREEN}Setting up PM2 configuration...${NC}"
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'digicon_pro_website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3016
    }
  }]
};
EOL

# Start or restart the application with PM2
echo -e "${GREEN}Starting the application with PM2...${NC}"
# Stop and delete existing process first (if it exists)
pm2 stop digicon_pro_website 2>/dev/null || true
pm2 delete digicon_pro_website 2>/dev/null || true
# Kill any process still using port 3016
lsof -ti :3016 | xargs kill -9 2>/dev/null || true
# Wait a moment for port to be released
sleep 2
# Start the application
pm2 start ecosystem.config.js
# Save the current PM2 state (after starting, not before)
pm2 save
# Setup PM2 startup script (only needs to be run once, but safe to run multiple times)
pm2 startup 2>/dev/null || true

# Configure firewall if ufw is available
if command -v ufw &> /dev/null; then
    echo -e "${GREEN}Configuring firewall...${NC}"
    ufw allow 3016/tcp
    ufw status
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Your application is now running at http://$(hostname -I | awk '{print $1}'):3016${NC}"
echo -e "${YELLOW}To check the status: pm2 status${NC}"
echo -e "${YELLOW}To view logs: pm2 logs digicon_pro_website${NC}"
