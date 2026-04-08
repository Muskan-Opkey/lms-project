# LMS Registration Backend API

Production-ready Node.js and Express backend for LMS Registration System with MySQL database integration.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Testing](#testing)
- [Production Deployment](#production-deployment)

## ✨ Features

- ✅ RESTful API with Express.js
- ✅ PostgreSQL database integration with connection pooling
- ✅ Input validation and sanitization
- ✅ Rate limiting to prevent abuse
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Structured logging with Winston
- ✅ Error handling middleware
- ✅ Request compression
- ✅ Production-ready configuration
- ✅ Graceful shutdown
- ✅ Pagination support
- ✅ Statistics endpoint

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MySQL** (v8.0 or higher)

Check your versions:
```bash
node --version
npm --version
mysql --version
```

## 🚀 Installation

### Step 1: Navigate to Backend Directory

```bash
cd nyaproject/backend
```

### Step 2: Install Dependencies

```bash
npm install
```


This will install all required packages:
- express
- mysql2 (MySQL client)
- dotenv
- cors
- helmet
- express-validator
- express-rate-limit
- morgan
- compression
- winston

### Step 3: Install Dev Dependencies (Optional)

```bash
npm install --save-dev nodemon
```

## 🗄️ Database Setup


## 🗄️ Database Setup

### Step 1: Start MySQL

Ensure MySQL is running on your system.

**Windows:**
```powershell
# Check if MySQL service is running
Get-Service -Name MySQL*

# Start MySQL service if not running
Start-Service -Name MySQL80  # Replace with your MySQL version
```

**Linux/Mac:**
```bash
sudo service mysql start
# or
sudo systemctl start mysql
```

### Step 2: Create Database and User

```sql
CREATE DATABASE IF NOT EXISTS mysqldb;
CREATE USER IF NOT EXISTS 'mysql'@'localhost' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON mysqldb.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;
USE mysqldb;
```

### Step 3: Table Creation (Automatic)

The application will automatically create the `mysqlTable` when the server starts.

**Table Schema:**
```sql
CREATE TABLE IF NOT EXISTS mysqlTable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## ⚙️ Configuration

### Step 1: Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgresTest
DB_USER=postgres
DB_PASSWORD=postgres
DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:4200

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### Environment Variables Explained:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode (development/production) | development |
| `PORT` | Server port number | 3000 |
| `HOST` | Server host | localhost |
| `DB_HOST` | MySQL host | localhost |
| `DB_PORT` | MySQL port | 3306 |
| `DB_NAME` | Database name | mysqldb |
| `DB_USER` | Database username | mysql |
| `DB_PASSWORD` | Database password | mysql |
| `DB_MAX_CONNECTIONS` | Max database connections | 10 |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | http://localhost:4200 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window (ms) | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `LOG_LEVEL` | Logging level (error/warn/info/debug) | info |

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Expected Output

```
[INFO] Testing database connection...
[INFO] Database connection test successful
[INFO] Initializing database...
[INFO] Database table initialized successfully
[INFO] Server running in development mode
[INFO] Server listening on http://localhost:3000
[INFO] API documentation available at http://localhost:3000/api/v1
```

## 📡 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### 1. Health Check

**GET** `/api/v1/health`

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-30T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```


### 2. Create Registration

**POST** `/api/v1/registrations`

Create a new registration.

**Request Body:**
```json
{
  "name": "John Doe",
  "designation": "Developer",
  "course": "Angular",
  "location": "New York"
}
```

**Validation Rules:**
- `name`: 2-255 characters, letters, spaces, dots, hyphens, apostrophes only
- `designation`: 2-255 characters, required
- `course`: 2-255 characters, required
- `location`: 2-255 characters, required

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York",
    "createdAt": "2026-03-30T12:00:00.000Z"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "name",
        "message": "Name is required",
        "value": ""
      }
    ]
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```


### 3. Get All Registrations

**GET** `/api/v1/registrations?page=1&limit=10`

Get all registrations with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "designation": "Developer",
      "course": "Angular",
      "location": "New York",
      "created_at": "2026-03-30T12:00:00.000Z",
      "updated_at": "2026-03-30T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

### 4. Get Registration by ID

**GET** `/api/v1/registrations/:id`

Get a specific registration.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York",
    "created_at": "2026-03-30T12:00:00.000Z",
    "updated_at": "2026-03-30T12:00:00.000Z"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "message": "Registration not found"
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

### 5. Update Registration

**PUT** `/api/v1/registrations/:id`

Update an existing registration.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "designation": "Senior Developer",
  "course": "React",
  "location": "San Francisco"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Registration updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "designation": "Senior Developer",
    "course": "React",
    "location": "San Francisco",
    "created_at": "2026-03-30T12:00:00.000Z",
    "updated_at": "2026-03-30T12:05:00.000Z"
  },
  "timestamp": "2026-03-30T12:05:00.000Z"
}
```

### 6. Delete Registration

**DELETE** `/api/v1/registrations/:id`

Delete a registration.

**Response (200):**
```json
{
  "success": true,
  "message": "Registration deleted successfully",
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

### 7. Get Statistics

**GET** `/api/v1/registrations/stats`

Get registration statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_registrations": "150",
      "total_courses": "12",
      "total_locations": "25",
      "total_designations": "8"
    },
    "courseBreakdown": [
      {
        "course": "Angular",
        "count": "45"
      },
      {
        "course": "React",
        "count": "38"
      }
    ]
  },
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

## 🔒 Security Features

### 1. Helmet.js
Automatically sets various HTTP headers for security:
- X-DNS-Prefetch-Control
- X-Frame-Options
- X-Content-Type-Options
- And more...

### 2. CORS Protection
Configured to accept requests only from allowed origins.

### 3. Rate Limiting
- General API: 100 requests per 15 minutes
- Registration endpoint: 10 requests per 15 minutes

### 4. Input Validation
All inputs are validated and sanitized using express-validator.

### 5. SQL Injection Prevention
Parameterized queries using mysql2 library.

## 📝 Logging

### Log Files

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only
- `exceptions.log` - Uncaught exceptions
- `rejections.log` - Unhandled promise rejections

### Log Levels

- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `debug` - Debug messages

### Example Log

```
2026-03-30 12:00:00 [info]: Server listening on http://localhost:3000
2026-03-30 12:01:23 [info]: Creating new registration: {"name":"John Doe","designation":"Developer","course":"Angular","location":"New York"}
```

## 🧪 Testing

### Manual Testing with cURL

**Create Registration:**
```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "designation": "Developer",
    "course": "Angular",
    "location": "New York"
  }'
```

**Get All Registrations:**
```bash
curl http://localhost:3000/api/v1/registrations?page=1&limit=10
```

**Get Registration by ID:**
```bash
curl http://localhost:3000/api/v1/registrations/1
```

### Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL: `http://localhost:3000/api/v1`
3. Test each endpoint

## 🚀 Production Deployment

### Environment Setup

1. Set `NODE_ENV=production` in `.env`
2. Update database credentials
3. Configure allowed origins for CORS
4. Set appropriate rate limits

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start server.js --name lms-backend

# Monitor
pm2 monit

# View logs
pm2 logs lms-backend

# Restart
pm2 restart lms-backend

# Stop
pm2 stop lms-backend
```

### Using Docker

Create `Dockerfile`:
```dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t lms-backend .
docker run -p 3000:3000 --env-file .env lms-backend
```

## 🛠️ Troubleshooting

### Database Connection Issues

**Error:** "Connection refused"
- Check if PostgreSQL is running
- Verify database credentials in `.env`
- Check firewall settings

**Solution:**
```bash
# Windows
Get-Service postgresql*

# Linux
sudo systemctl status postgresql
```

### Port Already in Use

**Error:** "EADDRINUSE: address already in use :::3000"

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

**Error:** "Cannot find module 'express'"

**Solution:**
```bash
npm install
```

## 📞 Support

For issues or questions:
1. Check the logs in `logs/` directory
2. Review error messages in console
3. Verify environment configuration
4. Check database connectivity
5. See MYSQL_SETUP_GUIDE.md for MySQL-specific troubleshooting

## 📄 License

ISC

## 👨‍💻 Author

LMS Development Team

---

**Happy Coding! 🎉**
