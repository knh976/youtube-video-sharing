#!/bin/bash

GREEN='\033[0;32m'  # Green color
NC='\033[0m'        # No color (reset)

echo -e "${GREEN}Close the terminal to kill all processes${NC}"
echo "Starting ..."
sleep 2

# Function to kill all background processes when the script exits
cleanup() {
    kill $(jobs -p)  # Kill all background jobs
    wait  # Wait for them to exit
}

# Trap EXIT signal to ensure cleanup happens when the script stops
trap cleanup EXIT

# Start services in the background
cd backend && bundle exec rails s &
cd backend && bundle exec sidekiq &
cd frontend && yarn start &

# Wait for all background processes
wait
