const Joi = require('joi');

// Validation schemas
const schemas = {
  // Auth Schemas
  registerSchema: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    }),
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required'
    }),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').default('EMPLOYEE')
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Employee Schemas
  createEmployeeSchema: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/),
    dateOfBirth: Joi.date(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    country: Joi.string(),
    departmentId: Joi.number().integer().required(),
    position: Joi.string().required(),
    joinDate: Joi.date().required(),
    salary: Joi.number().min(0),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED').default('ACTIVE')
  }),

  updateEmployeeSchema: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/),
    dateOfBirth: Joi.date(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    country: Joi.string(),
    departmentId: Joi.number().integer(),
    position: Joi.string(),
    salary: Joi.number().min(0),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED')
  }).min(1),

  // Department Schemas
  createDepartmentSchema: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    managerId: Joi.number().integer(),
    parentDepartmentId: Joi.number().integer()
  }),

  updateDepartmentSchema: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    managerId: Joi.number().integer(),
    parentDepartmentId: Joi.number().integer()
  }).min(1),

  // Leave Schemas
  createLeaveSchema: Joi.object({
    leaveTypeId: Joi.number().integer().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    reason: Joi.string(),
    numberOfDays: Joi.number().integer().min(1)
  }),

  updateLeaveSchema: Joi.object({
    status: Joi.string().valid('APPROVED', 'REJECTED').required(),
    remarks: Joi.string()
  })
};

/**
 * Validate request data against schema
 */
const validateSchema = async (data, schema) => {
  try {
    const value = await schema.validateAsync(data, {
      abortEarly: false,
      stripUnknown: true
    });
    return { valid: true, value, errors: null };
  } catch (error) {
    const errors = {};
    if (error.details) {
      error.details.forEach((detail) => {
        const field = detail.path.join('.');
        errors[field] = [detail.message];
      });
    }
    return { valid: false, value: null, errors };
  }
};

module.exports = {
  schemas,
  validateSchema
};
