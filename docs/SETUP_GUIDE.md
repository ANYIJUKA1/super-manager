# SUPER MANAGER - Setup Guide

## Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/))
- **npm** or **yarn** package manager
- **Git** for version control

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/ANYIJUKA1/super-manager.git
cd super-manager/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL Database

#### Option A: Using PostgreSQL CLI

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE super_manager_db;

# Create user (optional but recommended)
CREATE USER super_manager WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE super_manager_db TO super_manager;

# Exit
\q
```

#### Option B: Using pgAdmin

1. Open pgAdmin
2. Right-click on "Databases" → "Create" → "Database"
3. Name: `super_manager_db`
4. Click "Save"

### 4. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env
```

**Edit `.env` file:**

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=super_manager_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_change_this
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# API
API_VERSION=v1
API_PREFIX=/api

# Logging
LOG_LEVEL=debug
```

### 5. Initialize Database

#### Option A: Auto Sync (Development Only)

The application automatically syncs models with the database on startup in development mode.

#### Option B: Using Migrations

```bash
# Run migrations
npm run migrate

# Undo migrations
npm run migrate:undo
```

### 6. Seed Initial Data (Optional)

```bash
npm run seed
```

This creates:
- Admin user (admin@example.com / password123)
- Sample departments (Engineering, Sales, HR, Marketing)
- Sample employees
- Sample leave types (Annual, Sick, Maternity, etc.)

### 7. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### 8. Verify Installation

```bash
# Check health
curl http://localhost:5000/health

# Should return:
# {"success":true,"message":"Server is healthy","timestamp":"..."}
```

---

## Available Scripts

```bash
# Development
npm run dev          # Start with auto-reload (nodemon)
npm start            # Start production server

# Database
npm run migrate      # Run pending migrations
npm run migrate:undo # Rollback all migrations
npm run seed         # Seed initial data
npm run seed:undo    # Undo all seeds

# Testing
npm test             # Run tests
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

---

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get employees (requires token)
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the included collection (if available)
3. Set base URL to `http://localhost:5000`
4. Test endpoints with provided examples

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create requests in VS Code
3. Test API endpoints directly

---

## Troubleshooting

### Database Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
1. Ensure PostgreSQL is running
2. Check DB credentials in `.env`
3. Verify database exists

```bash
# macOS (Homebrew)
brew services start postgresql

# Windows (Services)
net start postgresql-x64-15

# Linux
sudo service postgresql start
```

### Port Already in Use

**Error:** `listen EADDRINUSE :::5000`

**Solution:** Change `PORT` in `.env` or kill the process:

```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### JWT Secret Issues

**Error:** `JsonWebTokenError: secretOrPublicKey must be provided`

**Solution:** Set JWT_SECRET in `.env`

```env
JWT_SECRET=your_super_secret_key_here_min_32_chars
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:** Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Environment Configuration

### Development
```env
NODE_ENV=development
DEBUG=true
```

### Production
```env
NODE_ENV=production
JWT_SECRET=secure_random_string_here
DB_HOST=prod-db-host
DB_PASSWORD=secure_password
```

---

## Next Steps

1. ✅ **Setup complete!** Start developing
2. 📖 **Read** [API_SPEC.md](API_SPEC.md) for endpoint documentation
3. 🗂️ **Review** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for data model
4. 🧪 **Run tests** with `npm test`
5. 🚀 **Deploy** following production checklist below

---

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (min 32 chars)
- [ ] Enable HTTPS/SSL
- [ ] Setup PostgreSQL backups
- [ ] Configure logging and monitoring
- [ ] Setup CI/CD pipeline
- [ ] Configure rate limiting
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Test all endpoints thoroughly
- [ ] Setup health monitoring

---

## Support & Contributing

For issues or questions:
1. Check [GitHub Issues](https://github.com/ANYIJUKA1/super-manager/issues)
2. Review existing documentation
3. Create new issue with details

Contributions welcome! See CONTRIBUTING.md for guidelines.

