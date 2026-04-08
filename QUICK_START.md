# Quick Start Guide - LMS Registration System

This guide will get you up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install PostgreSQL (If not already installed)

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Run installer and remember your password for 'postgres' user

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

Open terminal/PowerShell:

```bash
# Connect to PostgreSQL
psql -U postgres

# Enter your postgres password when prompted

# Create database
CREATE DATABASE "postgresTest";

# Exit
\q
```

### 3. Setup Backend

```bash
# Navigate to backend folder
cd nyaproject/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file and update DB_PASSWORD if needed
# The default password is 'postgres'

# Start the server
npm run dev
```

You should see:
```
[INFO] Server listening on http://localhost:3000
```

### 4. Setup Frontend

Open a new terminal:

```bash
# Navigate to Angular project
cd nyaproject

# Install dependencies (if not already done)
npm install

# Start Angular app
ng serve
```

You should see:
```
✔ Browser application bundle generation complete.
✔ Local: http://localhost:4200/
```

### 5. Test the Application

1. Open browser: http://localhost:4200
2. Click on "Registration" in the navigation menu
3. Fill out the registration form:
   - Name: John Doe
   - Designation: Developer
   - Course: Angular
   - Location: New York
4. Click "Submit Registration"
5. You should see a success message!

## 🧪 Test Backend API Directly

### Test Health Endpoint

```bash
curl http://localhost:3000/api/v1/health
```

### Create a Registration

**PowerShell:**
```powershell
$body = @{
    name = "Jane Smith"
    designation = "Engineer"
    course = "Python Basics"
    location = "Chicago"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations" -Method Post -Body $body -ContentType "application/json"
```

**Bash/Linux/Mac:**
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "designation": "Engineer",
    "course": "Python Basics",
    "location": "Chicago"
  }'
```

### Get All Registrations

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/registrations"
```

**Bash:**
```bash
curl http://localhost:3000/api/v1/registrations
```

## 🎯 What's Next?

### View All Features

1. **Registration Form** - http://localhost:4200/registration
2. **Dashboard** - http://localhost:4200/user-management/dashboard
3. **Courses** - http://localhost:4200/courses
4. **Gallery** - http://localhost:4200/gallery

### Check Backend Logs

Logs are in `backend/logs/` folder:
- `combined.log` - All activity
- `error.log` - Errors only

### View Database Records

```bash
psql -U postgres -d postgresTest

# View all registrations
SELECT * FROM "PostgresTable";

# Exit
\q
```

## ❌ Common Issues

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Find and kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Issue: "Database connection failed"

**Solution:**
1. Check if PostgreSQL is running
2. Verify password in `.env` file
3. Make sure database "postgresTest" exists

### Issue: "CORS error in browser"

**Solution:**
1. Make sure backend is running on port 3000
2. Check `ALLOWED_ORIGINS` in `.env` includes `http://localhost:4200`
3. Restart backend after changing `.env`

## 📱 Test the Complete Flow

1. **Open Registration Page**: http://localhost:4200/registration
2. **Fill the form** with test data
3. **Submit** and see success message
4. **Check logs**: Open `backend/logs/combined.log`
5. **Query database**:
   ```bash
   psql -U postgres -d postgresTest -c "SELECT * FROM \"PostgresTable\";"
   ```

## 🎉 Success!

If you can:
- ✅ See the registration form at http://localhost:4200/registration
- ✅ Submit the form successfully
- ✅ See data in the database

**Your system is working perfectly!**

## 📚 Learn More

- Backend API Documentation: `backend/README.md`
- API Endpoints: `backend/API_DOCUMENTATION.md`
- Database Schema: See backend README

## 🆘 Need Help?

1. Check terminal for error messages
2. Review `backend/logs/error.log`
3. Ensure all ports are free (3000, 4200)
4. Verify PostgreSQL is running

---

**Happy Learning! 🚀**
