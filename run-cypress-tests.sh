#!/bin/bash

# Script to run Cypress tests with servers
# This script checks if servers are running and starts them if needed

echo "🚀 Cypress Test Runner"
echo "======================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Check if backend is running
if check_port 5000; then
    echo -e "${GREEN}✓ Backend server is running on port 5000${NC}"
else
    echo -e "${YELLOW}⚠ Backend server is NOT running on port 5000${NC}"
    echo "Please start the backend server first:"
    echo "  cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin"
    echo "  npm start"
    echo ""
    exit 1
fi

# Check if frontend is running
if check_port 3000; then
    echo -e "${GREEN}✓ Frontend server is running on port 3000${NC}"
else
    echo -e "${YELLOW}⚠ Frontend server is NOT running on port 3000${NC}"
    echo "Please start the frontend server first:"
    echo "  cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin/frontend"
    echo "  npm start"
    echo ""
    exit 1
fi

echo ""
echo "Running Cypress tests..."
echo ""

# Navigate to frontend directory and run Cypress
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin/frontend
npm run cypress:run

