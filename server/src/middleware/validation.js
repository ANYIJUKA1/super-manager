const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

/**
 * Request validation middleware
 */
const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const { value, error } = await schema.validateAsync(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true
        }
      );

      if (error) {
        const errors = {};
        error.details.forEach((detail) => {
          const field = detail.path.join('.');
          errors[field] = [detail.message];
        });

        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      req.validatedData = value;
      next();
    } catch (err) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  };
};

module.exports = {
  validateRequest
};
