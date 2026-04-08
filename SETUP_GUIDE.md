# LMS Registration System - Complete Setup Guide

## 📦 Package Structure

```
nyaproject/
├── backend/                          # Node.js Express Backend
│   ├── config/
│   │   ├── database.js              # PostgreSQL configuration
│   │   └── logger.js                # Winston logger setup
│   ├── controllers/
│   │   └── registrationController.js # Business logic
│   ├── middleware/
│   │   ├── errorHandler.js          # Error handling
│   │   ├── rateLimiter.js           # Rate limiting
│   │   └── validator.js             # Input validation
│   ├── routes/
│   │   ├── index.js                 # Health & info routes
│   │   └── registrationRoutes.js    # Registration endpoints
│   ├── logs/                        # Auto-generated log files
│   ├── .env                         # Environment configuration
│   ├── .env.example                 # Example environment file
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Node dependencies
│   ├── server.js                    # Main server file
│   ├── README.md                    # Backend documentation
│   └── API_TESTING_GUIDE.md         # API testing guide
│
├── src/                             # Angular Frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── registration/        # Registration form component
│   │   │   │   ├── registration.component.ts
│   │   │   │   ├── registration.component.html
│   │   │   │   └── registration.component.css
│   │   │   └── ... (other components)
│   │   ├── models/
│   │   │   ├── registration.model.ts # Registration interfaces
│   │   │   └── user.model.ts
│   │   ├── services/
│   │   │   ├── registration.service.ts # API service
│   │   │   └── ... (other services)
│   │   └── ... (other folders)
│   └── ... (Angular files)
│
└── QUICK_START.md                   # Quick start guide
```

## 🎯 Complete Setup Steps

### Step 1: Install Prerequisites

#### Node.js & npm
- Download and install from: https://nodejs.org/
- Verify: `node --version` and `npm --version`

#### PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

#### Angular CLI
```bash
npm install -g @angular/cli
```

### Step 2: Setup PostgreSQL Database

#### Start PostgreSQL Service

**Windows PowerShell (Run as Administrator):**
```powershell
# Check service status
Get-Service -Name postgresql*

# Start service
Start-Service -Name postgresql-x64-14  # Adjust version number
```

**Linux:**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql  # Auto-start on boot
```

**Mac:**
```bash
brew services start postgresql
```

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# You'll be prompted for password (set during installation)

# Create database
CREATE DATABASE "postgresTest";

# Verify creation
\l

# Exit psql
\q
```

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd nyaproject/backend

# Install dependencies
npm install

# This installs:
# - express: Web framework
# - pg: PostgreSQL client
# - dotenv: Environment variables
# - cors: Cross-origin resource sharing
# - helmet: Security headers
# - express-validator: Input validation
# - express-rate-limit: Rate limiting
# - morgan: HTTP request logger
# - compression: Response compression
# - winston: Structured logging
```

#### Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file (use notepad, vim, or any text editor)
notepad .env  # Windows
nano .env     # Linux/Mac
```

Update the following in `.env`:
```env
DB_PASSWORD=your_actual_postgres_password
```

#### Start Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

#### Verify Backend is Running

Open browser: http://localhost:3000

You should see:
```json
{
  "success": true,
  "message": "Welcome to LMS Registration API",
  "version": "1.0.0",
  "documentation": "/api/v1",
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

### Step 4: Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to Angular project root
cd nyaproject

# Install dependencies (if not already installed)
npm install

# This installs Angular and all dependencies
```

#### Start Angular Development Server

```bash
ng serve

# Or with custom port
ng serve --port 4200 --open
```

The `--open` flag automatically opens your browser.

#### Verify Frontend is Running

Open browser: http://localhost:4200

You should see the LMS home page.

### Step 5: Test Registration Flow

1. **Navigate to Registration**
   - Click "Registration" in the navbar
   - Or go to: http://localhost:4200/registration

2. **Fill the Form**
   - Name: John Doe
   - Designation: Developer
   - Course: Angular
   - Location: New York

3. **Submit**
   - Click "Submit Registration"
   - Wait for success message

4. **Verify in Database**
   ```bash
   psql -U postgres -d postgresTest
   
   SELECT * FROM "PostgresTable";
   
   \q
   ```

## 🔧 Configuration Details

### Backend Environment Variables

| Variable | Purpose | Default | Production Value |
|----------|---------|---------|-----------------|
| `NODE_ENV` | Environment mode | development | production |
| `PORT` | Server port | 3000 | 3000 or 80/443 |
| `HOST` | Server host | localhost | 0.0.0.0 |
| `DB_HOST` | Database host | localhost | Your DB host |
| `DB_PORT` | Database port | 5432 | 5432 |
| `DB_NAME` | Database name | postgresTest | Your DB name |
| `DB_USER` | Database user | postgres | Your DB user |
| `DB_PASSWORD` | Database password | postgres | Strong password |
| `ALLOWED_ORIGINS` | CORS origins | http://localhost:4200 | Your domain |

### Database Schema

```sql
CREATE TABLE "PostgresTable" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_registration_name ON "PostgresTable" (name);
CREATE INDEX idx_registration_course ON "PostgresTable" (course);
CREATE INDEX idx_registration_created_at ON "PostgresTable" (created_at);
```

## 🚀 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/registrations` | Create registration |
| GET | `/api/v1/registrations` | Get all (paginated) |
| GET | `/api/v1/registrations/:id` | Get by ID |
| PUT | `/api/v1/registrations/:id` | Update by ID |
| DELETE | `/api/v1/registrations/:id` | Delete by ID |
| GET | `/api/v1/registrations/stats` | Get statistics |

## 🛡️ Security Features Implemented

1. **Input Validation**
   - All fields validated using express-validator
   - Pattern matching for name field
   - Length constraints (2-255 characters)
   - SQL injection prevention

2. **Rate Limiting**
   - General API: 100 requests per 15 minutes
   - Registration: 10 requests per 15 minutes
   - Per IP address tracking

3. **Security Headers** (via Helmet.js)
   - X-DNS-Prefetch-Control
   - X-Frame-Options (SAMEORIGIN)
   - Strict-Transport-Security
   - X-Download-Options
   - X-Content-Type-Options
   - X-XSS-Protection

4. **CORS Protection**
   - Whitelist-based origin checking
   - Configurable allowed origins
   - Credentials support

5. **Error Handling**
   - No stack traces in production
   - Consistent error format
   - Detailed logging

## 📝 Validation Rules

### Name
- Required
- 2-255 characters
- Pattern: `/^[a-zA-Z\s.'-]+$/`
- Only letters, spaces, dots, hyphens, apostrophes

### Designation
- Required
- 2-255 characters

### Course
- Required
- 2-255 characters

### Location
- Required
- 2-255 characters

## 📊 Monitoring & Logs

### Log Files Location
```
backend/logs/
├── combined.log      # All logs
├── error.log         # Errors only
├── exceptions.log    # Uncaught exceptions
└── rejections.log    # Unhandled promise rejections
```

### View Real-time Logs

**PowerShell:**
```powershell
Get-Content backend/logs/combined.log -Wait -Tail 50
```

**Linux/Mac:**
```bash
tail -f backend/logs/combined.log
```

### Log Levels
- `error`: Critical errors
- `warn`: Warnings
- `info`: General information
- `debug`: Detailed debug info

## 🧪 Testing Commands

### Test Backend Health
```bash
curl http://localhost:3000/api/v1/health
```

### Create Test Registration
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","designation":"Tester","course":"Testing","location":"TestCity"}'
```

### Get All Registrations
```bash
curl http://localhost:3000/api/v1/registrations
```

## 🔄 Development Workflow

### Making Changes

1. **Backend Changes**
   - Edit files in `backend/`
   - Server auto-restarts (with nodemon)
   - Check logs for errors

2. **Frontend Changes**
   - Edit files in `src/`
   - Browser auto-reloads
   - Check browser console for errors

3. **Database Changes**
   - Modify schema in `config/database.js`
   - Restart backend server
   - Tables auto-create/update

### Debugging

1. **Check Backend Logs**
   ```bash
   tail -f backend/logs/error.log
   ```

2. **Check Database**
   ```bash
   psql -U postgres -d postgresTest
   SELECT * FROM "PostgresTable";
   ```

3. **Browser Console**
   - Open DevTools (F12)
   - Check Console tab
   - Check Network tab

## 📦 Production Deployment

### Backend

1. **Set Environment**
   ```env
   NODE_ENV=production
   DB_PASSWORD=strong_password_here
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. **Use Process Manager**
   ```bash
   npm install -g pm2
   pm2 start server.js --name lms-backend
   pm2 save
   pm2 startup
   ```

3. **Setup Reverse Proxy** (nginx)
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Frontend

1. **Build for Production**
   ```bash
   ng build --configuration production
   ```

2. **Deploy dist/ folder** to web server

## 🆘 Troubleshooting

### Common Issues

1. **"Cannot connect to database"**
   - Check PostgreSQL is running
   - Verify credentials in `.env`
   - Check firewall settings

2. **"Port 3000 already in use"**
   - Kill existing process or change PORT in `.env`
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

3. **"CORS error in frontend"**
   - Verify backend ALLOWED_ORIGINS includes frontend URL
   - Restart backend after changing `.env`

4. **"Module not found"**
   - Run `npm install` in respective directory
   - Delete `node_modules` and reinstall

## 📞 Support Resources

- Backend README: `backend/README.md`
- API Testing Guide: `backend/API_TESTING_GUIDE.md`
- Quick Start: `QUICK_START.md`

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database "postgresTest" created
- [ ] Backend dependencies installed
- [ ] Backend `.env` configured
- [ ] Backend server starts without errors
- [ ] Backend health endpoint responds
- [ ] Frontend dependencies installed
- [ ] Frontend server starts without errors
- [ ] Can access homepage at http://localhost:4200
- [ ] Can access registration form
- [ ] Can submit registration successfully
- [ ] Data appears in database
- [ ] Logs are being written

---

**System Ready! 🎉**
