# Store Ratings (Full Documentation)

⚡ A full-stack application for managing stores, users, and ratings with role-based access (Admin / Store Owner / User).

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Quick Setup](#quick-setup)
6. [Configuration](#configuration)
7. [Database](#database)
8. [API Overview](#api-overview)
9. [Authentication & Authorization](#authentication--authorization)
10. [Frontend](#frontend)
11. [Testing](#testing)
12. [Troubleshooting](#troubleshooting)

---

## Overview

This application allows users to rate stores (1-5). It supports three roles:

- **ADMIN**: Manage users, stores, and view overall dashboard stats.
- **STORE_OWNER**: View ratings for owned stores.
- **USER**: Browse stores and submit/update ratings.

It is structured as a **React frontend** + **Node/Express backend** with **MySQL** storage.

---

## Features

### User & Role Management

- User registration (sign up)
- Admin-created users (including roles)
- JWT authentication + protected routes
- Role-based access control

### Store Management

- Admin can create, list, filter, and sort stores
- Each store is assigned to a store owner
- Users can browse stores and search by name/address

### Rating System

- Users submit and update ratings (1–5)
- A user can rate each store once
- Store average rating is calculated automatically

### Dashboards

- **Admin Dashboard**: totals + create users/stores + filter listings
- **Owner Dashboard**: list of store ratings + average score
- **User View**: list stores + rating submission

---

## Tech Stack

### Backend

- **Node.js** (v16+)
- **Express** (v4)
- **Sequelize** (ORM)
- **MySQL** (database)
- **JWT** (auth)
- **bcrypt** (password hashing)

### Frontend

- **React** (v18)
- **Vite** (build tool)
- **Tailwind CSS** (v4)
- **React Router** (v6)

### Tooling

- **ESLint / Prettier** (optional)
- **Nodemon** (dev server)

---

## Project Structure

```
roxilerAssignment/
├── backend/
│   ├── config/           # DB + env config
│   ├── controllers/      # Route handlers
│   ├── middlewares/      # auth + error handling
│   ├── models/           # Sequelize models
│   ├── routes/           # Express routing
│   ├── scripts/          # DB creation helper
│   ├── server.js         # App entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api.js        # API client wrapper
│   │   ├── components/   # Shared UI components
│   │   ├── pages/        # Key screens (Admin, Owner, User)
│   │   ├── App.jsx       # Router + layout
│   │   └── index.css     # Tailwind + custom themes
│   └── package.json
└── sql/
    └── schema.sql        # DB schema / seed script
```

---

## Quick Setup

### 1) Backend Setup

1. Copy `.env.example` to `.env` in `backend/`.
2. Update environment values (see [Configuration](#configuration)).
3. Create the database (see [Database](#database)).
4. Install & run:

```bash
cd backend
npm install
npm run dev
```

The backend server runs on **http://localhost:3000** by default.

---

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open the browser at the URL shown in the console (usually **http://localhost:5173**).

---

## Configuration

### Backend `.env` keys (required)

| Key           | Description                       |
| ------------- | --------------------------------- |
| `DB_HOST`     | MySQL host (e.g., `localhost`)    |
| `DB_USER`     | MySQL user                        |
| `DB_PASSWORD` | MySQL password                    |
| `DB_NAME`     | Database name                     |
| `JWT_SECRET`  | Secret key for JWT tokens         |
| `PORT`        | Backend port (defaults to `3000`) |

Example `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=store_ratings
JWT_SECRET=your_super_secret_key
PORT=3000
```

---

## Database

### Schema

The schema is located at `sql/schema.sql`. It defines:

- `users` (with role, hashed password)
- `stores` (linked to a store owner)
- `ratings` (user-store rating relationship)

### Create the schema

```bash
mysql -u <user> -p < sql/schema.sql
```

If you want to reset the database, re-run the schema script.

---

## API Overview

The backend exposes REST endpoints for auth, users, stores, and ratings.

### Base URL

`http://localhost:3000/api`

### Auth Endpoints

| Endpoint                    | Method | Description                     |
| --------------------------- | ------ | ------------------------------- |
| `/api/auth/signup`          | POST   | Create a new user               |
| `/api/auth/login`           | POST   | Login and receive JWT           |
| `/api/auth/update-password` | POST   | Update password (authenticated) |

### Admin Endpoints (requires `ADMIN` role)

| Endpoint                  | Method | Description               |
| ------------------------- | ------ | ------------------------- |
| `/api/admin/dashboard`    | GET    | Dashboard stats           |
| `/api/admin/users`        | GET    | List users (filter/sort)  |
| `/api/admin/users`        | POST   | Create user               |
| `/api/admin/stores`       | GET    | List stores (filter/sort) |
| `/api/admin/stores`       | POST   | Create store              |
| `/api/admin/store-owners` | GET    | List store owners         |
| `/api/admin/users/:id`    | GET    | User details              |

### Store Endpoints (authenticated users)

| Endpoint               | Method | Description                  |
| ---------------------- | ------ | ---------------------------- |
| `/api/stores`          | GET    | List stores (with filtering) |
| `/api/stores/:id/rate` | POST   | Submit rating                |
| `/api/stores/:id/rate` | PUT    | Update rating                |

### Owner Endpoints (requires `STORE_OWNER` role)

| Endpoint               | Method | Description                |
| ---------------------- | ------ | -------------------------- |
| `/api/owner/dashboard` | GET    | Stores + ratings for owner |

---

## Authentication & Authorization

### JWT

The frontend stores the JWT in `localStorage` under `token`.

### Roles

- `ADMIN`: Full access (users/stores/ratings)
- `STORE_OWNER`: Access to their store ratings
- `USER`: Can browse stores and rate

Middleware enforces role rules in `backend/middlewares/roles.js`.

---

## Frontend

### Key Pages

- **Login** (`/login`)
- **Signup** (`/signup`)
- **Update Password** (`/update-password`)
- **Admin Dashboard** (`/admin`)
- **Owner Dashboard** (`/owner`)
- **User Store List** (`/`)

### Styling

Tailwind CSS is used for styling. The global styles are in `frontend/src/index.css`.

### API Client

`frontend/src/api.js` wraps fetch calls and handles JWT injection.

---

## Testing

No formal test suite is included in this repo, but you can manually verify:

- Signup/login flows
- Admin user/store creation
- Store rating submission/updates
- Role-based route access

---

## Troubleshooting

### ✖ Backend fails to start

- Ensure `.env` is set and MySQL is running.
- Confirm the schema is created.
- Check if PORT is already in use.

### ✖ Frontend shows CSS errors

- Ensure `npm install` completed successfully.
- Verify `tailwindcss` is installed (v4+ required).

### ✖ CORS / network issues

- Ensure frontend uses the correct backend URL (`http://localhost:3000`).
- Check browser console for blocked requests.

---

## Useful Commands

| Purpose             | Command                               |
| ------------------- | ------------------------------------- |
| Start backend       | `cd backend && npm run dev`           |
| Start frontend      | `cd frontend && npm run dev`          |
| Run database schema | `mysql -u <user> -p < sql/schema.sql` |

---

## Notes

This project is intentionally structured for easy extension:

- Add new endpoints in `backend/controllers`
- Add pages in `frontend/src/pages`
- Add new UI components in `frontend/src/components`

---

Happy coding! 🚀
