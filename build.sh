#!/bin/bash
set -e

# Default to development mode
MODE=${1:-dev}

# Build Hugo site based on mode
cd site
if [ "$MODE" = "prod" ]; then
    echo "Building for production..."
    hugo --gc --minify
else
    echo "Starting development server..."
    hugo server
fi 