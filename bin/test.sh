#!/bin/bash

GREEN='\033[0;32m'  # Green color
NC='\033[0m'        # No color (reset)

echo -e "${GREEN}Running backend unit tests ... ${NC}"
sleep 2
cd backend && bundle exec rspec && cd ..

echo -e "${GREEN}Running frontend unit tests ... ${NC}"
sleep 2
cd frontend && yarn test && cd ..

echo -e "${GREEN}Running frontend e2e tests ... ${NC}"
sleep 2
cd frontend && yarn e2e
