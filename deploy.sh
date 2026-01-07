#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment of Digicon Pro Website...${NC}"

# Detect OS and install necessary packages
echo -e "${GREEN}Checking and installing system dependencies...${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Detect package manager
if command_exists apt-get; then
    # Debian/Ubuntu
    PKG_MANAGER="apt-get"
    UPDATE_CMD="apt-get update -qq"
    INSTALL_CMD="apt-get install -y -qq"
    BUILD_ESSENTIAL="build-essential"
elif command_exists yum; then
    # CentOS/RHEL
    PKG_MANAGER="yum"
    UPDATE_CMD="yum check-update -q || true"
    INSTALL_CMD="yum install -y -q"
    BUILD_ESSENTIAL="gcc gcc-c++ make"
elif command_exists dnf; then
    # Fedora
    PKG_MANAGER="dnf"
    UPDATE_CMD="dnf check-update -q || true"
    INSTALL_CMD="dnf install -y -q"
    BUILD_ESSENTIAL="gcc gcc-c++ make"
else
    echo -e "${RED}Unsupported package manager. Please install dependencies manually.${NC}"
    exit 1
fi

# Update package list
echo -e "${YELLOW}Updating package list...${NC}"
$UPDATE_CMD || true

# Install essential build tools
if ! command_exists gcc || ! command_exists make; then
    echo -e "${GREEN}Installing build tools...${NC}"
    $INSTALL_CMD $BUILD_ESSENTIAL
fi

# Install Git if not present
if ! command_exists git; then
    echo -e "${GREEN}Installing Git...${NC}"
    $INSTALL_CMD git
fi

# Install Python3 (required for some native modules)
if ! command_exists python3; then
    echo -e "${GREEN}Installing Python3...${NC}"
    $INSTALL_CMD python3
fi

# Install lsof (for port checking)
if ! command_exists lsof; then
    echo -e "${GREEN}Installing lsof...${NC}"
    $INSTALL_CMD lsof
fi

# Install curl (required for Node.js installation script)
if ! command_exists curl; then
    echo -e "${GREEN}Installing curl...${NC}"
    $INSTALL_CMD curl
fi

# Install Node.js if not present
if ! command_exists node; then
    echo -e "${GREEN}Installing Node.js...${NC}"
    # Install Node.js 20.x LTS
    if [ "$PKG_MANAGER" = "apt-get" ]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        $INSTALL_CMD nodejs
    elif [ "$PKG_MANAGER" = "yum" ] || [ "$PKG_MANAGER" = "dnf" ]; then
        curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
        $INSTALL_CMD nodejs
    fi
else
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    echo -e "${YELLOW}Node.js is already installed: $(node -v)${NC}"
fi

# Verify npm is installed
if ! command_exists npm; then
    echo -e "${RED}npm is not installed. Please install Node.js properly.${NC}"
    exit 1
fi

# Install PM2 globally if not present
if ! command_exists pm2; then
    echo -e "${GREEN}Installing PM2 globally...${NC}"
    npm install -g pm2
else
    echo -e "${YELLOW}PM2 is already installed: $(pm2 -v | head -n 1)${NC}"
fi

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

# Navigate to mainsite directory if it exists
if [ -d "mainsite" ]; then
    echo -e "${YELLOW}Navigating to mainsite directory...${NC}"
    cd mainsite
fi

# Verify package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in current directory: $(pwd)${NC}"
    exit 1
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
