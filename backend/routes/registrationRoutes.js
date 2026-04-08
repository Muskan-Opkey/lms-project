const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getRegistrationStats,
} = require('../controllers/registrationController');
const {
  registrationValidationRules,
  validate,
  sanitizeInput,
} = require('../middleware/validator');
const { registrationLimiter } = require('../middleware/rateLimiter');
const { asyncHandler } = require('../middleware/errorHandler');

// Statistics route (must be before :id route)
router.get('/stats', asyncHandler(getRegistrationStats));

// Create new registration
router.post(
  '/',
  registrationLimiter,
  sanitizeInput,
  registrationValidationRules(),
  validate,
  asyncHandler(createRegistration)
);

// Get all registrations with pagination
router.get('/', asyncHandler(getAllRegistrations));

// Get registration by ID
router.get('/:id', asyncHandler(getRegistrationById));

// Update registration by ID
router.put(
  '/:id',
  sanitizeInput,
  registrationValidationRules(),
  validate,
  asyncHandler(updateRegistration)
);

// Delete registration by ID
router.delete('/:id', asyncHandler(deleteRegistration));

module.exports = router;
