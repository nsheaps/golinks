#! /usr/bin/env bash

# Ensure nvm is loaded
if ! command -v nvm &> /dev/null; then
  echo "nvm is not loaded. Please ensure it's installed and .envrc is allowed."
  exit 1
fi

# Set up environment variables
export NODE_ENV=development
export PATH="$PWD/node_modules/.bin:$PATH"

# Load any additional environment variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi 