## URL: https://ubiquitous-bombolone-8faff0.netlify.app/

#  Task Management Web App

A full-stack task management application that allows users to register, log in, and manage their daily tasks with features like categorization, status updates, and real-time syncing.

## Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: CSS Modules
- **State Management**: React Context API (Auth)

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)

---

##  Features

- User Registration & Login
- JWT Authentication & Session Persistence
- Create, View, Update, Delete Tasks
- Categorize Tasks by Status (To Do, In Progress, Done)
- Filter by Category or Priority
- Responsive UI
- Logout Functionality

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js ≥ 14.x
- npm ≥ 6.x or yarn
- MongoDB (Atlas or local)

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Task-management-backend.git
   cd Task-management-backend
   npm install
   ```
2. Create .env file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```
   npm start
   ```
   The backend will run at http://localhost:5000

## Frontend Setup
1. Clone the frontend repo:
   ```
   git clone https://github.com/<your-username>/Task-management-frontend.git
   cd Task-management-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run at http://localhost:3000

## Project Structure

Task-management-frontend/
│
├── pages/              # Next.js pages (Login, Register, Dashboard)
├── components/         # Reusable components
├── context/            # Auth Context
├── styles/             # CSS Modules
├── utils/              # API calls or helper functions
└── public/             # Static assets

Task-management-backend/
│
├── routes/             # Auth & Task routes
├── models/             # Mongoose schemas
├── controllers/        # Route logic
├── middleware/         # Auth middleware
└── server.js           # Entry point


# Deployment
Backend: Render

Frontend: Vercel



