const { Employee, Department, Leave, sequelize } = require('../models');
const { HTTP_STATUS, ERROR_MESSAGES, LEAVE_STATUS } = require('../config/constants');
const { Op } = require('sequelize');
const moment = require('moment');

class DashboardController {
  /**
   * Get dashboard statistics
   */
  static async getStats(req, res) {
    try {
      // Total employees
      const totalEmployees = await Employee.count();

      // Employees by status
      const employeesByStatus = await Employee.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['status']
      });

      // Total departments
      const totalDepartments = await Department.count();

      // Leave statistics (this month)
      const currentMonth = moment().startOf('month');
      const nextMonth = moment().endOf('month');

      const leaveCount = await Leave.count({
        where: {
          startDate: {
            [Op.gte]: currentMonth.toDate(),
            [Op.lte]: nextMonth.toDate()
          }
        }
      });

      const approvedLeaves = await Leave.count({
        where: {
          status: LEAVE_STATUS.APPROVED,
          startDate: {
            [Op.gte]: currentMonth.toDate(),
            [Op.lte]: nextMonth.toDate()
          }
        }
      });

      const pendingLeaves = await Leave.count({
        where: {
          status: LEAVE_STATUS.PENDING,
          startDate: {
            [Op.gte]: currentMonth.toDate(),
            [Op.lte]: nextMonth.toDate()
          }
        }
      });

      // Employees per department
      const departmentStats = await Department.findAll({
        attributes: [
          'id',
          'name',
          [sequelize.fn('COUNT', sequelize.col('Employees.id')), 'employeeCount']
        ],
        include: [{
          model: Employee,
          attributes: [],
          required: false
        }],
        group: ['Department.id', 'Department.name'],
        subQuery: false
      });

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          summary: {
            totalEmployees,
            totalDepartments,
            leaveThisMonth: leaveCount
          },
          employeesByStatus,
          leaves: {
            approved: approvedLeaves,
            pending: pendingLeaves,
            total: leaveCount
          },
          departmentStats
        }
      });
    } catch (error) {
      console.error('Get stats error:', error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR
      });
    }
  }
}

module.exports = DashboardController;
