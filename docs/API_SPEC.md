# SUPER MANAGER - Complete API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require JWT token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## 1. Authentication Endpoints

### Register New User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "EMPLOYEE",
      "isActive": true
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "EMPLOYEE",
      "isActive": true,
      "lastLogin": "2026-07-29T10:00:00Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "EMPLOYEE",
    "isActive": true
  }
}
```

---

## 2. Employee Endpoints

### List All Employees
**GET** `/employees?page=1&limit=10&departmentId=1&status=ACTIVE`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `departmentId` (number): Filter by department
- `status` (string): Filter by status (ACTIVE, INACTIVE, ON_LEAVE, TERMINATED)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "position": "Software Engineer",
      "departmentId": 1,
      "joinDate": "2024-01-15",
      "salary": 75000,
      "status": "ACTIVE",
      "Department": {
        "id": 1,
        "name": "Engineering"
      }
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Get Employee Details
**GET** `/employees/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "dateOfBirth": "1990-05-15",
    "gender": "MALE",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "position": "Software Engineer",
    "departmentId": 1,
    "joinDate": "2024-01-15",
    "salary": 75000,
    "status": "ACTIVE",
    "reportingManagerId": 5,
    "Department": { "id": 1, "name": "Engineering" },
    "User": { "id": 1, "email": "john@example.com", "role": "EMPLOYEE" }
  }
}
```

### Create Employee
**POST** `/employees`

**Access:** Admin only

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "0987654321",
  "dateOfBirth": "1992-03-20",
  "gender": "FEMALE",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "zipCode": "90001",
  "country": "USA",
  "departmentId": 2,
  "position": "Product Manager",
  "joinDate": "2026-08-01",
  "salary": 85000,
  "status": "ACTIVE",
  "reportingManagerId": 5
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": { ... }
}
```

### Update Employee
**PUT** `/employees/:id`

**Access:** Admin or Manager

**Request Body:** (All fields optional)
```json
{
  "firstName": "Jane",
  "position": "Senior Product Manager",
  "salary": 95000,
  "status": "ACTIVE"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": { ... }
}
```

### Delete Employee
**DELETE** `/employees/:id`

**Access:** Admin only

**Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

---

## 3. Department Endpoints

### List All Departments
**GET** `/departments?page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Engineering",
      "description": "Software development team",
      "managerId": 5,
      "parentDepartmentId": null,
      "budget": 500000,
      "isActive": true,
      "manager": {
        "id": 5,
        "firstName": "Alice",
        "lastName": "Johnson"
      }
    }
  ],
  "pagination": { ... }
}
```

### Get Department Details
**GET** `/departments/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Engineering",
    "description": "Software development team",
    "managerId": 5,
    "budget": 500000,
    "isActive": true,
    "manager": { ... },
    "parentDepartment": null,
    "childDepartments": [ ... ],
    "Employees": [ ... ]
  }
}
```

### Create Department
**POST** `/departments`

**Access:** Admin only

**Request Body:**
```json
{
  "name": "Data Science",
  "description": "ML and analytics team",
  "managerId": 6,
  "parentDepartmentId": null,
  "budget": 300000
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Department created successfully",
  "data": { ... }
}
```

### Update Department
**PUT** `/departments/:id`

**Access:** Admin or Manager

**Request Body:** (All fields optional)
```json
{
  "name": "Data Science & Analytics",
  "budget": 350000
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Department updated successfully",
  "data": { ... }
}
```

### Delete Department
**DELETE** `/departments/:id`

**Access:** Admin only

**Response (200):**
```json
{
  "success": true,
  "message": "Department deleted successfully"
}
```

---

## 4. Leave Endpoints

### List All Leave Requests
**GET** `/leaves?page=1&limit=10&employeeId=1&status=PENDING`

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `employeeId` (number): Filter by employee
- `status` (string): Filter by status (PENDING, APPROVED, REJECTED, CANCELLED)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employeeId": 1,
      "leaveTypeId": 1,
      "startDate": "2026-08-15",
      "endDate": "2026-08-20",
      "numberOfDays": 6,
      "reason": "Vacation",
      "status": "PENDING",
      "approvedBy": null,
      "approvalDate": null,
      "remarks": null,
      "Employee": { "id": 1, "firstName": "John", "lastName": "Doe" },
      "LeaveType": { "id": 1, "name": "Annual" }
    }
  ],
  "pagination": { ... }
}
```

### Get Leave Details
**GET** `/leaves/:id`

**Response (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

### Create Leave Request
**POST** `/leaves`

**Request Body:**
```json
{
  "leaveTypeId": 1,
  "startDate": "2026-08-15",
  "endDate": "2026-08-20",
  "reason": "Vacation trip"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Leave request created successfully",
  "data": { ... }
}
```

### Approve Leave Request
**PUT** `/leaves/:id/approve`

**Access:** Manager or Admin

**Request Body:**
```json
{
  "remarks": "Approved"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Leave request approved",
  "data": { ... }
}
```

### Reject Leave Request
**PUT** `/leaves/:id/reject`

**Access:** Manager or Admin

**Request Body:**
```json
{
  "remarks": "Rejected due to project deadline"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Leave request rejected",
  "data": { ... }
}
```

---

## 5. Dashboard Endpoints

### Get Dashboard Statistics
**GET** `/dashboard/stats`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalEmployees": 150,
      "totalDepartments": 8,
      "leaveThisMonth": 25
    },
    "employeesByStatus": [
      { "status": "ACTIVE", "count": 140 },
      { "status": "ON_LEAVE", "count": 10 }
    ],
    "leaves": {
      "approved": 15,
      "pending": 8,
      "total": 25
    },
    "departmentStats": [
      {
        "id": 1,
        "name": "Engineering",
        "employeeCount": 45
      },
      {
        "id": 2,
        "name": "Sales",
        "employeeCount": 35
      }
    ]
  }
}
```

---

## Error Responses

### Validation Error (422)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": ["Please provide a valid email address"],
    "password": ["Password must be at least 6 characters"]
  }
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Forbidden - insufficient permissions"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Employee not found"
}
```

### Conflict (409)
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

### Internal Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 500 | Internal Server Error |

---

## User Roles & Permissions

| Action | Admin | Manager | Employee |
|--------|-------|---------|----------|
| List Employees | ✅ | ✅ | ✅ |
| Create Employee | ✅ | ❌ | ❌ |
| Update Employee | ✅ | ✅ | ❌ |
| Delete Employee | ✅ | ❌ | ❌ |
| List Departments | ✅ | ✅ | ✅ |
| Create Department | ✅ | ❌ | ❌ |
| Update Department | ✅ | ✅ | ❌ |
| Delete Department | ✅ | ❌ | ❌ |
| List Leaves | ✅ | ✅ | ✅ |
| Create Leave | ✅ | ✅ | ✅ |
| Approve Leave | ✅ | ✅ | ❌ |
| Reject Leave | ✅ | ✅ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ |

