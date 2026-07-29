'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('leave_types', [
      {
        name: 'Annual Leave',
        description: 'Annual vacation leave',
        daysPerYear: 20,
        isPaid: true,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sick Leave',
        description: 'Leave for illness or medical appointments',
        daysPerYear: 10,
        isPaid: true,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maternity Leave',
        description: 'Leave for pregnancy and childbirth',
        daysPerYear: 90,
        isPaid: true,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paternity Leave',
        description: 'Leave for new fathers',
        daysPerYear: 14,
        isPaid: true,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bereavement Leave',
        description: 'Leave for family death',
        daysPerYear: 5,
        isPaid: true,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Unpaid Leave',
        description: 'Unpaid leave without benefits',
        daysPerYear: 0,
        isPaid: false,
        requiresApproval: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('leave_types', null, {});
  }
};
