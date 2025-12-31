# EV RESQ Backend (Sessions)

Three roles: **user** (needs charge), **driver** (roadside charger), **host** (home charger sharing).  
Auth uses **passport-local + sessions** persisted in Mongo via connect-mongo.

## Quick Start
```bash
cp .env.example .env
npm i
npm run dev
```
Server: `http://localhost:8000`

## Key Routes
- Auth
  - `POST /api/auth/register/user|driver|host`
  - `POST /api/auth/login/user|driver|host`
  - `GET /api/auth/me`
  - `POST /api/auth/logout`
- User
  - `GET /api/users/dashboard`
  - `GET /api/users/bookings`
  - `POST /api/bookings` (create roadside booking)
  - `GET /api/chargers?city=...&pincode=...`
  - `POST /api/chargers/book` (book home charge)
- Driver
  - `GET /api/drivers/dashboard`
  - `POST /api/drivers/availability/toggle`
  - `GET /api/drivers/bookings/open`
  - `POST /api/drivers/bookings/:id/accept`
  - `POST /api/drivers/bookings/:id/progress` (status: OnTheWay | Charging | Completed | Cancelled)
  - `GET /api/drivers/bookings/mine`
- Host
  - `GET /api/hosts/dashboard`
  - `GET /api/hosts/chargers/mine`
  - `POST /api/chargers` (create listing)

All protected routes require cookies (`credentials: 'include'` on fetch).

## Sessions
Cookie name: `evresq.sid`  
To logout: `POST /api/auth/logout`.

## Notes
- Models live in `src/models/`
- Controllers in `src/controllers/`
- You can extend payment/websockets easily on top of this.
```

