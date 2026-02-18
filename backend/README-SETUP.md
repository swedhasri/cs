# Database Setup Instructions

The authentication errors are occurring because MySQL is not running or not properly configured. Follow these steps to fix the issue:

## Option 1: Install and Start MySQL

1. **Install MySQL** (if not already installed):
   - Download MySQL from https://dev.mysql.com/downloads/mysql/
   - Or install via package manager: `choco install mysql`

2. **Start MySQL Service**:
   ```bash
   # Windows
   net start mysql
   # Or via Services panel
   ```

3. **Run Database Setup**:
   ```bash
   cd backend
   node setup-database.js
   ```

## Option 2: Use SQLite (Development Alternative)

If you prefer not to install MySQL, you can switch to SQLite for development:

1. **Install SQLite package**:
   ```bash
   cd backend
   npm install sqlite3
   ```

2. **Update database configuration** in `config/db.js`:
   ```javascript
   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize({
     dialect: 'sqlite',
     storage: './database.sqlite',
     logging: false
   });
   ```

3. **Restart the server**:
   ```bash
   node server.js
   ```

## Current Issue

The server is running but cannot connect to MySQL, which causes:
- 401 Unauthorized on `/api/auth/me` (no database to validate tokens)
- 500 Internal Server Error on `/api/auth/register` (cannot create users)

## Environment Variables

Ensure your `.env` file has correct database settings:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=cyber_toolkit
```

Choose one of the options above and restart the server to resolve the authentication errors.
