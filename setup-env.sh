#!/bin/bash

echo "🔧 Setting up HEMIS Development Environment..."
echo ""

# Backend setup
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from backend/.env.example..."
    cp backend/.env.example backend/.env
    echo "✓ Created backend/.env"
else
    echo "⚠ backend/.env already exists, skipping..."
fi

# Frontend setup
if [ ! -f "frontend/.env" ]; then
    echo "Creating frontend/.env from frontend/.env.example..."
    cp frontend/.env.example frontend/.env
    echo "✓ Created frontend/.env"
else
    echo "⚠ frontend/.env already exists, skipping..."
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
pnpm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review and update .env files if needed"
echo "2. Run: chmod +x start-dev.sh"
echo "3. Run: ./start-dev.sh"
echo ""
