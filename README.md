# Store Ratings Application - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation Guide](#installation-guide)
7. [Environment Configuration](#environment-configuration)
8. [Database Setup](#database-setup)
9. [Database Schema](#database-schema)
10. [Form Validations](#form-validations)
11. [API Endpoints](#api-endpoints)
12. [Authentication & Authorization](#authentication--authorization)
13. [User Roles & Permissions](#user-roles--permissions)
14. [Frontend Components](#frontend-components)
15. [Running the Application](#running-the-application)
16. [Features in Detail](#features-in-detail)
17. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Store Ratings** is a comprehensive full-stack web application that allows users to rate and review stores. The application features a role-based access control system with three distinct user types: Administrators, Regular Users, and Store Owners. Built with modern web technologies, the application provides a seamless experience for managing stores, users, and ratings.

### Application Purpose
- **Administrators**: Can manage users and stores, view dashboard statistics, and oversee the entire system
- **Store Owners**: Can view who rated their stores and see average ratings
- **Regular Users**: Can browse stores and submit/update ratings for them

---

## Key Features

### User Management
- **User Registration**: Self-signup for regular users with strict validation
- **User Creation**: Admin can create users of different roles (USER, ADMIN, STORE_OWNER)
- **Authentication**: Secure JWT-based authentication system
- **Password Management**: Bcrypt-encrypted passwords with update functionality
- **Role-Based Access**: Three distinct user roles with different permissions

### Store Management
- **Store Creation**: Admin can create and manage stores
- **Store Filtering**: Advanced filtering and sorting by name, email, and address
- **Store Listing**: Users can view all available stores with search capabilities
- **Store Owner Assignment**: Each store is assigned to a store owner

### Rating System
- **Submit Ratings**: Users can rate stores on a scale of 1-5
- **Update Ratings**: Users can modify their ratings anytime
- **Unique Ratings**: Each user can have only one rating per store
- **Average Calculation**: Automatic calculation of store ratings
- **Rating Tracking**: Users can see their own ratings and overall store ratings

### Dashboard Features
- **Admin Dashboard**: Views total users, stores, and ratings with create functionality
- **Owner Dashboard**: Displays ratings received from users with average ratings
- **User Dashboard**: Displays available stores with search and filter options

### Data Validation
- Comprehensive form validation on both frontend and backend
- Input sanitization and strict validation rules
- Real-time validation feedback in forms

---

## Tech Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Web Framework**: Express.js (v4.18.2)
- **ORM**: Sequelize (v6.32.1)
- **Database**: MySQL 2 (v3.2.0)
- **Authentication**: JWT (jsonwebtoken v9.0.0)
- **Password Hashing**: Bcrypt (v5.1.0)
- **Input Validation**: Express-Validator (v6.15.0)
- **CORS**: Enabled for cross-origin requests
- **Environment Variables**: Dotenv (v16.0.0)
- **Development Tool**: Nodemon (v3.1.11)

### Frontend
- **Library**: React (v18.2.0)
- **Build Tool**: Vite (v5.1.0)
- **Routing**: React Router DOM (v6.14.1)
- **Styling**: Tailwind CSS (v4.1.18)
- **CSS Processing**: PostCSS (v8.5.6), Autoprefixer (v10.4.24)
- **Vite Plugin**: @vitejs/plugin-react (v4.2.1)

### Database
- **Engine**: MySQL
- **Schema**: Defined in `sql/schema.sql`
- **Version**: MySQL 5.7+ or 8.0+

---

## Project Structure

```
roxilerAssignment/
│
├── backend/                          # Node.js + Express backend
│   ├── config/
│   │   └── database.js               # Database connection configuration
│   ├── controllers/
│   │   ├── adminController.js        # Admin operations (create users/stores, list, filter)
│   │   ├── authController.js         # Authentication (signup, login, update password)
│   │   ├── ownerController.js        # Store owner dashboard functionality
│   │   ├── ratingController.js       # Rating submission and updates
│   │   └── storeController.js        # Store listing and retrieval
│   ├── middlewares/
│   │   ├── auth.js                   # JWT authentication middleware
│   │   ├── errorHandler.js           # Global error handling middleware
│   │   └── roles.js                  # Role-based access control middleware
│   ├── models/
│   │   ├── index.js                  # Sequelize initialization and model exports
│   │   ├── user.js                   # User model definition
│   │   ├── store.js                  # Store model definition
│   │   └── rating.js                 # Rating model definition
│   ├── routes/
│   │   ├── auth.js                   # Authentication endpoints
│   │   ├── admin.js                  # Admin endpoints
│   │   ├── stores.js                 # Store and rating endpoints
│   │   └── owner.js                  # Owner dashboard endpoints
│   ├── scripts/
│   │   └── create-db.js              # Database creation script
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies and scripts
│   └── .env                          # Environment variables (not in repo)
│
├── frontend/                         # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx             # Login form component
│   │   │   ├── Signup.jsx            # User signup form
│   │   │   └── UpdatePassword.jsx    # Password update component
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx    # Admin dashboard page
│   │   │   ├── OwnerDashboard.jsx    # Owner dashboard page
│   │   │   └── UserStores.jsx        # User stores listing and rating page
│   │   ├── api.js                    # API client for backend communication
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── public/
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.cjs           # Tailwind CSS configuration
│   ├── postcss.config.cjs            # PostCSS configuration
│   ├── package.json                  # Frontend dependencies and scripts
│   └── index.html                    # HTML entry point
│
├── sql/
│   └── schema.sql                    # MySQL database schema and tables
│
├── README.md                         # This file
└── quickstart.md                     # Quick start guide

```

### Key Files Explained

**Backend Files:**
- `server.js`: Main entry point, initializes Express, sets up routes, syncs Sequelize models
- `config/database.js`: Sequelize configuration with MySQL connection details
- `models/index.js`: Initializes and exports all Sequelize models (User, Store, Rating)
- `controllers/`: Contains business logic for each feature (auth, admin, stores, ratings)
- `middlewares/`: Contains JWT verification, role checking, and error handling
- `routes/`: Defines API endpoints and routes them to controllers

**Frontend Files:**
- `App.jsx`: Main component with routing, navigation, and protected route logic
- `api.js`: Centralized API client for making backend requests
- `pages/`: Full-page components for different user views
- `components/`: Reusable form components (Login, Signup, UpdatePassword)

---

## Prerequisites

### System Requirements
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **MySQL Server**: Version 5.7 or 8.0+
- **RAM**: Minimum 2GB
- **Disk Space**: Minimum 500MB

### Verify Installation
```bash
# Check Node.js version
node --version          # Should be v16.0.0 or higher

# Check npm version
npm --version           # Should be 7.0.0 or higher

# Check MySQL version
mysql --version         # Should be 5.7 or 8.0+
```

---

## Installation Guide

### Step 1: Clone or Download Project
```bash
# Navigate to project directory
cd roxilerAssignment
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

This installs the following packages:
- Express.js - Web framework
- Sequelize - ORM
- MySQL2 - Database driver
- JWT - Token-based authentication
- Bcrypt - Password hashing
- Express-Validator - Input validation
- Nodemon - Development server with auto-reload
- CORS - Handle cross-origin requests

#### 2.2 Configure Environment Variables
Create a `.env` file in the `backend` directory:
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=store_ratings

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Server Configuration
PORT=4000
NODE_ENV=development
```

**Important**: Replace `your_super_secret_jwt_key_here_change_this` with a strong, random string in production.

#### 2.3 Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Expected output:
```
DB synced
Server running on port 4000
```

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd frontend
npm install
```

This installs the following packages:
- React - UI library
- React Router - Client-side routing
- Vite - Build tool
- Tailwind CSS - Utility-first CSS framework
- Autoprefixer - CSS vendor prefixing

#### 3.2 Configure Environment Variables
Create a `.env` file in the `frontend` directory (optional):
```bash
# API Configuration
VITE_API_URL=http://localhost:4000/api
```

#### 3.3 Start Frontend Development Server
```bash
npm run dev
```

Expected output will show:
```
  VITE v5.1.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Step 4: Database Setup

#### 4.1 Create Database and Tables
```bash
# Option A: Automatic (if backend is configured)
# The backend will automatically create tables via Sequelize sync

# Option B: Manual MySQL
mysql -u root -p < sql/schema.sql
```

#### 4.2 Create Initial Admin User (if needed)
You can either:
1. Insert directly in MySQL:
```sql
-- First, generate a bcrypt hash of your password
-- For example, bcrypt("Admin@123") = $2b$10$...
INSERT INTO users (name, email, address, password_hash, role) 
VALUES ('System Administrator', 'admin@example.com', 'Admin Office', '$2b$10$...', 'ADMIN');
```

2. Or use the signup endpoint (creates USER role by default)

---

## Environment Configuration

### Backend `.env` Details

```bash
# MySQL Database Connection
DB_HOST=localhost              # Database host (default: localhost)
DB_PORT=3306                   # Database port (default: 3306)
DB_USER=root                   # Database user
DB_PASS=                        # Database password (empty if no password)
DB_NAME=store_ratings          # Database name

# JWT (JSON Web Token)
JWT_SECRET=super_secret_key    # Secret key for signing tokens
                               # MUST be changed in production

# Server
PORT=4000                      # Backend server port
NODE_ENV=development           # Environment (development/production)
```

### Frontend `.env` Details

```bash
# API Configuration
VITE_API_URL=http://localhost:4000/api    # Backend API base URL
```

---

## Database Setup

### Database Creation

#### Automatic Creation
The backend automatically creates tables when the server starts via `sequelize.sync()`:
```bash
# Tables are created automatically on server startup
npm run dev
```

#### Manual Creation
```bash
# Run the SQL schema manually
mysql -u root -p store_ratings < sql/schema.sql
```

### Database Initialization Script
```bash
# Optional: Run the create-db script
cd backend
npm run create-db
```

---

## Database Schema

### Users Table
Stores user account information and role information.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,                    -- User's full name (20-60 chars)
  email VARCHAR(255) NOT NULL UNIQUE,           -- User's email (must be unique)
  address VARCHAR(400),                         -- User's address (max 400 chars)
  password_hash VARCHAR(255) NOT NULL,          -- Bcrypt hashed password
  role ENUM('ADMIN','USER','STORE_OWNER') 
       NOT NULL DEFAULT 'USER',                 -- User's role
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Account creation time
);
```

**Indexes**: 
- Primary Key: `id`
- Unique: `email`

**Roles Explained**:
- `ADMIN`: Full system access, can manage users and stores
- `USER`: Can browse stores and submit ratings
- `STORE_OWNER`: Can view ratings on their stores

### Stores Table
Stores information about physical stores.

```sql
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,                   -- Store name (20-60 chars)
  email VARCHAR(255),                           -- Store email contact
  address VARCHAR(400),                         -- Store address (max 400 chars)
  owner_id INT,                                 -- Reference to store owner user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);
```

**Relationships**:
- `owner_id` → `users.id` (one store owner can have multiple stores)

### Ratings Table
Stores user ratings for stores (review system).

```sql
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,                         -- Reference to rating user
  store_id INT NOT NULL,                        -- Reference to rated store
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),  -- Rating 1-5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
             ON UPDATE CURRENT_TIMESTAMP,       -- Last update time
  UNIQUE KEY uniq_user_store (user_id, store_id),  -- One rating per user per store
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);
```

**Constraints**:
- Rating must be between 1 and 5
- Each user can have only one rating per store (UNIQUE constraint)
- Cascading delete: if user or store is deleted, ratings are deleted

**Relationships**:
- `user_id` → `users.id` (many ratings per user)
- `store_id` → `stores.id` (many ratings per store)

---

## Form Validations

All form inputs are validated both on the frontend (user feedback) and backend (data integrity).

### User Sign-Up & Create User Form

| Field | Rules | Error Message |
|-------|-------|---------------|
| **Name** | Min 20 chars, Max 60 chars | Name must be 20-60 characters |
| **Email** | RFC 5322 compliant email format | Must be a valid email address |
| **Address** | Max 400 characters | Address must not exceed 400 characters |
| **Password** | 8-16 chars, minimum 1 uppercase, minimum 1 special character | Password must be 8-16 characters with at least one uppercase letter and one special character (!@#$%^&*) |

**Special Characters Allowed**: `! @ # $ % ^ & *`

**Examples**:
- ✅ Valid: `MyPassword@123` (uppercase M, special char @)
- ❌ Invalid: `mypassword123` (no uppercase, no special char)
- ❌ Invalid: `MyPass!` (only 7 characters)
- ❌ Invalid: `MyPassword@1234567` (19 characters)

### Store Creation Form

| Field | Rules | Error Message |
|-------|-------|---------------|
| **Name** | Min 20 chars, Max 60 chars | Name must be 20-60 characters |
| **Email** | Valid email format (optional) | Must be a valid email address if provided |
| **Address** | Max 400 characters (optional) | Address must not exceed 400 characters |
| **Owner** | Must select a store owner (required) | Please select a store owner |

### Rating Submission

| Field | Rules | Error Message |
|-------|-------|---------------|
| **Rating** | Must be 1-5 integer | Rating must be a number between 1 and 5 |

---

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### 1. Sign Up (Register New User)
```
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main Street, City, State 12345",
  "password": "SecurePass@123"
}

Response (201 Created):
{
  "message": "User created",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

**Validations**:
- Name: 20-60 characters
- Email: Valid format, must be unique
- Address: Max 400 characters
- Password: 8-16 characters with uppercase and special char

#### 2. Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Returns**:
- `token`: JWT token for authenticated requests
- `role`: User's role (ADMIN, USER, STORE_OWNER)
- `id`: User ID
- `name`: User's name
- `email`: User's email

#### 3. Update Password
```
POST /auth/update-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "SecurePass@123",
  "newPassword": "NewSecurePass@456"
}

Response (200 OK):
{
  "message": "Password updated"
}
```

**Required**: Authentication token

---

### Admin Endpoints

**All admin endpoints require**:
- Valid JWT token in `Authorization: Bearer <token>` header
- User role must be `ADMIN`

#### 1. Dashboard
```
GET /admin/dashboard
Authorization: Bearer <token>

Response (200 OK):
{
  "totalUsers": 15,
  "totalStores": 8,
  "totalRatings": 42
}
```

#### 2. Create User
```
POST /admin/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "address": "456 Oak Street, City, State 67890",
  "password": "AdminPass@789",
  "role": "USER"
}

Response (201 Created):
{
  "message": "User created",
  "user": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "USER"
  }
}
```

**Roles available**: `USER`, `ADMIN`, `STORE_OWNER`

#### 3. List Users
```
GET /admin/users?name=John&email=john&address=Main&role=USER&sortBy=name&order=ASC
Authorization: Bearer <token>

Response (200 OK):
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main Street...",
    "role": "USER"
  },
  ...
]
```

**Query Parameters**:
- `name`: Filter by name (partial match)
- `email`: Filter by email (partial match)
- `address`: Filter by address (partial match)
- `role`: Filter by role (ADMIN, USER, STORE_OWNER)
- `sortBy`: Sort field (name, email, address, role)
- `order`: Sort order (ASC, DESC)

#### 4. Get User Details
```
GET /admin/users/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main Street...",
  "role": "USER",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

#### 5. Create Store
```
POST /admin/stores
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Downtown Electronics Store",
  "email": "store@electronics.com",
  "address": "789 Commerce Ave, City, State 11111",
  "owner_id": 3
}

Response (201 Created):
{
  "message": "Store created",
  "store": {
    "id": 1,
    "name": "Downtown Electronics Store",
    "email": "store@electronics.com",
    "owner_id": 3
  }
}
```

#### 6. List Stores
```
GET /admin/stores?name=Electronics&email=store&address=Commerce&sortBy=name&order=ASC
Authorization: Bearer <token>

Response (200 OK):
[
  {
    "id": 1,
    "name": "Downtown Electronics Store",
    "email": "store@electronics.com",
    "address": "789 Commerce Ave...",
    "owner_id": 3,
    "overallRating": 4.5
  },
  ...
]
```

**Query Parameters**: Same as user listing (name, email, address, sortBy, order)

#### 7. List Store Owners
```
GET /admin/store-owners
Authorization: Bearer <token>

Response (200 OK):
[
  {
    "id": 3,
    "name": "Store Owner Name",
    "email": "owner@example.com",
    "role": "STORE_OWNER"
  },
  ...
]
```

---

### Store & Rating Endpoints

#### 1. List All Stores
```
GET /stores?name=Electronics&address=Main
Authorization: Optional (not required)

Response (200 OK):
[
  {
    "id": 1,
    "name": "Downtown Electronics Store",
    "email": "store@electronics.com",
    "address": "789 Commerce Ave...",
    "owner_id": 3,
    "overallRating": 4.5,
    "userRating": 4     (only if authenticated user has rated this store)
  },
  ...
]
```

**Query Parameters**:
- `name`: Filter by store name
- `address`: Filter by address

#### 2. Submit Rating (User Only)
```
POST /stores/:id/rating
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5
}

Response (201 Created):
{
  "message": "Rating submitted",
  "rating": {
    "id": 1,
    "user_id": 1,
    "store_id": 1,
    "rating": 5
  }
}
```

**Requirements**:
- Must be authenticated (Bearer token required)
- User role must be `USER`
- Rating must be 1-5
- First rating per store (unique constraint)

#### 3. Update Rating (User Only)
```
PUT /stores/:id/rating
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4
}

Response (200 OK):
{
  "message": "Rating updated",
  "rating": {
    "id": 1,
    "user_id": 1,
    "store_id": 1,
    "rating": 4
  }
}
```

**Requirements**: Same as submit rating

---

### Store Owner Endpoints

#### Dashboard
```
GET /owner/dashboard
Authorization: Bearer <token>

Response (200 OK):
{
  "stores": [
    {
      "id": 1,
      "name": "Downtown Electronics Store",
      "totalRatings": 15,
      "averageRating": 4.5,
      "raters": [
        {
          "id": 1,
          "name": "John Doe",
          "rating": 5
        },
        ...
      ]
    },
    ...
  ]
}
```

**Requirements**:
- Must be authenticated
- User role must be `STORE_OWNER`

---

## Authentication & Authorization

### JWT (JSON Web Token) System

#### Token Structure
```
Header.Payload.Signature

Payload contains:
{
  "id": 1,                    // User ID
  "role": "USER",             // User role
  "iat": 1705334400,          // Issued at time
  "exp": 1705420800           // Expiration time (24 hours later)
}
```

#### Token Usage
Include in all authenticated requests:
```
Authorization: Bearer <your_jwt_token_here>
```

#### Token Generation
- Generated on successful login
- Expires in 24 hours (configurable)
- Signed with JWT_SECRET from environment variables

### Password Security
- Passwords are hashed using **Bcrypt** with 10 salt rounds
- Passwords are never stored in plain text
- Password updates are hashed before storage

### Middleware Chain
```
Request → Auth Middleware (verify JWT) → Role Middleware (check permissions) → Controller → Response
```

---

## User Roles & Permissions

### Three User Roles

#### 1. ADMIN
**Permissions**:
- ✅ Create users (any role)
- ✅ List all users with filters
- ✅ View user details
- ✅ Create stores
- ✅ List stores with filters
- ✅ View dashboard (user/store/rating counts)
- ✅ View store owners list
- ✅ Update own password
- ❌ Cannot submit ratings
- ❌ Cannot view owner dashboard

#### 2. USER (Regular User)
**Permissions**:
- ✅ List stores
- ✅ Filter stores by name/address
- ✅ Submit ratings (1-5) to stores
- ✅ Update own ratings
- ✅ Update own password
- ✅ View stores with overall and personal ratings
- ❌ Cannot create users
- ❌ Cannot create stores
- ❌ Cannot view admin dashboard
- ❌ Cannot access owner dashboard

#### 3. STORE_OWNER
**Permissions**:
- ✅ View owner dashboard
- ✅ See who rated their stores
- ✅ View average rating for their stores
- ✅ Update own password
- ✅ View store information
- ❌ Cannot create stores
- ❌ Cannot manage users
- ❌ Cannot submit ratings (not a USER role)
- ❌ Cannot access admin dashboard

---

## Frontend Components

### Component Hierarchy
```
App (Main component with routing)
├── Header (Navigation & User Menu)
├── Routes
│   ├── /login → Login component
│   ├── /signup → Signup component
│   ├── / → UserStores page (for USER role)
│   ├── /admin → AdminDashboard page (for ADMIN role)
│   ├── /owner → OwnerDashboard page (for STORE_OWNER role)
│   └── /update-password → UpdatePassword component
└── Protected (Route protection wrapper)
```

### Component Details

#### Login Component (`Login.jsx`)
- Email and password login form
- Form validation and error handling
- Stores JWT token and user info in localStorage
- Redirects to appropriate dashboard based on role

#### Signup Component (`Signup.jsx`)
- User registration form
- Name, email, address, password inputs
- Validation with error messages
- Default role: USER

#### UpdatePassword Component (`UpdatePassword.jsx`)
- Change password form
- Requires old password verification
- New password validation
- Requires authentication

#### AdminDashboard Page (`AdminDashboard.jsx`)
- Dashboard statistics (total users, stores, ratings)
- **Create User** button and form
- **Create Store** button and form
- **Stores** list with filters (name, email, address, sort options)
- **Users** list with filters (name, email, address, role, sort options)
- User details view
- Form validations as placeholders

#### UserStores Page (`UserStores.jsx`)
- List all stores with search functionality
- Search by store name or address
- Display store information (name, address)
- Show overall store rating
- Show user's personal rating (if exists)
- Rating input (1-5)
- Submit new rating button
- Update existing rating button
- Rating validation

#### OwnerDashboard Page (`OwnerDashboard.jsx`)
- List all stores owned by the user
- For each store:
  - Store name
  - Total number of ratings
  - Average rating
  - List of users who rated and their ratings

---

## Running the Application

### Terminal Setup (Two Terminals Required)

#### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
DB synced
Server running on port 4000
```

#### Terminal 2: Frontend Development Server
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.1.0  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

### Production Build (Frontend)
```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/` directory.

---

## Features in Detail

### 1. Authentication Flow
1. User signs up or logs in
2. Backend verifies credentials
3. JWT token is generated and sent to frontend
4. Frontend stores token in localStorage
5. Token is included in all subsequent requests
6. User is redirected to role-appropriate dashboard

### 2. Role-Based Access Control
- Backend middleware checks JWT token and user role
- Frontend routes are protected with components
- Unauthorized access returns 401 error
- Different dashboards based on role

### 3. User Management System
- Admins can create users with different roles
- Each user has unique email
- Passwords are securely hashed
- User details can be viewed and filtered

### 4. Store Management System
- Stores have name, email, and address
- Each store is assigned to an owner
- Stores can be created only by admins
- Store information is displayed to all users

### 5. Rating System
- Users rate stores (1-5 scale)
- Unique constraint: one rating per user per store
- Users can update their ratings
- Overall rating is calculated automatically
- Rating history is preserved with timestamps

### 6. Dashboard Features
- **Admin**: Statistics and management tools
- **Store Owner**: View ratings received
- **User**: Browse and rate stores

### 7. Search & Filter
- Admin can filter users and stores
- Multiple filter options (name, email, address)
- Sort options (ascending/descending)
- Frontend stores list searchable by name and address

---

## Troubleshooting

### Database Connection Issues

**Error**: `Connection refused`
```
Solution:
1. Ensure MySQL server is running
2. Check DB_HOST, DB_PORT, DB_USER, DB_PASS in .env
3. Verify database exists: CREATE DATABASE IF NOT EXISTS store_ratings;
4. Check MySQL port (default 3306)
```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::4000` or `:5173`
```bash
# Kill process on port 4000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwnerProcess | Stop-Process

# Or use different port in .env
PORT=4001
VITE_API_URL=http://localhost:4001/api
```

### JWT Token Issues

**Error**: `Invalid token` or `401 Unauthorized`
```
Solution:
1. Ensure token is included: Authorization: Bearer <token>
2. Check token hasn't expired (24 hours)
3. Verify JWT_SECRET is consistent between sessions
4. Clear localStorage and login again
5. Check token format: should be three parts separated by dots
```

**Error**: `Unauthorized` after login but no token error
```
Solution:
1. Verify user role matches endpoint permissions
2. Check middleware chain: auth → roles
3. Ensure user has correct role in database
```

### Form Validation Issues

**Error**: `Validation failed`
```
Ensure all fields meet requirements:
- Name: 20-60 characters
- Email: Valid format (example@domain.com)
- Address: Max 400 characters
- Password: 8-16 characters, 1 uppercase, 1 special character
```

### Frontend Not Connecting to Backend

**Error**: `Network request failed` or `CORS error`
```
Solution:
1. Ensure backend is running on port 4000
2. Check VITE_API_URL in frontend .env
3. Verify CORS is enabled in backend (enabled by default)
4. Check network tab in browser DevTools for actual error
```

### Database Schema Issues

**Error**: `Unknown column` or `Table doesn't exist`
```bash
Solution:
1. Delete existing database: DROP DATABASE store_ratings;
2. Create fresh database: CREATE DATABASE store_ratings;
3. Run schema: mysql -u root -p store_ratings < sql/schema.sql
4. Restart backend: npm run dev
```

### Bcrypt Installation Issues

**Error**: `node-gyp rebuild` fails
```bash
Solution (Windows):
1. Install Visual Studio Build Tools
2. Install Python 3.x
3. npm install --build-from-source
4. Or use pre-built binaries: npm install bcrypt --save-optional
```

### Email Already Exists

**Error**: `Email already registered`
```
Solution:
1. Use a different email address
2. Or delete the user from database if testing:
   DELETE FROM users WHERE email = 'existing@example.com';
```

---

## Support & Contact

For issues or questions:
1. Check the Troubleshooting section
2. Review the quickstart.md file
3. Examine error logs in terminal
4. Check browser console for frontend errors
5. Use MySQL Workbench to inspect database

---

## Future Enhancements

Potential features for future versions:
- Email verification for new users
- Password reset via email
- Store photos/images
- User profiles with settings
- Review comments for ratings
- Rating history view
- Advanced analytics
- Admin audit logs
- Pagination for large datasets
- WebSocket notifications for real-time updates
- Two-factor authentication
- Social login (Google, GitHub)

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**License**: MIT
