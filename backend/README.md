# HasthiyaAuth Backend

Simple Node + Express backend for the HasthiyaAuth assignment.

Quick start

1. Install deps

```bash
cd backend
npm install
```

2. Create `.env` from `.env.example` and set your MySQL credentials.

3. Create the database and run `schema.sql` (e.g., via MySQL Workbench or CLI).

4. Start server

```bash
npm start
# or for development with nodemon (install globally or as dev dep):
npm run dev
```

API endpoints

- POST `/api/auth/register` { full_name, email, password }
- POST `/api/auth/login` { email, password } => { token }
- GET `/api/profile` (Bearer token) => user profile
