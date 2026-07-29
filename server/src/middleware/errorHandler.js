const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = {};
    err.errors.forEach(error => {
      errors[error.path] = [error.message];
    });
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      errors
    });
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = {};
    err.errors.forEach(error => {
      errors[error.path] = [error.message];
    });
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: 'Unique constraint violation',
      errors
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Token has expired'
    });
  }

  // Default error
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || ERROR_MESSAGES.INTERNAL_ERROR
  });
};

module.exports = {
  errorHandler
};
