# MySQL Backend Setup Guide

## Successfully Migrated to MySQL Database! 🎉

Your LMS Registration Form backend has been successfully configured to work with MySQL database.

## What Was Updated

### 1. **Database Configuration** (`backend/config/database.js`)
   - Replaced PostgreSQL (`pg`) with MySQL (`mysql2`)
   - Updated connection pool configuration for MySQL
   - Changed table name from `PostgresTable` to `mysqlTable`
   - Updated query syntax for MySQL compatibility

### 2. **Controllers** (`backend/controllers/registrationController.js`)
   - Updated all SQL queries to use MySQL syntax (? placeholders instead of $1, $2)
   - Modified INSERT queries to retrieve last inserted ID
   - Updated UPDATE queries to check affected rows
   - Changed DELETE queries to work with MySQL

### 3. **Dependencies** (`backend/package.json`)
   - Added: `mysql2@3.6.5` (MySQL driver)
   - Removed: `pg` (PostgreSQL driver)

### 4. **Environment Configuration** (`backend/.env`)
   - Updated database credentials:
     - Database Name: `mysqldb`
     - User: `mysql`
     - Password: `mysql`
     - Port: `3306` (MySQL default)

---

## Database Schema

The backend will automatically create the `mysqlTable` with the following structure:

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

**Indexes created:**
- `idx_registration_name` on `name`
- `idx_registration_course` on `course`
- `idx_registration_created_at` on `created_at`

---

## Setup Instructions

### Step 1: Install MySQL (if not already installed)

**Windows:**
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and select "Server Only" or "Full" installation
3. Set root password during installation
4. Start MySQL service from Services (services.msc)

**Or use XAMPP/WAMP:**
- Download XAMPP/WAMP which includes MySQL
- Start MySQL from the control panel

### Step 2: Create Database and User

Open MySQL command line or phpMyAdmin and run:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS mysqldb;

-- Create user (if not exists)
CREATE USER IF NOT EXISTS 'mysql'@'localhost' IDENTIFIED BY 'mysql';

-- Grant privileges
GRANT ALL PRIVILEGES ON mysqldb.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;

-- Verify
USE mysqldb;
SHOW TABLES;
```

### Step 3: Verify MySQL Service is Running

**Windows (PowerShell/CMD):**
```powershell
# Check MySQL service status
Get-Service -Name MySQL*

# Start MySQL service if not running
Start-Service -Name MySQL80  # Replace with your MySQL version

# Or use Services GUI (services.msc)
```

**Check MySQL connection:**
```bash
mysql -u mysql -p
# Enter password: mysql
```

### Step 4: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 5: Configure Environment Variables

The `.env` file has been updated with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mysqldb
DB_USER=mysql
DB_PASSWORD=mysql
```

**Important:** If your MySQL credentials are different, update the `.env` file accordingly.

### Step 6: Start the Backend Server

```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

The server will:
1. Connect to MySQL database
2. Automatically create `mysqlTable` if it doesn't exist
3. Create indexes for better performance
4. Start listening on `http://localhost:3000`

---

## Testing the API

### 1. Test Database Connection

```bash
# Health check
curl http://localhost:3000/api/v1/health
```

### 2. Create a Registration

```bash
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"designation\":\"Student\",\"course\":\"Angular\",\"location\":\"New York\"}"
```

### 3. Get All Registrations

```bash
curl http://localhost:3000/api/v1/registrations
```

### 4. Get Statistics

```bash
curl http://localhost:3000/api/v1/registrations/stats
```

### 5. Test from Frontend

1. Start Angular frontend: `ng serve`
2. Navigate to: `http://localhost:4200/registration`
3. Fill in the registration form:
   - Name: Your Name
   - Designation: Student
   - Course: Select any course
   - Location: Select any location
4. Click Submit

The form data will be sent to the MySQL database!

---

## Verify Data in MySQL

**Method 1: MySQL Command Line**
```sql
-- Connect to MySQL
mysql -u mysql -p

-- Use database
USE mysqldb;

-- View all registrations
SELECT * FROM mysqlTable;

-- Count registrations
SELECT COUNT(*) FROM mysqlTable;

-- View by course
SELECT course, COUNT(*) as count FROM mysqlTable GROUP BY course;
```

**Method 2: phpMyAdmin**
1. Open phpMyAdmin (usually http://localhost/phpmyadmin)
2. Login with user: `mysql`, password: `mysql`
3. Click on `mysqldb` database
4. Click on `mysqlTable` table
5. Click "Browse" to view all records

---

## Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/registrations` | Create new registration |
| GET | `/api/v1/registrations` | Get all registrations (paginated) |
| GET | `/api/v1/registrations/:id` | Get registration by ID |
| PUT | `/api/v1/registrations/:id` | Update registration |
| DELETE | `/api/v1/registrations/:id` | Delete registration |
| GET | `/api/v1/registrations/stats` | Get registration statistics |
| GET | `/api/v1/health` | Health check |

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to MySQL"
**Solution:**
- Check if MySQL service is running
- Verify credentials in `.env` file
- Check if port 3306 is not blocked by firewall

### Issue 2: "Access denied for user 'mysql'@'localhost'"
**Solution:**
```sql
-- Re-create user with proper privileges
DROP USER IF EXISTS 'mysql'@'localhost';
CREATE USER 'mysql'@'localhost' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON mysqldb.* TO 'mysql'@'localhost';
FLUSH PRIVILEGES;
```

### Issue 3: "Database 'mysqldb' doesn't exist"
**Solution:**
```sql
CREATE DATABASE mysqldb;
```

### Issue 4: "Table 'mysqldb.mysqlTable' doesn't exist"
**Solution:**
The table should be created automatically when you start the server. If it doesn't:
- Check server logs for errors
- Manually create the table using the schema provided above

### Issue 5: CORS errors from frontend
**Solution:**
- Ensure backend server is running on port 3000
- Check `ALLOWED_ORIGINS` in `.env` file includes `http://localhost:4200`

---

## Project Structure

```
backend/
├── config/
│   ├── database.js         ✅ Updated for MySQL
│   └── logger.js
├── controllers/
│   └── registrationController.js  ✅ Updated for MySQL
├── middleware/
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── validator.js
├── routes/
│   ├── index.js
│   └── registrationRoutes.js
├── .env                    ✅ Updated with MySQL credentials
├── package.json            ✅ Updated dependencies
└── server.js
```

---

## Next Steps

1. ✅ Backend configured for MySQL
2. ✅ Database connection tested
3. ✅ Table automatically created
4. 🔄 Start backend server: `npm run dev`
5. 🔄 Start frontend: `ng serve`
6. 🔄 Test registration form
7. 🔄 Verify data in MySQL database

---

## Monitoring & Debugging

**View Backend Logs:**
```bash
# Check combined.log for all logs
tail -f combined.log

# Check error.log for errors only
tail -f error.log
```

**Enable Debug Mode:**
In `.env` file:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

---

## Production Considerations

Before deploying to production:

1. **Security:**
   - Change default MySQL password
   - Use strong passwords for MySQL user
   - Enable SSL for MySQL connections
   - Never commit `.env` file to version control

2. **Performance:**
   - Increase `DB_MAX_CONNECTIONS` if needed
   - Monitor query performance
   - Add more indexes if required

3. **Backup:**
   ```bash
   # Backup database
   mysqldump -u mysql -p mysqldb > backup.sql
   
   # Restore database
   mysql -u mysql -p mysqldb < backup.sql
   ```

---

## Support

If you encounter any issues:
1. Check the error logs (`error.log`)
2. Verify MySQL service is running
3. Confirm database credentials are correct
4. Ensure port 3000 is not in use by another application

---

**🎉 Your backend is now ready to accept registration form submissions and store them in MySQL database!**
