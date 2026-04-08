const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.',
    },
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    logger.warn('Rate limit exceeded:', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again later.',
      },
      timestamp: new Date().toISOString(),
    });
  },
});

// Stricter rate limiter for registration endpoint
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 registration attempts per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many registration attempts, please try again later.',
    },
    timestamp: new Date().toISOString(),
  },
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    logger.warn('Registration rate limit exceeded:', {
      ip: req.ip,
      body: req.body,
    });
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many registration attempts, please try again later.',
      },
      timestamp: new Date().toISOString(),
    });
  },
});

module.exports = {
  apiLimiter,
  registrationLimiter,
};
