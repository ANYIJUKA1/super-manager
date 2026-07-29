const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const { authenticate, requireAdmin, requireManagerOrAdmin } = require('../middleware/auth');

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access Private
 */
router.get('/', authenticate, EmployeeController.getAll);

/**
 * @route GET /api/employees/:id
 * @desc Get single employee
 * @access Private
 */
router.get('/:id', authenticate, EmployeeController.getById);

/**
 * @route POST /api/employees
 * @desc Create new employee
 * @access Private - Admin only
 */
router.post('/', authenticate, requireAdmin, EmployeeController.create);

/**
 * @route PUT /api/employees/:id
 * @desc Update employee
 * @access Private - Admin or Manager
 */
router.put('/:id', authenticate, requireManagerOrAdmin, EmployeeController.update);

/**
 * @route DELETE /api/employees/:id
 * @desc Delete employee
 * @access Private - Admin only
 */
router.delete('/:id', authenticate, requireAdmin, EmployeeController.delete);

module.exports = router;
