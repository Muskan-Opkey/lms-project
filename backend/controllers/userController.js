const { query } = require('../config/database');
const logger = require('../config/logger');

/**
 * Create a new user (Sign Up)
 * @route POST /api/v1/users/signup
 */
const createUser = async (req, res, next) => {
  try {
    const { id, name, email, password, registeredAt } = req.body;

    logger.info('Creating new user:', { name, email });

    // Check if email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    const checkResult = await query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Email already exists',
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Format the date for MySQL (YYYY-MM-DD HH:MM:SS)
    const formatDateForMySQL = (date) => {
      const d = new Date(date);
      return d.toISOString().slice(0, 19).replace('T', ' ');
    };

    const mysqlDate = formatDateForMySQL(registeredAt || new Date());

    // Insert into database
    const insertQuery = `
      INSERT INTO users (id, name, email, password, registered_at)
      VALUES (?, ?, ?, ?, ?)
    `;

    await query(insertQuery, [id, name, email, password, mysqlDate]);

    logger.info('User created successfully:', { id, email });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id,
        name,
        email,
        registeredAt: registeredAt || new Date(),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error creating user:', error);
    next(error);
  }
};

/**
 * Get all users
 * @route GET /api/v1/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    logger.info('Fetching all users');

    const selectQuery = 'SELECT id, name, email, registered_at FROM users ORDER BY registered_at DESC';
    const result = await query(selectQuery);

    res.status(200).json({
      success: true,
      data: result.rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    next(error);
  }
};

/**
 * Get user by ID
 * @route GET /api/v1/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    logger.info('Fetching user by ID:', { id });

    const selectQuery = 'SELECT id, name, email, registered_at FROM users WHERE id = ?';
    const result = await query(selectQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'User not found',
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching user by ID:', error);
    next(error);
  }
};

/**
 * Delete user by ID
 * @route DELETE /api/v1/users/:id
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    logger.info('Deleting user:', { id });

    // Check if user exists
    const checkQuery = 'SELECT * FROM users WHERE id = ?';
    const checkResult = await query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'User not found',
        },
        timestamp: new Date().toISOString(),
      });
    }

    const deleteQuery = 'DELETE FROM users WHERE id = ?';
    await query(deleteQuery, [id]);

    logger.info('User deleted successfully:', { id });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error deleting user:', error);
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
