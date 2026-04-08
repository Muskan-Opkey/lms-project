# MCP MySQL Server Setup Guide

## Overview

Model Context Protocol (MCP) server for MySQL enables direct database queries through GitHub Copilot using natural language.

## Installation Details

### Package Installed
```bash
npm install -g @berthojoris/mcp-mysql-server@1.40.4
```

**Location:** `C:\Users\MuskanShori\AppData\Roaming\npm\node_modules\@berthojoris\mcp-mysql-server`

## Configuration

### VS Code Settings

**File:** `.vscode/settings.json`

```json
{
  "github.copilot.chat.mcp.enabled": true,
  "github.copilot.chat.mcp.servers": {
    "mysql": {
      "command": "node",
      "args": [
        "C:\\Users\\MuskanShori\\AppData\\Roaming\\npm\\node_modules\\@berthojoris\\mcp-mysql-server\\bin\\mcp-mysql.js"
      ],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "root",
        "MYSQL_DATABASE": "mysqldb"
      }
    }
  }
}
```

## Database Connection

**Database Information:**
- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: `root`
- Database: `mysqldb`

**Tables Available:**
- `users` - User accounts (id, name, email, password, registered_at, updated_at)
- `mysqlTable` - Course registrations (id, name, designation, course, location, created_at, updated_at)

## Activation

To activate the MCP server after configuration:

1. **Reload VS Code:**
   - Press `Ctrl+Shift+P`
   - Type: "Developer: Reload Window"
   - Press Enter

2. **Verify Activation:**
   - Open GitHub Copilot Chat
   - Try a natural language database query
   - Example: "Show me all users from the database"

## Usage Examples

Once activated, you can use natural language to query your database:

### Query Examples

**View all users:**
```
Show me all users from the users table
```

**Count records:**
```
How many users are registered in the database?
```

**Filter data:**
```
Get users registered today
```

**Complex queries:**
```
Show me the 5 most recent users with their email addresses
```

**Table information:**
```
What tables exist in the mysqldb database?
```

**Schema details:**
```
Describe the structure of the users table
```

## Troubleshooting

### MCP Server Not Working

**Symptoms:**
- Natural language queries don't work
- No database connection in Copilot

**Solutions:**
1. Verify the MCP package is installed:
   ```bash
   npm list -g @berthojoris/mcp-mysql-server
   ```

2. Check the path in `.vscode/settings.json` matches the actual installation path

3. Ensure MySQL is running and accessible:
   ```bash
   mysql -u root -proot -D mysqldb -e "SHOW TABLES;"
   ```

4. Reload VS Code window after any configuration changes

5. Check VS Code Developer Console for MCP errors:
   - `Help` → `Toggle Developer Tools` → `Console` tab

### Database Connection Issues

**Error: Access Denied**
- Verify MySQL credentials in `.vscode/settings.json`
- Test credentials manually:
  ```bash
  mysql -u root -proot -D mysqldb
  ```

**Error: Unknown Database**
- Create the database if it doesn't exist:
  ```sql
  CREATE DATABASE mysqldb;
  ```

## Security Considerations

⚠️ **Important:** The current configuration stores the database password in plain text in `.vscode/settings.json`.

**For Production:**
1. Use environment variables for credentials
2. Create a read-only database user for MCP
3. Limit database access to specific IP addresses
4. Use SSL/TLS for database connections
5. Add `.vscode/settings.json` to `.gitignore` (already done)

## Alternative: Direct MySQL Queries

If MCP is not working, you can still query the database directly:

### Using MySQL Command Line
```powershell
# Windows
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -D mysqldb -e "SELECT * FROM users;"
```

### Using Backend API
```bash
# Get all users via API
curl http://localhost:3000/api/v1/users
```

## Package Information

**Name:** `@berthojoris/mcp-mysql-server`  
**Version:** `1.40.4`  
**Description:** Model Context Protocol server for MySQL database integration with dynamic per-project permissions  
**Keywords:** mcp, mysql, database, llm, ai, model-context-protocol, claude, windsurf, copilot

**Features:**
- Dynamic per-project permissions
- DDL support
- Permission control
- Operation logs
- Natural language query interface

## Benefits of MCP

1. **Fast Development:** Query database without writing SQL
2. **Data Exploration:** Understand data structure quickly
3. **Debugging:** Inspect database state during development
4. **Documentation:** Generate queries and results instantly
5. **Learning:** Understand how queries are constructed

## Next Steps

After activation, experiment with:
1. Simple SELECT queries
2. Filtering and sorting data
3. Joining tables
4. Aggregation queries (COUNT, SUM, AVG)
5. Schema inspection

## Support

For issues with the MCP server package:
- GitHub: [Package Repository](https://www.npmjs.com/package/@berthojoris/mcp-mysql-server)
- Documentation: Check package README after installation
