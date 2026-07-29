const { DataTypes } = require('sequelize');
const { LEAVE_STATUS } = require('../config/constants');

module.exports = (sequelize) => {
  const Leave = sequelize.define('Leave', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    leaveTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leave_types',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numberOfDays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reason: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM(...Object.values(LEAVE_STATUS)),
      defaultValue: LEAVE_STATUS.PENDING
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    approvalDate: DataTypes.DATE,
    remarks: DataTypes.TEXT,
    attachmentUrl: DataTypes.STRING
  }, {
    tableName: 'leaves',
    timestamps: true,
    underscored: true
  });

  return Leave;
};
