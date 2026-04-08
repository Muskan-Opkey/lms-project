# MySQL Database Setup Script

$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  MySQL Database Setup for LMS Registration" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Prompt for root password
Write-Host "Please enter your MySQL root password:" -ForegroundColor Yellow
$rootPassword = Read-Host -AsSecureString
$rootPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($rootPassword)
)

Write-Host ""
Write-Host "Creating database and user..." -ForegroundColor Green

# SQL commands to execute
$sqlCommands = @"
CREATE DATABASE IF NOT EXISTS mysqldb;
CREATE USER IF NOT EXISTS 'mysql'@'localhost' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON mysqldb.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;
USE mysqldb;
SHOW TABLES;
"@

# Execute SQL commands
try {
    $sqlCommands | & $mysqlPath -u root -p"$rootPasswordPlain" 2>&1 | Out-String | Write-Host
    
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host "  [OK] Database 'mysqldb' created successfully!" -ForegroundColor Green
    Write-Host "  [OK] User 'mysql' created with password 'mysql'" -ForegroundColor Green
    Write-Host "  [OK] Privileges granted" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start the backend server with:" -ForegroundColor Cyan
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Incorrect root password" -ForegroundColor White
    Write-Host "2. MySQL service not running" -ForegroundColor White
    Write-Host "3. Insufficient privileges" -ForegroundColor White
}

# Test the new mysql user
Write-Host "Testing new 'mysql' user connection..." -ForegroundColor Cyan
$testResult = & $mysqlPath -u mysql -pmysql -e "SELECT 'Connection successful!' as Status;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] MySQL user 'mysql' is working correctly!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Could not connect with 'mysql' user" -ForegroundColor Red
    Write-Host $testResult -ForegroundColor Red
}
