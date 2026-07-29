# Database Schema

## Overview
The SUPER MANAGER system uses PostgreSQL with Sequelize ORM. All tables include `createdAt` and `updatedAt` timestamps.

## Tables

### users
Stores authentication and user account information.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'MANAGER', 'EMPLOYEE') DEFAULT 'EMPLOYEE',
  isActive BOOLEAN DEFAULT true,
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### employees
Stores detailed employee information.

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  dateOfBirth DATE,
  gender ENUM('MALE', 'FEMALE', 'OTHER'),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(20),
  country VARCHAR(100),
  departmentId INTEGER REFERENCES departments(id),
  position VARCHAR(100) NOT NULL,
  joinDate DATE NOT NULL,
  salary DECIMAL(12,2),
  status ENUM('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED') DEFAULT 'ACTIVE',
  reportingManagerId INTEGER REFERENCES employees(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employees_department ON employees(departmentId);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_user ON employees(userId);
```

### departments
Stores department/team information with support for hierarchical structure.

```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  managerId INTEGER REFERENCES employees(id),
  parentDepartmentId INTEGER REFERENCES departments(id),
  budget DECIMAL(15,2),
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_parent ON departments(parentDepartmentId);
CREATE INDEX idx_departments_manager ON departments(managerId);
```

### leave_types
Stores different types of leave available in the system.

```sql
CREATE TABLE leave_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  daysPerYear INTEGER DEFAULT 0,
  isPaid BOOLEAN DEFAULT true,
  requiresApproval BOOLEAN DEFAULT true,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### leaves
Stores leave requests with approval workflow.

```sql
CREATE TABLE leaves (
  id SERIAL PRIMARY KEY,
  employeeId INTEGER NOT NULL REFERENCES employees(id),
  leaveTypeId INTEGER NOT NULL REFERENCES leave_types(id),
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numberOfDays INTEGER NOT NULL,
  reason TEXT,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
  approvedBy INTEGER REFERENCES employees(id),
  approvalDate TIMESTAMP,
  remarks TEXT,
  attachmentUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leaves_employee ON leaves(employeeId);
CREATE INDEX idx_leaves_status ON leaves(status);
CREATE INDEX idx_leaves_start_date ON leaves(startDate);
CREATE INDEX idx_leaves_end_date ON leaves(endDate);
```

## Relationships

### One-to-One
- `User` has one `Employee`
- `Employee` belongs to `User`

### One-to-Many
- `Department` has many `Employees`
- `Employee` belongs to `Department`
- `LeaveType` has many `Leaves`
- `Leave` belongs to `LeaveType`
- `Employee` has many `Leaves` (as employee)
- `Employee` has many `Leaves` (as approver)
- `Employee` has many subordinates (reporting to them)
- `Department` has many child departments

### Many-to-One
- `Employee` belongs to reporting manager `Employee`
- `Department` belongs to manager `Employee`
- `Department` belongs to parent `Department`
- `Leave` belongs to approver `Employee`

## Data Types

| Type | Description |
|------|-------------|
| SERIAL | Auto-incrementing integer |
| VARCHAR(n) | Variable character string (max n) |
| TEXT | Large text content |
| DATE | Date (YYYY-MM-DD) |
| TIMESTAMP | Date and time with timezone |
| DECIMAL(n,m) | Fixed precision decimal |
| BOOLEAN | True/False |
| ENUM | Enumerated type |

## Enums

### User Roles
```
ADMIN - Full system access
MANAGER - Department and leave management
EMPLOYEE - Personal profile and leave requests
```

### Employee Status
```
ACTIVE - Currently working
INACTIVE - Not working (resignation pending)
ON_LEAVE - Currently on approved leave
TERMINATED - Employment ended
```

### Leave Status
```
PENDING - Awaiting approval
APPROVED - Approved by manager
REJECTED - Rejected by manager
CANCELLED - Cancelled by employee
```

## Indexing Strategy

Key indexes for performance optimization:
- Foreign keys (automatic)
- Status columns (frequent filters)
- Date range queries
- Employee lookups

