const { body, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Validation rules for registration
const registrationValidationRules = () => {
  return [
    body('name')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Name must be between 2 and 255 characters')
      .matches(/^[a-zA-Z\s.'-]+$/)
      .withMessage('Name can only contain letters, spaces, dots, hyphens, and apostrophes')
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .isLength({ max: 255 })
      .withMessage('Email must not exceed 255 characters')
      .normalizeEmail()
      .notEmpty()
      .withMessage('Email is required'),

    body('designation')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Designation must be between 2 and 255 characters')
      .notEmpty()
      .withMessage('Designation is required'),

    body('course')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Course must be between 2 and 255 characters')
      .notEmpty()
      .withMessage('Course is required'),

    body('location')
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Location must be between 2 and 255 characters')
      .notEmpty()
      .withMessage('Location is required'),
  ];
};

// Validation for getting registration by ID
const idValidationRules = () => {
  return [
    body('id')
      .optional()
      .isInt({ min: 1 })
      .withMessage('ID must be a positive integer'),
  ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation failed:', {
      path: req.path,
      errors: errors.array(),
      body: req.body,
    });

    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
          value: err.value,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  }
  next();
};

// Sanitize input data
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        // Remove any potential SQL injection characters
        req.body[key] = req.body[key]
          .replace(/[<>]/g, '') // Remove < and >
          .trim();
      }
    });
  }
  next();
};

module.exports = {
  registrationValidationRules,
  idValidationRules,
  validate,
  sanitizeInput,
};
