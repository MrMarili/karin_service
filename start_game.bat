@echo off
echo Setting up environment...
set "PATH=%PATH%;C:\Program Files\nodejs"

echo Killing old processes...
taskkill /F /IM node.exe >nul 2>&1

echo Starting Shomrat HaZorea Multiplayer Game...

echo 1. Launching Server (Backend)...
start "Shomrat Server" cmd /k "node server.js"

echo 2. Launching Presentation (Frontend)...
start "Shomrat Client" cmd /k "npm run dev -- --host"

echo.
echo Game logic is running in the new windows.
echo Please wait for the frontend window to say "Local: http://localhost:5173"
echo.
pause
