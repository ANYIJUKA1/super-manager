# SUPER MANAGER - Backend Server

Complete Node.js + Express + PostgreSQL backend API for company management system.

## 📋 Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Secure password hashing with bcryptjs

✅ **Employee Management**
- CRUD operations for employees
- Department assignments
- Reporting hierarchy
- Employee status tracking

✅ **Department Management**
- Create and manage departments
- Hierarchical department structure
- Department budgeting
- Manager assignment

✅ **Leave Management**
- Multiple leave types support
- Leave request workflow
- Approval/rejection system
- Leave balance tracking

✅ **Dashboard & Analytics**
- Real-time statistics
- Employee and leave statistics
- Department analytics

✅ **Database**
- PostgreSQL with Sequelize ORM
- Automated migrations
- Database seeding
- Optimized indexes

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## 📚 API Documentation

See [docs/API_SPEC.md](docs/API_SPEC.md) for complete API reference.

### Key Endpoints

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user

GET    /api/employees              - List employees
POST   /api/employees              - Create employee (Admin)
GET    /api/employees/:id          - Get employee details
PUT    /api/employees/:id          - Update employee
DELETE /api/employees/:id          - Delete employee (Admin)

GET    /api/departments            - List departments
POST   /api/departments            - Create department (Admin)
GET    /api/departments/:id        - Get department details
PUT    /api/departments/:id        - Update department
DELETE /api/departments/:id        - Delete department (Admin)

GET    /api/leaves                 - List leave requests
POST   /api/leaves                 - Create leave request
GET    /api/leaves/:id             - Get leave details
PUT    /api/leaves/:id/approve     - Approve leave (Manager/Admin)
PUT    /api/leaves/:id/reject      - Reject leave (Manager/Admin)

GET    /api/dashboard/stats        - Get dashboard statistics
```

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── constants.js  # App constants
│   │   └── database.js   # Database setup
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── app.js           # Express app setup
├── migrations/          # Database migrations
├── seeders/             # Database seeders
├── docs/                # Documentation
├── .env.example         # Environment template
├── package.json         # Dependencies
└── server.js            # Entry point
```

## 🗄️ Database Schema

See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for detailed schema documentation.

**Main Tables:**
- `users` - Authentication and user accounts
- `employees` - Employee details
- `departments` - Organizational departments
- `leaves` - Leave requests
- `leave_types` - Types of leave available

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <access_token>
```

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **ADMIN** | Full system access, manage users, departments, leaves |
| **MANAGER** | Manage team, approve/reject leaves, view reports |
| **EMPLOYEE** | View profile, request leaves, view own information |

## 🛠️ Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🧪 Testing

Test files are located in `tests/` directory.

```bash
# Run all tests
npm test

# Run specific test file
npm test -- authController.test.js
```

## 📦 Dependencies

- **express** - Web framework
- **sequelize** - ORM for databases
- **pg** - PostgreSQL client
- **jsonwebtoken** - JWT implementation
- **bcryptjs** - Password hashing
- **joi** - Data validation
- **cors** - CORS middleware
- **helmet** - Security headers
- **morgan** - HTTP request logging
- **dotenv** - Environment variables
- **moment** - Date manipulation

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (min 32 chars)
- [ ] Configure database backups
- [ ] Setup SSL/TLS certificates
- [ ] Enable rate limiting
- [ ] Setup monitoring and alerting
- [ ] Configure logging aggregation
- [ ] Setup automated backups
- [ ] Test all endpoints
- [ ] Setup health checks

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
DB_HOST=prod-db-host
DB_USER=prod-user
DB_PASSWORD=secure_password
JWT_SECRET=secure_random_string_min_32_chars
CORS_ORIGIN=https://yourdomain.com
```

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

ANYIJUKA1 - [GitHub](https://github.com/ANYIJUKA1)

## 🤝 Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.

## 📞 Support

For issues and questions:
1. Check [GitHub Issues](https://github.com/ANYIJUKA1/super-manager/issues)
2. Review documentation
3. Create new issue with details

---

**Last Updated:** July 29, 2026
**Status:** ✅ Production Ready
