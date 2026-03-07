# BackerSphere X 🚀

**AI-Powered Crowdfunding Platform** using the MERN stack + Google Gemini AI

---

## Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key (free at https://aistudio.google.com)

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will be available at **http://localhost:3000**

---

## Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `GEMINI_API_KEY` | Google Gemini API key |
| `JWT_SECRET` | Secret key for JWT tokens |
| `PORT` | Backend port (default 5000) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

---

## Default Admin Credentials

- **Email:** admin@backersphere.com
- **Password:** Admin@BackerSphere2024
- **Login URL:** http://localhost:3000/admin/login

*(Change these in .env before deploying)*

---

## User Roles

| Role | Description |
|---|---|
| **Innovator** | Submit projects, view AI evaluations, track funding |
| **Backer** | Browse approved projects, contribute funds, track portfolio |
| **Admin** | Review all projects, use AI insights to approve/reject |

---

## Tech Stack

- **Frontend:** React.js + Tailwind CSS + React Router
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **AI:** Google Gemini API (gemini-pro)
- **Auth:** JWT + bcrypt + role-based access

---

## API Routes

```
POST /api/auth/register        Register innovator or backer
POST /api/auth/login           User login
POST /api/auth/admin/login     Admin login
GET  /api/auth/me              Get current user

GET  /api/projects             Browse approved projects
POST /api/projects             Submit project (innovator)
GET  /api/projects/my/projects Innovator's own projects
GET  /api/projects/:id         Project details

POST /api/contributions        Back a project (backer)
GET  /api/contributions/my     Backer's contribution history

GET  /api/admin/stats          Dashboard stats (admin)
GET  /api/admin/projects       All projects (admin)
PATCH /api/admin/projects/:id/approve  Approve project
PATCH /api/admin/projects/:id/reject   Reject project
GET  /api/admin/users          All users (admin)
```
