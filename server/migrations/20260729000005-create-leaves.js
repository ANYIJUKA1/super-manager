'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaves', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      leaveTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'leave_types',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      numberOfDays: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'),
        defaultValue: 'PENDING'
      },
      approvedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      approvalDate: {
        type: Sequelize.DATE
      },
      remarks: {
        type: Sequelize.TEXT
      },
      attachmentUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add indexes
    await queryInterface.addIndex('leaves', ['employeeId']);
    await queryInterface.addIndex('leaves', ['status']);
    await queryInterface.addIndex('leaves', ['startDate']);
    await queryInterface.addIndex('leaves', ['endDate']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaves');
  }
};
