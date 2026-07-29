const Joi = require('joi');

const schemas = {
  registerSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'EMPLOYEE').optional()
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  createEmployeeSchema: Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
    departmentId: Joi.number().required(),
    position: Joi.string().required(),
    joinDate: Joi.date().required(),
    salary: Joi.number().optional(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED').optional(),
    reportingManagerId: Joi.number().optional()
  }),

  updateEmployeeSchema: Joi.object({
    firstName: Joi.string().min(2).optional(),
    lastName: Joi.string().min(2).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional(),
    departmentId: Joi.number().optional(),
    position: Joi.string().optional(),
    salary: Joi.number().optional(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED').optional(),
    reportingManagerId: Joi.number().optional()
  }),

  createDepartmentSchema: Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().optional(),
    managerId: Joi.number().optional(),
    parentDepartmentId: Joi.number().optional(),
    budget: Joi.number().optional()
  }),

  updateDepartmentSchema: Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().optional(),
    managerId: Joi.number().optional(),
    parentDepartmentId: Joi.number().optional(),
    budget: Joi.number().optional(),
    isActive: Joi.boolean().optional()
  }),

  createLeaveSchema: Joi.object({
    leaveTypeId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    reason: Joi.string().optional()
  })
};

const validateSchema = async (data, schema) => {
  try {
    const value = await schema.validateAsync(data, { abortEarly: false });
    return { valid: true, value, errors: null };
  } catch (error) {
    const errors = {};
    if (error.details) {
      error.details.forEach(detail => {
        if (!errors[detail.context.label]) {
          errors[detail.context.label] = [];
        }
        errors[detail.context.label].push(detail.message);
      });
    }
    return { valid: false, value: null, errors };
  }
};

module.exports = {
  schemas,
  validateSchema
};
