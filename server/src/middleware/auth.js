const { verifyAccessToken } = require('../utils/tokenUtils');
const { HTTP_STATUS, ERROR_MESSAGES, USER_ROLES } = require('../config/constants');

/**
 * Verify JWT token middleware
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    const token = authHeader.substring(7);
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
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED
    });
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.FORBIDDEN
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is ADMIN
 */
const requireAdmin = authorize(USER_ROLES.ADMIN);

/**
 * Middleware to check if user is ADMIN or MANAGER
 */
const requireManagerOrAdmin = authorize(USER_ROLES.ADMIN, USER_ROLES.MANAGER);

module.exports = {
  authenticate,
  authorize,
  requireAdmin,
  requireManagerOrAdmin
};
