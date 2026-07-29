// User Roles
const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

// Leave Types
const LEAVE_TYPES = {
  ANNUAL: 'ANNUAL',
  SICK: 'SICK',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
  UNPAID: 'UNPAID',
  EMERGENCY: 'EMERGENCY'
};

// Leave Status
const LEAVE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

// Employee Status
const EMPLOYEE_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  TERMINATED: 'TERMINATED'
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists with this email',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden - insufficient permissions',
  VALIDATION_ERROR: 'Validation error',
  DATABASE_ERROR: 'Database error',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_TOKEN: 'Invalid or expired token',
  EMPLOYEE_NOT_FOUND: 'Employee not found',
  DEPARTMENT_NOT_FOUND: 'Department not found',
  LEAVE_NOT_FOUND: 'Leave request not found'
};

module.exports = {
  USER_ROLES,
  LEAVE_TYPES,
  LEAVE_STATUS,
  EMPLOYEE_STATUS,
  HTTP_STATUS,
  ERROR_MESSAGES
};
