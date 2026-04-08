const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API info endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LMS Registration API',
    version: '1.0.0',
    endpoints: {
      registrations: '/api/v1/registrations',
      health: '/api/v1/health',
    },
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
