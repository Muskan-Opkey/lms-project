const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/userController');

// Validation rules for user creation
const userValidationRules = [
  body('id').notEmpty().withMessage('User ID is required'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Name must be between 3 and 255 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];

// Routes
router.post('/signup', userValidationRules, validate, createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
