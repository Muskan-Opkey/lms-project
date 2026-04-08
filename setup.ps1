# PowerShell Setup Script for LMS Registration System
# Run this script from the nyaproject directory

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  LMS Registration System - Setup Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL installation
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $psqlVersion = psql --version
    Write-Host "✓ PostgreSQL is installed: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL not found in PATH" -ForegroundColor Yellow
    Write-Host "  Please ensure PostgreSQL is installed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 1: Backend Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Setup Backend
Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend

if (Test-Path "node_modules") {
    Write-Host "✓ node_modules already exists, skipping..." -ForegroundColor Green
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        Pop-Location
        exit 1
    }
}

# Check .env file
Write-Host ""
Write-Host "Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
} else {
    Write-Host "⚠ .env file not found, creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host "  IMPORTANT: Please update DB_PASSWORD in .env file" -ForegroundColor Yellow
}

Pop-Location

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 2: Frontend Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Setup Frontend
Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "✓ node_modules already exists, skipping..." -ForegroundColor Green
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Step 3: Database Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please ensure you have:" -ForegroundColor Yellow
Write-Host "  1. PostgreSQL service is running" -ForegroundColor White
Write-Host "  2. Created database 'postgresTest'" -ForegroundColor White
Write-Host "  3. Updated password in backend/.env" -ForegroundColor White
Write-Host ""
Write-Host "To create database, run:" -ForegroundColor Yellow
Write-Host "  psql -U postgres -c 'CREATE DATABASE ""postgresTest"";'" -ForegroundColor Cyan

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start Backend:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. In a new terminal, start Frontend:" -ForegroundColor White
Write-Host "   cd nyaproject" -ForegroundColor Cyan
Write-Host "   ng serve" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Open browser:" -ForegroundColor White
Write-Host "   http://localhost:4200/registration" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "  - QUICK_START.md" -ForegroundColor Cyan
Write-Host "  - SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host "  - backend/README.md" -ForegroundColor Cyan
Write-Host ""
