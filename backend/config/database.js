const mysql = require('mysql2/promise');
const logger = require('./logger');

// Database connection configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'mysqldb',
  user: process.env.DB_USER || 'mysql',
  password: process.env.DB_PASSWORD || 'mysql',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_MAX_CONNECTIONS) || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection function
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('SELECT NOW() as now');
    logger.info('Database connection test successful:', result[0]);
    connection.release();
    return true;
  } catch (error) {
    logger.error('Database connection test failed:', error);
    throw error;
  }
};

// Create table if not exists
const initializeDatabase = async () => {
  const createRegistrationTableQuery = `
    CREATE TABLE IF NOT EXISTS mysqlTable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      designation VARCHAR(255) NOT NULL,
      course VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  const createRegistrationIndexQueries = [
    'CREATE INDEX IF NOT EXISTS idx_registration_name ON mysqlTable (name)',
    'CREATE INDEX IF NOT EXISTS idx_registration_course ON mysqlTable (course)',
    'CREATE INDEX IF NOT EXISTS idx_registration_created_at ON mysqlTable (created_at)'
  ];

  const createUserIndexQueries = [
    'CREATE INDEX IF NOT EXISTS idx_user_email ON users (email)',
    'CREATE INDEX IF NOT EXISTS idx_user_registered_at ON users (registered_at)'
  ];

  try {
    // Create registration table
    await pool.query(createRegistrationTableQuery);
    logger.info('Registration table initialized successfully');
    
    // Create users table
    await pool.query(createUsersTableQuery);
    logger.info('Users table initialized successfully');
    
    // Create registration indexes
    for (const indexQuery of createRegistrationIndexQueries) {
      try {
        await pool.query(indexQuery);
      } catch (err) {
        // Ignore if index already exists
        if (!err.message.includes('Duplicate key name')) {
          logger.warn('Index creation warning:', err.message);
        }
      }
    }
    
    // Create user indexes
    for (const indexQuery of createUserIndexQueries) {
      try {
        await pool.query(indexQuery);
      } catch (err) {
        // Ignore if index already exists
        if (!err.message.includes('Duplicate key name')) {
          logger.warn('Index creation warning:', err.message);
        }
      }
    }
    
    logger.info('Database indexes created successfully');
  } catch (error) {
    logger.error('Database initialization failed:', error.message);
    throw error;
  }
};

// Query helper with error handling
const query = async (text, params = []) => {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text: text.substring(0, 100), duration, rowCount: Array.isArray(rows) ? rows.length : 1 });
    return { rows, fields };
  } catch (error) {
    logger.error('Database query error:', { text: text.substring(0, 100), error: error.message });
    throw error;
  }
};

// Graceful shutdown
const closePool = async () => {
  try {
    await pool.end();
    logger.info('MySQL database pool closed successfully');
  } catch (error) {
    logger.error('Error closing database pool:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  query,
  testConnection,
  initializeDatabase,
  closePool,
};
