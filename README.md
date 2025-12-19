# HasthiyaIT Authentication System

A secure, full-stack authentication system for HasthiyaIT employee management built with **React + TypeScript + Node.js + MySQL**.

## 🎯 Features

- ✅ **User Registration** with email validation and password strength indicator
- ✅ **Secure Login** with JWT token authentication
- ✅ **Protected Routes** for authenticated users only
- ✅ **User Profile** page to view authenticated user information
- ✅ **Password Security** with bcrypt hashing (10 salt rounds)
- ✅ **Responsive Design** with Tailwind CSS and light purple/blue theme
- ✅ **API Error Handling** with user-friendly error messages
- ✅ **Token Persistence** using localStorage

## 📁 Project Structure

```
Pasindi-HasthiyaAuth/
├── backend/                 # Node.js + Express server
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── server.js       # Server startup & DB initialization
│   │   ├── config/         # Environment config
│   │   ├── models/         # Database connection
│   │   ├── middleware/     # JWT authentication middleware
│   │   ├── controllers/    # Business logic
│   │   └── routes/         # API endpoint definitions
│   ├── scripts/
│   │   └── init-db.js      # Database initialization script
│   ├── schema.sql          # Database schema
│   ├── .env.example        # Environment variables template
│   └── package.json
│
└── frontend/               # React + Vite + TypeScript
    ├── src/
    │   ├── main.tsx        # Entry point
    │   ├── App.tsx         # Main component with routing
    │   ├── context/
    │   │   ├── authContext.ts       # Auth types & context
    │   │   └── AuthProvider.tsx     # Auth provider component
    │   ├── components/
    │   │   └── ProtectedRoute.tsx   # Route guard
    │   ├── pages/
    │   │   ├── Register.tsx         # Registration page
    │   │   ├── Login.tsx            # Login page
    │   │   └── Profile.tsx          # Profile page
    │   └── styles/
    ├── .env.example        # Environment variables template
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ & npm
- **MySQL** v5.7+
- **Git**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

3. **Example .env configuration**
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=hasthiya_auth
   PORT=4000
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRATION=1h
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   Server will:
   - Initialize MySQL database automatically
   - Create `hasthiya_auth` database if it doesn't exist
   - Create `users` table with schema
   - Start listening on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables (optional)**
   ```bash
   cp .env.example .env.local
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Frontend will:
   - Start Vite dev server on `http://localhost:5173`
   - Proxy `/api` requests to `http://localhost:4000`
   - Hot reload on file changes

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Create a new account
   - Login with your credentials
   - View your profile

## 🔐 API Endpoints

### Authentication Routes

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Get User Profile** (Protected)
```http
GET /api/profile
Authorization: Bearer {token}

Response (200):
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-12-20T10:30:00Z"
}
```

## 🔧 Technology Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MySQL 8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Middleware**: CORS, body-parser

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.8
- **HTTP Client**: axios
- **Routing**: react-router-dom 6.14.1
- **State Management**: React Context API

## 🎨 UI/UX Features

- **Light Theme**: Soft white, light blue, and purple color palette
- **Responsive Design**: Mobile-friendly layout
- **Password Strength Indicator**: Visual feedback during registration
- **Loading States**: Visual feedback during API calls
- **Error Messages**: User-friendly error notifications
- **Form Validation**: Client and server-side validation

## 📋 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing the Application

### Manual Testing Steps

1. **Start both servers** (backend on port 4000, frontend on port 5173)

2. **Register a new user**
   - Navigate to `/register`
   - Enter name, email, and password
   - Submit form
   - Should redirect to profile

3. **Login**
   - Navigate to `/login`
   - Enter email and password
   - Submit form
   - Should show user profile

4. **Access protected route**
   - Try accessing `/profile` without login
   - Should redirect to `/login`
   - Login and should see profile page

5. **Logout**
   - Click logout button
   - Token cleared from localStorage
   - Redirected to login page

## 🐛 Troubleshooting

### MySQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
- Ensure MySQL server is running
- Verify DB_HOST and DB_PORT in .env
- Check DB_USER and DB_PASSWORD are correct

### Port Already in Use
```
Error: listen EADDRINUSE :::4000
```
- Change PORT in backend/.env
- Update vite.config.ts proxy URL

### CORS Error in Browser Console
- Ensure backend is running on port 4000
- Check Vite proxy configuration in vite.config.ts



