const sequelize = require('../config/database');

const User = require('./User')(sequelize);
const Employee = require('./Employee')(sequelize);
const Department = require('./Department')(sequelize);
const Leave = require('./Leave')(sequelize);
const LeaveType = require('./LeaveType')(sequelize);

// Associations
User.hasOne(Employee, { foreignKey: 'userId' });
Employee.belongsTo(User, { foreignKey: 'userId' });

Employee.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Employee, { foreignKey: 'departmentId' });

Department.belongsTo(Department, { foreignKey: 'parentDepartmentId', as: 'parentDepartment' });
Department.hasMany(Department, { foreignKey: 'parentDepartmentId', as: 'childDepartments' });

Department.belongsTo(Employee, { foreignKey: 'managerId', as: 'manager' });

Employee.belongsTo(Employee, { foreignKey: 'reportingManagerId', as: 'reportingManager' });
Employee.hasMany(Employee, { foreignKey: 'reportingManagerId', as: 'subordinates' });

Leave.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(Leave, { foreignKey: 'employeeId' });

Leave.belongsTo(LeaveType, { foreignKey: 'leaveTypeId' });
LeaveType.hasMany(Leave, { foreignKey: 'leaveTypeId' });

Leave.belongsTo(Employee, { foreignKey: 'approvedBy', as: 'approver' });

module.exports = {
  sequelize,
  User,
  Employee,
  Department,
  Leave,
  LeaveType
};
