#!/bin/bash

echo "🏥 Starting Hospital Equipment and Medicine Inventory System (HEMIS)"
echo "=================================================================="
echo ""

# Get the absolute path of the project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to detect available terminal emulator
detect_terminal() {
    if command -v gnome-terminal &> /dev/null; then
        echo "gnome-terminal"
    elif command -v konsole &> /dev/null; then
        echo "konsole"
    elif command -v xfce4-terminal &> /dev/null; then
        echo "xfce4-terminal"
    elif command -v xterm &> /dev/null; then
        echo "xterm"
    else
        echo "none"
    fi
}

TERMINAL=$(detect_terminal)

if [ "$TERMINAL" = "none" ]; then
    echo "❌ No compatible terminal emulator found!"
    echo "Please install gnome-terminal, konsole, xfce4-terminal, or xterm"
    exit 1
fi

echo "📟 Using terminal: $TERMINAL"
echo ""

# Check if backend is already running
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Backend is already running on port 8080"
else
    echo "🔧 Starting Backend (Spring Boot) in new terminal..."
    case $TERMINAL in
        gnome-terminal)
            gnome-terminal --title="HEMIS Backend" --working-directory="$PROJECT_DIR/backend" -- bash -c "mvn spring-boot:run; exec bash"
            ;;
        konsole)
            konsole --workdir "$PROJECT_DIR/backend" -e bash -c "mvn spring-boot:run; exec bash" &
            ;;
        xfce4-terminal)
            xfce4-terminal --title="HEMIS Backend" --working-directory="$PROJECT_DIR/backend" -e "bash -c 'mvn spring-boot:run; exec bash'" &
            ;;
        xterm)
            xterm -title "HEMIS Backend" -e "cd $PROJECT_DIR/backend && mvn spring-boot:run; exec bash" &
            ;;
    esac
    echo "✓ Backend terminal opened"
fi

# Wait a moment for backend terminal to open
sleep 1

# Check if frontend is already running
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Frontend is already running on port 5173"
else
    echo "🎨 Starting Frontend (React + Vite) in new terminal..."
    case $TERMINAL in
        gnome-terminal)
            gnome-terminal --title="HEMIS Frontend" --working-directory="$PROJECT_DIR/frontend" -- bash -c "pnpm run dev; exec bash"
            ;;
        konsole)
            konsole --workdir "$PROJECT_DIR/frontend" -e bash -c "pnpm run dev; exec bash" &
            ;;
        xfce4-terminal)
            xfce4-terminal --title="HEMIS Frontend" --working-directory="$PROJECT_DIR/frontend" -e "bash -c 'pnpm run dev; exec bash'" &
            ;;
        xterm)
            xterm -title "HEMIS Frontend" -e "cd $PROJECT_DIR/frontend && pnpm run dev; exec bash" &
            ;;
    esac
    echo "✓ Frontend terminal opened"
fi

echo ""
echo "=================================================================="
echo "✅ HEMIS Development Environment Started"
echo ""
echo "📍 Backend:  http://localhost:8080 (Spring Boot)"
echo "📍 Frontend: http://localhost:5173 (React + Vite)"
echo ""
echo "Default Credentials:"
echo "  Admin:      admin / admin123"
echo "  Pharmacist: pharmacist / pharm123"
echo "  Technician: technician / tech123"
echo ""
echo "Note: Two separate terminal windows have been opened."
echo "      Close each terminal to stop the respective service."
echo "=================================================================="
