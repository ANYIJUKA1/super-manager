const { Department, Employee } = require('../models');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');
const { validateSchema, schemas } = require('../utils/validators');

class DepartmentController {
  /**
   * Get all departments
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Department.findAndCountAll({
        include: [
          { model: Employee, as: 'manager', attributes: ['id', 'firstName', 'lastName'] },
          { model: Department, as: 'parentDepartment', attributes: ['id', 'name'] }
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
      console.error('Get all departments error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Get single department
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const department = await Department.findByPk(id, {
        include: [
          { model: Employee, as: 'manager', attributes: ['id', 'firstName', 'lastName', 'email'] },
          { model: Department, as: 'parentDepartment' },
          { model: Department, as: 'childDepartments' },
          { model: Employee, attributes: ['id', 'firstName', 'lastName', 'position', 'email'] }
        ]
      });

      if (!department) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: department
      });
    } catch (error) {
      console.error('Get department error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Create new department
   */
  static async create(req, res) {
    try {
      const { valid, value, errors } = await validateSchema(req.body, schemas.createDepartmentSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      const department = await Department.create(value);

      const fullDepartment = await Department.findByPk(department.id, {
        include: [
          { model: Employee, as: 'manager' },
          { model: Department, as: 'parentDepartment' }
        ]
      });

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Department created successfully',
        data: fullDepartment
      });
    } catch (error) {
      console.error('Create department error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Update department
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { valid, value, errors } = await validateSchema(req.body, schemas.updateDepartmentSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      const department = await Department.findByPk(id);
      if (!department) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND
        });
      }

      await department.update(value);

      const updatedDepartment = await Department.findByPk(id, {
        include: [
          { model: Employee, as: 'manager' },
          { model: Department, as: 'parentDepartment' }
        ]
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Department updated successfully',
        data: updatedDepartment
      });
    } catch (error) {
      console.error('Update department error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Delete department
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const department = await Department.findByPk(id);
      if (!department) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND
        });
      }

      await department.destroy();

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Department deleted successfully'
      });
    } catch (error) {
      console.error('Delete department error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }
}

module.module.exports = DepartmentController;
