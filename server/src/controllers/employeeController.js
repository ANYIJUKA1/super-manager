const { Employee, Department, User } = require('../models');
const { HTTP_STATUS, ERROR_MESSAGES, EMPLOYEE_STATUS } = require('../config/constants');
const { validateSchema, schemas } = require('../utils/validators');

class EmployeeController {
  /**
   * Get all employees
   */
  static async getAll(req, res) {
    try {
      const { departmentId, status, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (departmentId) where.departmentId = departmentId;
      if (status) where.status = status;

      const { count, rows } = await Employee.findAndCountAll({
        where,
        include: [
          { model: Department, attributes: ['id', 'name'] },
          { model: User, attributes: ['id', 'email', 'role'] },
          { model: Employee, as: 'reportingManager', attributes: ['id', 'firstName', 'lastName'] }
        ],
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']]
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Get all employees error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Get single employee
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.findByPk(id, {
        include: [
          { model: Department },
          { model: User, attributes: ['id', 'email', 'role'] },
          { model: Employee, as: 'reportingManager' }
        ]
      });

      if (!employee) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: employee
      });
    } catch (error) {
      console.error('Get employee error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Create new employee
   */
  static async create(req, res) {
    try {
      const { valid, value, errors } = await validateSchema(req.body, schemas.createEmployeeSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      // Check if department exists
      const department = await Department.findByPk(value.departmentId);
      if (!department) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND
        });
      }

      // Create employee
      const employee = await Employee.create(value);

      const fullEmployee = await Employee.findByPk(employee.id, {
        include: [
          { model: Department },
          { model: User, attributes: ['id', 'email', 'role'] }
        ]
      });

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Employee created successfully',
        data: fullEmployee
      });
    } catch (error) {
      console.error('Create employee error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Update employee
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { valid, value, errors } = await validateSchema(req.body, schemas.updateEmployeeSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND
        });
      }

      await employee.update(value);

      const updatedEmployee = await Employee.findByPk(id, {
        include: [
          { model: Department },
          { model: User, attributes: ['id', 'email', 'role'] }
        ]
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Employee updated successfully',
        data: updatedEmployee
      });
    } catch (error) {
      console.error('Update employee error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Delete employee
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.EMPLOYEE_NOT_FOUND
        });
      }

      await employee.destroy();

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Employee deleted successfully'
      });
    } catch (error) {
      console.error('Delete employee error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }
}

module.exports = EmployeeController;
