const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');
const { validateSchema, schemas } = require('../utils/validators');

class AuthController {
  /**
   * Register new user
   */
  static async register(req, res) {
    try {
      const { valid, value, errors } = await validateSchema(req.body, schemas.registerSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: value.email } });
      if (existingUser) {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: ERROR_MESSAGES.USER_ALREADY_EXISTS
        });
      }

      // Create user
      const user = await User.create(value);

      // Generate tokens
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email
      });

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: user.toJSON(),
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Login user
   */
  static async login(req, res) {
    try {
      const { valid, value, errors } = await validateSchema(req.body, schemas.loginSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      // Find user
      const user = await User.findOne({ where: { email: value.email } });
      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS
        });
      }

      // Check password
      if (!user.validatePassword(value.password)) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: 'User account is disabled'
        });
      }

      // Update last login
      await user.update({ lastLogin: new Date() });

      // Generate tokens
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Login successful',
        data: {
          user: user.toJSON(),
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user.toJSON()
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }
}

module.exports = AuthController;
