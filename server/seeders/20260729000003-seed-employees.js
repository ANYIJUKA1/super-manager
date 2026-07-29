'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        userId: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        phone: '1234567890',
        dateOfBirth: '1990-01-01',
        gender: 'MALE',
        address: '123 Admin St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        departmentId: 1,
        position: 'System Administrator',
        joinDate: '2024-01-01',
        salary: 120000,
        status: 'ACTIVE',
        reportingManagerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        firstName: 'John',
        lastName: 'Manager',
        email: 'manager@example.com',
        phone: '0987654321',
        dateOfBirth: '1988-05-15',
        gender: 'MALE',
        address: '456 Manager Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
        departmentId: 1,
        position: 'Engineering Manager',
        joinDate: '2024-02-01',
        salary: 100000,
        status: 'ACTIVE',
        reportingManagerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        firstName: 'Jane',
        lastName: 'Employee',
        email: 'employee@example.com',
        phone: '5555555555',
        dateOfBirth: '1992-08-20',
        gender: 'FEMALE',
        address: '789 Employee Rd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        departmentId: 2,
        position: 'Software Engineer',
        joinDate: '2024-03-01',
        salary: 80000,
        status: 'ACTIVE',
        reportingManagerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
