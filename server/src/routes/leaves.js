const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');
const { authenticate, requireManagerOrAdmin } = require('../middleware/auth');

/**
 * @route GET /api/leaves
 * @desc Get all leave requests
 * @access Private
 */
router.get('/', authenticate, LeaveController.getAll);

/**
 * @route GET /api/leaves/:id
 * @desc Get single leave request
 * @access Private
 */
router.get('/:id', authenticate, LeaveController.getById);

/**
 * @route POST /api/leaves
 * @desc Create leave request
 * @access Private
 */
router.post('/', authenticate, LeaveController.create);

/**
 * @route PUT /api/leaves/:id/approve
 * @desc Approve leave request
 * @access Private - Manager or Admin
 */
router.put('/:id/approve', authenticate, requireManagerOrAdmin, LeaveController.approve);

/**
 * @route PUT /api/leaves/:id/reject
 * @desc Reject leave request
 * @access Private - Manager or Admin
 */
router.put('/:id/reject', authenticate, requireManagerOrAdmin, LeaveController.reject);

module.exports = router;
