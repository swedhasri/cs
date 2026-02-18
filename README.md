# CyberShield — Cybersecurity Awareness & Toolkit

A modern, full‑stack cybersecurity awareness platform built with React, Node.js/Express, and MySQL. Access security tools, real-time threat intelligence, and educational resources.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Tech Stack](https://img.shields.io/badge/Node.js-Express-green) ![Tech Stack](https://img.shields.io/badge/MySQL-Sequelize-orange) ![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-3-cyan)

## Features

- 🔐 **User Authentication** — Register/Login with JWT (HTTP‑only cookies) + bcrypt
- 🔑 **Password Strength Checker** — Analyze passwords with detailed scoring and tips
- #️⃣ **Hash Generator** — MD5, SHA‑1, SHA‑256 hash generation
- 🌐 **Port Scanner** — Simulated network port scanning
- 🛡️ **CVE Lookup** — Search vulnerability database
- 📡 **Threat Intelligence Feed** — Latest cybersecurity threats and news
- 👤 **User Dashboard** — Stats, scan history, quick access tools
- 📱 **Responsive Design** — Mobile, tablet, and desktop friendly
- 🌙 **Dark Cybersecurity Theme** — Neon accents, glassmorphism, animations

## Prerequisites

- **Node.js** v18+ and npm
- **MySQL** 8.0+ (running locally)

## Quick Start

### 1. Clone and Setup Database

```bash
# Create the database
mysql -u root -p < database/schema.sql
```

### 2. Configure Environment

```bash
# Copy and edit the backend env file
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=cyber_toolkit
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the Application

Open **two terminals**:

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Visit **http://localhost:5173** in your browser.

## Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers
│   ├── data/            # Mock CVE & threat data
│   ├── middleware/       # Auth, validation, error handling
│   ├── models/          # Sequelize models (User, Scan)
│   ├── routes/          # Express routes
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Footer, ProtectedRoute
│   │   ├── context/     # AuthContext
│   │   ├── pages/       # All page components
│   │   ├── services/    # Axios API client
│   │   └── App.jsx      # Router setup
│   ├── tailwind.config.js
│   └── vite.config.js
├── database/
│   └── schema.sql       # MySQL table creation script
└── README.md
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/auth/logout` | No | Clear auth cookie |
| GET | `/api/auth/me` | Yes | Check auth status |
| GET | `/api/user/profile` | Yes | Get user profile |
| PUT | `/api/user/profile` | Yes | Update profile |
| POST | `/api/user/change-password` | Yes | Change password |
| DELETE | `/api/user/delete` | Yes | Delete account |
| POST | `/api/tools/password-strength` | Optional | Check password |
| POST | `/api/tools/hash` | Optional | Generate hash |
| POST | `/api/tools/port-scan` | Optional | Simulate scan |
| GET | `/api/tools/cve?keyword=` | Optional | Search CVEs |
| GET | `/api/threat-feed` | No | Get threat feed |

## Security Measures

- **HTTP‑only cookies** for JWT storage (prevents XSS token theft)
- **bcrypt** password hashing with salt rounds of 12
- **express‑validator** input validation on all endpoints
- **CORS** configured for frontend origin only
- Protected routes on both frontend and backend

## License

MIT
