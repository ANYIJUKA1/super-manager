# 🚀 SUPER MANAGER - Company Management System

A modern, scalable company management system built with **Node.js + Express.js**, benchmarked against HiBob's features and functionality.

## 📋 Core Features (MVP)

- ✅ **Employee Management** - Create, read, update employee profiles with rich data
- ✅ **Department/Organization Structure** - Departments, teams, and reporting hierarchy
- ✅ **User Authentication** - JWT-based authentication with role-based access control (RBAC)
- ✅ **Leave/PTO Management** - Leave request system with approval workflow
- ✅ **Dashboard** - Overview, analytics, and key metrics

## 🎯 HiBob Benchmarking

| Feature | HiBob | SUPER MANAGER |
|---------|-------|---------------|
| Employee Profiles | ✅ | ✅ |
| Organization Structure | ✅ | ✅ |
| Leave Management | ✅ | ✅ |
| User Authentication | ✅ | ✅ |
| Role-Based Access | ✅ | ✅ |
| Dashboard/Analytics | ✅ | ✅ |
| API-First Design | ✅ | ✅ |

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Sequelize
- **Validation**: Joi
- **API Format**: RESTful JSON API

## 📁 Project Structure

```
super-manager/
├── server/
│   ├── src/
│   │   ├── models/              # Database models
│   │   │   ├── User.js
│   │   │   ├── Employee.js
│   │   │   ├── Department.js
│   │   │   └── Leave.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   ├── employees.js
│   │   │   ├── departments.js
│   │   │   ├── leaves.js
│   │   │   └── dashboard.js
│   │   ├── controllers/         # Business logic
│   │   │   ├── authController.js
│   │   │   ├── employeeController.js
│   │   │   ├── departmentController.js
│   │   │   ├── leaveController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── config/              # Configuration
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── tokenUtils.js
│   │   │   └── validators.js
│   │   └── app.js               # Express app setup
│   ├── migrations/              # Database migrations
│   ├── seeders/                 # Database seeders
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                # Entry point
│   └── sequelize.config.js      # Sequelize config
├── docs/
│   ├── API_SPEC.md              # Complete API documentation
│   ├── DATABASE_SCHEMA.md       # Database design
│   └── SETUP_GUIDE.md           # Setup instructions
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ANYIJUKA1/super-manager.git
cd super-manager/server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure your .env file with database credentials

# Run database migrations
npm run migrate

# Seed initial data (optional)
npm run seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

See [API_SPEC.md](docs/API_SPEC.md) for complete API documentation with all endpoints.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

**Employees**
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

**Departments**
- `GET /api/departments` - List all departments
- `GET /api/departments/:id` - Get department details
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department

**Leave Management**
- `GET /api/leaves` - List leave requests
- `POST /api/leaves` - Submit leave request
- `PUT /api/leaves/:id/approve` - Approve leave
- `PUT /api/leaves/:id/reject` - Reject leave

**Dashboard**
- `GET /api/dashboard/stats` - Get key metrics

## 🔐 Authentication & Authorization

Uses JWT-based authentication with three roles:

- **ADMIN** - Full system access, manage all employees and departments
- **MANAGER** - Manage employees in their department, approve leaves
- **EMPLOYEE** - Access own profile and submit leave requests

Token expires in 24 hours. Use refresh token to get new access token.

## 📊 Database Schema

See [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for complete schema design.

### Core Tables
- `users` - Authentication and user accounts
- `employees` - Employee profiles and information
- `departments` - Company departments
- `leaves` - Leave requests and tracking
- `leave_types` - Different types of leave (Annual, Sick, etc.)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Environment Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=super_manager
DB_USER=postgres
DB_PASSWORD=yourpassword

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🎨 Features Compared to HiBob

| Feature | Description |
|---------|-------------|
| Employee Directory | Searchable, filterable employee profiles |
| Org Structure | Visual department hierarchy |
| Leave Requests | Multi-step approval workflow |
| Access Control | Role-based permissions |
| APIs | REST API for integration |
| Data Export | Export employee and leave data |

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Error details"]
  }
}
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Status**: MVP Phase - Core features in development  
**Last Updated**: July 2026  
**Version**: 0.1.0
