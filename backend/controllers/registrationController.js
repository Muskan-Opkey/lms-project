const { query } = require('../config/database');
const logger = require('../config/logger');

/**
 * Create a new registration
 * @route POST /api/v1/registrations
 */
const createRegistration = async (req, res, next) => {
  try {
    const { name, email, designation, course, location } = req.body;

    logger.info('Creating new registration:', { name, email, designation, course, location });

    // Insert into database
    const insertQuery = `
      INSERT INTO mysqlTable (name, email, designation, course, location)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(insertQuery, [name, email, designation, course, location]);
    
    // Get the inserted record
    const selectQuery = 'SELECT * FROM mysqlTable WHERE id = ?';
    const selectResult = await query(selectQuery, [result.rows.insertId]);
    const registration = selectResult.rows[0];

    logger.info('Registration created successfully:', { id: registration.id });

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: {
        id: registration.id,
        name: registration.name,
        email: registration.email,
        designation: registration.designation,
        course: registration.course,
        location: registration.location,
        createdAt: registration.created_at,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error creating registration:', error);
    next(error);
  }
};

/**
 * Get all registrations with pagination
 * @route GET /api/v1/registrations
 */
const getAllRegistrations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    logger.info('Fetching registrations:', { page, limit });

    // Get total count
    const countQuery = 'SELECT COUNT(*) as count FROM mysqlTable';
    const countResult = await query(countQuery);
    const totalRecords = parseInt(countResult.rows[0].count);

    // Get paginated data
    const selectQuery = `
      SELECT * FROM mysqlTable
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    const result = await query(selectQuery, [limit, offset]);

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords: totalRecords,
        recordsPerPage: limit,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching registrations:', error);
    next(error);
  }
};

/**
 * Get registration by ID
 * @route GET /api/v1/registrations/:id
 */
const getRegistrationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    logger.info('Fetching registration by ID:', { id });

    const selectQuery = `
      SELECT * FROM mysqlTable
      WHERE id = ?
    `;

    const result = await query(selectQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Registration not found',
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
    logger.error('Error fetching registration by ID:', error);
    next(error);
  }
};

/**
 * Update registration by ID
 * @route PUT /api/v1/registrations/:id
 */
const updateRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, designation, course, location } = req.body;

    logger.info('Updating registration:', { id, name, email, designation, course, location });

    const updateQuery = `
      UPDATE mysqlTable
      SET name = ?, email = ?, designation = ?, course = ?, location = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const result = await query(updateQuery, [name, email, designation, course, location, id]);

    // Check if record was updated
    if (result.rows.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Registration not found',
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Fetch the updated record
    const selectQuery = 'SELECT * FROM mysqlTable WHERE id = ?';
    const selectResult = await query(selectQuery, [id]);

    logger.info('Registration updated successfully:', { id });

    res.status(200).json({
      success: true,
      message: 'Registration updated successfully',
      data: selectResult.rows[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error updating registration:', error);
    next(error);
  }
};

/**
 * Delete registration by ID
 * @route DELETE /api/v1/registrations/:id
 */
const deleteRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;

    logger.info('Deleting registration:', { id });

    // First check if record exists
    const checkQuery = 'SELECT * FROM mysqlTable WHERE id = ?';
    const checkResult = await query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Registration not found',
        },
        timestamp: new Date().toISOString(),
      });
    }

    const deleteQuery = 'DELETE FROM mysqlTable WHERE id = ?';
    await query(deleteQuery, [id]);

    logger.info('Registration deleted successfully:', { id });

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error deleting registration:', error);
    next(error);
  }
};

/**
 * Get registration statistics
 * @route GET /api/v1/registrations/stats
 */
const getRegistrationStats = async (req, res, next) => {
  try {
    logger.info('Fetching registration statistics');

    const statsQuery = `
      SELECT 
        COUNT(*) as total_registrations,
        COUNT(DISTINCT course) as total_courses,
        COUNT(DISTINCT location) as total_locations,
        COUNT(DISTINCT designation) as total_designations
      FROM mysqlTable
    `;

    const courseStatsQuery = `
      SELECT course, COUNT(*) as count
      FROM mysqlTable
      GROUP BY course
      ORDER BY count DESC
    `;

    const [stats, courseStats] = await Promise.all([
      query(statsQuery),
      query(courseStatsQuery),
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats.rows[0],
        courseBreakdown: courseStats.rows,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching statistics:', error);
    next(error);
  }
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getRegistrationStats,
};
