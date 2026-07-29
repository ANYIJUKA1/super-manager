const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departmentController');
const { authenticate, requireAdmin, requireManagerOrAdmin } = require('../middleware/auth');

/**
 * @route GET /api/departments
 * @desc Get all departments
 * @access Private
 */
router.get('/', authenticate, DepartmentController.getAll);

/**
 * @route GET /api/departments/:id
 * @desc Get single department
 * @access Private
 */
router.get('/:id', authenticate, DepartmentController.getById);

/**
 * @route POST /api/departments
 * @desc Create new department
 * @access Private - Admin only
 */
router.post('/', authenticate, requireAdmin, DepartmentController.create);

/**
 * @route PUT /api/departments/:id
 * @desc Update department
 * @access Private - Admin or Manager
 */
router.put('/:id', authenticate, requireManagerOrAdmin, DepartmentController.update);

/**
 * @route DELETE /api/departments/:id
 * @desc Delete department
 * @access Private - Admin only
 */
router.delete('/:id', authenticate, requireAdmin, DepartmentController.delete);

module.exports = router;
