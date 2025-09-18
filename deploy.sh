#!/bin/bash

# GCS POC Deployment Script

echo "🚀 Starting GCS POC Deployment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
python3 -m pip install -r requirements.txt

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
npm run build

# Install serve globally for PM2
echo "📦 Installing serve for static file serving..."
npm install -g serve

# Go back to root
cd ..

# Start applications with PM2
echo "🔄 Starting applications with PM2..."
pm2 delete all 2>/dev/null || true  # Clean up any existing processes
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Show status
pm2 status

echo "✅ Deployment complete!"
echo "🌐 Backend: http://your-server-ip:8000"
echo "🌐 Frontend: http://your-server-ip:3000"
echo ""
echo "📋 Useful PM2 commands:"
echo "  pm2 logs                    # View all logs"
echo "  pm2 logs gcs-backend        # View backend logs only"
echo "  pm2 logs gcs-frontend       # View frontend logs only"
echo "  pm2 restart ecosystem.config.js    # Restart all apps"
echo "  pm2 stop ecosystem.config.js       # Stop all apps"
echo "  pm2 delete ecosystem.config.js     # Remove from PM2"
echo ""
echo "🔍 If you encounter issues:"
echo "  1. Check logs: pm2 logs"
echo "  2. Restart: pm2 restart ecosystem.config.js"
echo "  3. Verify dependencies are installed"
