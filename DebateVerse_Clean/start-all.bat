@echo off
title DebateVerse Launcher
echo ====================================================
echo            Launching DebateVerse Platform
echo ====================================================
echo.

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found on this computer!
    echo Please install Node.js from https://nodejs.org/ and restart this script.
    pause
    exit /b 1
)

:: 2. Auto-install backend dependencies if missing
if not exist "%~dp0backend\node_modules" (
    echo [1/2] Installing backend packages (one-time setup)...
    cd /d "%~dp0backend"
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install backend packages.
        pause
        exit /b 1
    )
)

:: 3. Auto-install frontend dependencies if missing
if not exist "%~dp0frontend\node_modules" (
    echo [2/2] Installing frontend packages (one-time setup)...
    cd /d "%~dp0frontend"
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install frontend packages.
        pause
        exit /b 1
    )
)

:: 4. Start Backend Server
echo.
echo Starting Backend server on http://localhost:5000 ...
start "DebateVerse Backend (Port 5000)" cmd /k "cd /d %~dp0backend && npm start"

:: Wait 3 seconds for backend DB to bind
timeout /t 3 /nobreak >nul

:: 5. Start Frontend Dev Server
echo Starting Frontend server on http://localhost:5173 ...
start "DebateVerse Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ====================================================
echo  DebateVerse is now running!
echo  Open your web browser and go to:
echo  --> http://localhost:5173
echo ====================================================
echo.
echo You can minimize this window. Close the other two terminal windows when done.
pause
