# CodoTrack — Coding Practice Tracker

> **Member 4 — Frontend + Reminder System**

A full-stack coding practice tracker built with React (Vite), Tailwind CSS, Chart.js, and Node.js.

---

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Frontend  | React 18, Vite, Tailwind CSS |
| Charts    | Chart.js 4 + react-chartjs-2 |
| Routing   | React Router v6              |
| State     | Context API + useReducer     |
| HTTP      | Axios with interceptors      |
| Backend   | Node.js + Express            |
| Reminders | node-cron + Nodemailer       |
| Database  | MongoDB + Mongoose           |

---

## Project Structure

```
CodeTrack/
├── frontend/
│   ├── src/
│   │   ├── api/            # axiosInstance + API helpers
│   │   ├── components/
│   │   │   ├── charts/     # DifficultyBarChart, TagDonutChart, ActivityLineChart
│   │   │   ├── layout/     # Navbar, Sidebar, Layout
│   │   │   └── ui/         # StatsCard, ProblemCard, BadgeCard, Modal, etc.
│   │   ├── context/        # AuthContext (login, logout, session restore)
│   │   ├── pages/
│   │   │   ├── auth/       # LoginPage, RegisterPage
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProblemsPage.jsx
│   │   │   ├── AddProblemPage.jsx
│   │   │   ├── BadgesPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── App.jsx         # Routes + ProtectedRoute
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
└── backend/
    ├── jobs/
    │   └── reminderJob.js      # node-cron daily email job
    └── utils/
        ├── emailSender.js      # Nodemailer send functions
        └── inactivityChecker.js
```

---

## Frontend Setup

```bash
cd frontend
cp .env.example .env          # fill in VITE_API_BASE_URL
npm install
npm run dev                    # http://localhost:5173
```

### Environment Variables

| Variable            | Description          | Default                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME`     | App display name     | `CodoTrack`                 |

---

## Reminder System Setup

```bash
cd backend
cp .env.example .env          # fill in SMTP_USER, SMTP_PASS, MONGO_URI
npm install node-cron nodemailer
```

Then in your Express `server.js` / `app.js`:

```js
const { startReminderJob } = require("./jobs/reminderJob");
startReminderJob(); // starts the daily 8 AM cron
```

For Gmail:

1. Enable 2-Factor Authentication on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an app password and paste it into `SMTP_PASS`

---

## Key Features

- ✅ JWT authentication with auto-refresh & 401 auto-logout
- 📊 3 Chart types: Activity Line, Difficulty Bar, Tag Donut
- 🔍 Filter + search + sort + tag chips on Problems page
- 💾 Auto-save notes on ProblemCard (1.5 s debounce)
- 🏆 Badges with earned / locked states
- 🔔 Daily email reminders via node-cron + Nodemailer
- 📱 Fully responsive (mobile navbar, card-based layouts)
- 🎨 Dark theme with custom Tailwind config

---

## Commit History (Member 4)

This branch contains **40+ structured commits** following Conventional Commits format:

- `feat(setup)` — Project initialization
- `feat(routing)` — App routing + ProtectedRoute
- `feat(auth)` — Login, Register, AuthContext
- `feat(dashboard)` — Stats cards + charts
- `feat(problems)` — Problem list, add form, card
- `feat(badges)` — Badge system
- `feat(charts)` — Chart.js integrations
- `feat(api)` — Axios utility + interceptors
- `feat(reminder)` — Cron job + email sender + inactivity checker
- `feat(ui)` — Navbar, Sidebar, Modal, responsive layouts
- `fix(*)` — Error handling, validation, edge cases
- `refactor(*)` — API utility migrations
- `chore` — Cleanup + prop-type fixes

---

## Pull Request

Branch: `feat/member4-frontend`  
Base: `main`  
PR title: `feat: Member 4 - Complete Frontend + Reminder System`
