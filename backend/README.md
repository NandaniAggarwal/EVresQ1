⚡ EV RESQ Backend (Role-Based Auth using Local Storage)

EV RESQ is a role-based EV emergency charging platform backend built using
Node.js, Express, MongoDB with simple role-based authentication.

👥 Supported Roles

EV owner → EV Owner (needs charging)

driver → Roadside charging provider

host → Home charger provider

🚀 Quick Start
cp .env.example .env
npm install
npm run dev


Server:
👉 http://localhost:8000

🔐 Authentication 

❌ NO sessions
❌ NO cookies
❌ NO passport

✅ Auth handled via Local Storage (Frontend)

How auth works

On login/register, backend returns:

id

role

Frontend stores them in localStorage

Frontend sends id + role in headers/body for protected routes

Backend verifies role manually

Example (Frontend):

localStorage.setItem("userId", res.data.id);
localStorage.setItem("role", res.data.role);

🧩 Registration Flow (Role-Based)

User selects role on UI

EVowner | driver | host

Backend asks different fields based on role

Separate MongoDB collections are used

🛣️ API Routes (Implemented Till Today)
🔑 Auth Routes
Register (Role-Based)
POST /api/EVowner/
POST /api/driver
POST /api/host


📌 Creates role-specific document
📌 Returns:

{
  "id": "mongodb_id",
  "role": "user | driver | host",
  "message": "Registered successfully"
}

Login (Role-Based)
POST /api/auth/login
POST /api/auth/login
POST /api/auth/login


Body

{
  "email": "test@gmail.com",
  "password": "123456"
}


📌 Returns:

{
  "id": "mongodb_id",
  "role": "driver",
  "message": "Login successful"
}


📌 Frontend must store id & role in localStorage
