const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = ERROR_MESSAGES.INTERNAL_ERROR;
  let errors = null;

  // Handle Joi validation errors
  if (err.isJoi) {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    errors = {};
    err.details.forEach((detail) => {
      const field = detail.path.join('.');
      errors[field] = [detail.message];
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    errors = {};
    err.errors.forEach((error) => {
      errors[error.path] = [error.message];
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Duplicate entry';
    errors = {};
    err.errors.forEach((error) => {
      errors[error.path] = ['This value already exists'];
    });
  }

  // Custom error response
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message || message;
    errors = err.errors || errors;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};

/**
 * Async route wrapper to catch errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  asyncHandler
};
