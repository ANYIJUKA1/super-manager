const jwt = require('jsonwebtoken');
const { USER_ROLES, HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');
const { verifyAccessToken } = require('./tokenUtils');

/**
 * Authentication middleware
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_TOKEN
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED
    });
  }
};

/**
 * Admin only middleware
 */
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== USER_ROLES.ADMIN) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.FORBIDDEN
    });
  }
  next();
};

/**
 * Manager or Admin middleware
 */
const requireManagerOrAdmin = (req, res, next) => {
  const allowedRoles = [USER_ROLES.MANAGER, USER_ROLES.ADMIN];
  if (!allowedRoles.includes(req.user?.role)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: ERROR_MESSAGES.FORBIDDEN
    });
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin,
  requireManagerOrAdmin
};
