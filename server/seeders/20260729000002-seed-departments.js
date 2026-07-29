'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      {
        name: 'Engineering',
        description: 'Software development team',
        managerId: null,
        parentDepartmentId: null,
        budget: 500000,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sales',
        description: 'Sales and business development',
        managerId: null,
        parentDepartmentId: null,
        budget: 300000,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Human Resources',
        description: 'HR and employee management',
        managerId: null,
        parentDepartmentId: null,
        budget: 200000,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marketing',
        description: 'Marketing and communications',
        managerId: null,
        parentDepartmentId: null,
        budget: 250000,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Finance',
        description: 'Finance and accounting',
        managerId: null,
        parentDepartmentId: null,
        budget: 200000,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
