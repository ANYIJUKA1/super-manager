const { Leave, Employee, LeaveType, sequelize } = require('../models');
const { HTTP_STATUS, ERROR_MESSAGES, LEAVE_STATUS } = require('../config/constants');
const { validateSchema, schemas } = require('../utils/validators');
const moment = require('moment');

class LeaveController {
  /**
   * Get all leave requests
   */
  static async getAll(req, res) {
    try {
      const { employeeId, status, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (employeeId) where.employeeId = employeeId;
      if (status) where.status = status;

      const { count, rows } = await Leave.findAndCountAll({
        where,
        include: [
          { model: Employee, attributes: ['id', 'firstName', 'lastName', 'email'] },
          { model: LeaveType, attributes: ['id', 'name'] },
          { model: Employee, as: 'approver', attributes: ['id', 'firstName', 'lastName'] }
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
      console.error('Get all leaves error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Get single leave request
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const leave = await Leave.findByPk(id, {
        include: [
          { model: Employee },
          { model: LeaveType },
          { model: Employee, as: 'approver' }
        ]
      });

      if (!leave) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.LEAVE_NOT_FOUND
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: leave
      });
    } catch (error) {
      console.error('Get leave error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Create leave request
   */
  static async create(req, res) {
    try {
      const { valid, value, errors } = await validateSchema(req.body, schemas.createLeaveSchema);
      
      if (!valid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors
        });
      }

      // Calculate number of days
      const start = moment(value.startDate);
      const end = moment(value.endDate);
      const numberOfDays = end.diff(start, 'days') + 1;

      const leave = await Leave.create({
        ...value,
        numberOfDays,
        employeeId: req.user.employeeId || req.user.id
      });

      const fullLeave = await Leave.findByPk(leave.id, {
        include: [
          { model: Employee },
          { model: LeaveType },
          { model: Employee, as: 'approver' }
        ]
      });

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Leave request created successfully',
        data: fullLeave
      });
    } catch (error) {
      console.error('Create leave error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Approve leave request
   */
  static async approve(req, res) {
    try {
      const { id } = req.params;
      const { remarks } = req.body;

      const leave = await Leave.findByPk(id);
      if (!leave) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.LEAVE_NOT_FOUND
        });
      }

      if (leave.status !== LEAVE_STATUS.PENDING) {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: 'Leave request has already been processed'
        });
      }

      await leave.update({
        status: LEAVE_STATUS.APPROVED,
        approvedBy: req.user.id,
        approvalDate: new Date(),
        remarks
      });

      const updatedLeave = await Leave.findByPk(id, {
        include: [
          { model: Employee },
          { model: LeaveType },
          { model: Employee, as: 'approver' }
        ]
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Leave request approved',
        data: updatedLeave
      });
    } catch (error) {
      console.error('Approve leave error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }

  /**
   * Reject leave request
   */
  static async reject(req, res) {
    try {
      const { id } = req.params;
      const { remarks } = req.body;

      const leave = await Leave.findByPk(id);
      if (!leave) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.LEAVE_NOT_FOUND
        });
      }

      if (leave.status !== LEAVE_STATUS.PENDING) {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: 'Leave request has already been processed'
        });
      }

      await leave.update({
        status: LEAVE_STATUS.REJECTED,
        approvedBy: req.user.id,
        approvalDate: new Date(),
        remarks
      });

      const updatedLeave = await Leave.findByPk(id, {
        include: [
          { model: Employee },
          { model: LeaveType },
          { model: Employee, as: 'approver' }
        ]
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Leave request rejected',
        data: updatedLeave
      });
    } catch (error) {
      console.error('Reject leave error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }
}

module.exports = LeaveController;
