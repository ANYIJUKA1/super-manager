'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER')
      },
      address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      joinDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      salary: {
        type: Sequelize.DECIMAL(12, 2)
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED'),
        defaultValue: 'ACTIVE'
      },
      reportingManagerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'id'
        },
        onDelete: 'SET NULL'
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
    await queryInterface.addIndex('employees', ['departmentId']);
    await queryInterface.addIndex('employees', ['status']);
    await queryInterface.addIndex('employees', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};
