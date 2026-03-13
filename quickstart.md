# Quick Start Guide - Store Ratings App

Get the Store Ratings application up and running in **5 minutes**. Follow these steps in order.

---

## Prerequisites (Check First)

Before starting, ensure you have:
- **Node.js 16+** → Check: `node --version`
- **npm 7+** → Check: `npm --version`
- **MySQL Server** running → Check by opening MySQL client
- Workspace open at: `d:/roxilerAssignment`

If any are missing, install them before proceeding.

---

## Step 1: Create Database (First Time Only)

**⚠️ Do this ONLY ONCE when starting for the first time!**

Open **PowerShell** or **Command Prompt** and run:

```powershell
# Navigate to project root
cd d:\roxilerAssignment

# Create database and tables
Get-Content .\sql\schema.sql | mysql -u root -p
```

When prompted, enter your MySQL password (leave blank if no password).

**You should see:** Database created or tables exist message. No errors = Success! ✅

**If you prefer manual MySQL client:**
1. Open MySQL Workbench or MySQL CLI
2. Run the SQL content from `sql/schema.sql`
3. Confirm 3 tables exist: `users`, `stores`, `ratings`

---

## Step 2: Setup Backend

**Terminal 1 (Keep running during development)**

```powershell
# Navigate to backend
cd d:\roxilerAssignment\backend

# Install dependencies
npm install
```

Create `.env` file in the `backend` folder with this content:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_ratings
DB_USER=root
DB_PASS=
JWT_SECRET=your_secret_key_change_in_production
PORT=4000
NODE_ENV=development
```

⚠️ Replace:
- `DB_USER` = your MySQL username
- `DB_PASS` = your MySQL password  
- `JWT_SECRET` = any random string (change in production)

**Start backend server:**

```powershell
npm run dev
```

✅ **Expected output:**
```
DB synced
Server running on port 4000
```

Keep this terminal open. Backend is now running! 🚀

---

## Step 3: Setup Frontend

**Terminal 2 (New terminal, keep running)**

```powershell
# Navigate to frontend
cd d:\roxilerAssignment\frontend

# Install dependencies
npm install
```

Create `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:4000/api
```

**Start frontend development server:**

```powershell
npm run dev
```

✅ **Expected output:**
```
VITE v5.1.0  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

✅ Frontend is now running!

---

## Step 4: Open Application

Open your browser and go to:

```
http://localhost:5173
```

You should see the application with **Login** and **Signup** buttons.

---

## Step 5: Create Admin User (First Time Only)

To access the admin dashboard, you need an ADMIN account.

**In Terminal 1 (where backend is running), stop it with Ctrl+C and run:**

```powershell
cd d:\roxilerAssignment\backend
node -e "console.log(require('bcrypt').hashSync('Admin@123', 10))"
```

This outputs a bcrypt hash. **Copy it.**

**Then insert the admin user into MySQL:**

```powershell
# Open MySQL
mysql -u root -p store_ratings
```

**Run in MySQL:**

```sql
INSERT INTO users (name, email, address, password_hash, role) 
VALUES ('System Administrator', 'admin@example.com', '123 Admin Street', '<PASTE_HASH_HERE>', 'ADMIN');
```

Replace `<PASTE_HASH_HERE>` with the hash from step above.

**Restart backend:**

```powershell
npm run dev
```

---

## Step 6: Login & Test

1. **Go to** http://localhost:5173
2. **Click Login**
3. **Enter:**
   - Email: `admin@example.com`
   - Password: `Admin@123`
4. **Click Login**

✅ You should now see the **Admin Dashboard**!

---

## What to Do Now

### As Admin:
- **Create Users** → Click "Create User" button
- **Create Stores** → Click "Create Store" button
- **View Statistics** → See total users, stores, ratings at top

### Test Regular User Flow:
1. **Logout** (top right menu)
2. **Go to Signup** → Create a regular USER account
3. **Login** with new account
4. **View Stores** → See stores and submit ratings (1-5 stars)

### Test Store Owner Flow:
1. As admin, create a user with role "STORE_OWNER"
2. Logout and login with that STORE_OWNER account
3. You'll see the **Owner Dashboard** showing ratings received

---

## Terminal Management

**You should have 2 terminals running:**

| Terminal | What's Running | Command |
|----------|---|---|
| Terminal 1 | Backend Server | `npm run dev` (in `backend/` folder) |
| Terminal 2 | Frontend Server | `npm run dev` (in `frontend/` folder) |

**To stop:** Press `Ctrl+C` in each terminal

**To restart:** Run commands again

---

## Quick Reference

| What You Want | URL |
|---|---|
| Application | http://localhost:5173 |
| API Base | http://localhost:4000/api |
| Admin Credentials | Email: `admin@example.com` / Password: `Admin@123` |

---

## Troubleshooting Quick Fixes

### "Cannot find module" in backend
```powershell
cd backend
npm install
```

### "Port 4000 already in use"
Change PORT in `backend/.env` to `4001` and update VITE_API_URL in `frontend/.env`

### "Cannot connect to database"
```powershell
# Check .env credentials match your MySQL setup
# Restart MySQL server
# Verify database exists: mysql -u root -p -e "SHOW DATABASES;"
```

### "No tables exist"
```powershell
# Re-run database setup
mysql -u root -p < .\sql\schema.sql
```

### "Cannot login"
- Verify admin user was created (Step 5)
- Check database: `mysql -u root -p store_ratings -e "SELECT * FROM users;"`
- Clear browser cache (Ctrl+Shift+Delete)

---

## Next Steps

- Read **README.md** for detailed documentation
- Explore API endpoints in README.md
- Create test data as you play with the app
- Check form validations (20-60 char names, 8-16 char passwords, etc.)

---

## Done! 🎉

Your application is now running with:
- ✅ Database setup
- ✅ Backend API running on port 4000
- ✅ Frontend running on port 5173
- ✅ Admin user created and ready to login

Enjoy building with the Store Ratings App!