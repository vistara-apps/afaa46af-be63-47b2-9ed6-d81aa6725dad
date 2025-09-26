#!/bin/bash

# SquadSats Deployment Script
# This script builds and deploys the SquadSats Base MiniApp

set -e

echo "🚀 Starting SquadSats deployment..."

# Check if required environment variables are set
if [ -z "$NEXT_PUBLIC_ONCHAINKIT_API_KEY" ]; then
    echo "❌ Error: NEXT_PUBLIC_ONCHAINKIT_API_KEY is not set"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run type checking
echo "🔧 Running type checking..."
npm run type-check

# Build the application
echo "🏗️ Building application..."
npm run build

# Run tests (if they exist)
if npm run test --silent 2>/dev/null; then
    echo "🧪 Running tests..."
    npm run test
else
    echo "⚠️ No tests found, skipping..."
fi

# Deploy to Vercel (if Vercel CLI is available)
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    echo "✅ Deployment complete!"
else
    echo "⚠️ Vercel CLI not found. Please deploy manually or install Vercel CLI."
    echo "To deploy manually:"
    echo "1. Run 'npm run start' for production server"
    echo "2. Or deploy to your preferred hosting platform"
fi

echo "🎉 SquadSats deployment script completed successfully!"

