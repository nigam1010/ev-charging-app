# ⚡ EV Charging Station Management Web App

A full-stack web application for managing and monitoring EV charging stations. Built with **Vue.js** (frontend) and **Node.js + Express + MySQL** (backend). Deployed from a **monorepo**.

##🚀 Live Demo
🔗 EV Charging App

(https://ev-charging-app-eight.vercel.app)
👉 Note: First register a new account, then use those credentials to log in.

---

## 📁 Folder Structure

```
ev-charging-app/
├── backend/          # Express API with Sequelize
├── frontend/         # Vue 3 UI with Vue Router
├── .gitignore
└── README.md

```

---

## 🚀 Features

- Register/login using email or username
- Add, edit, delete EV chargers
- View chargers with filters and map
- Responsive and modern UI
- Logout, authentication & JWT token handling

---

## 🔧 Tech Stack

- **Frontend:** Vue 3, Vue Router, Axios, Leaflet.js
- **Backend:** Node.js, Express, MySQL, Sequelize, JWT
- **Database:** MySQL

---

## ⚙️ Setup & Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ev-charging-app.git
cd ev-charging-app

```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Update DB credentials & JWT_SECRET in .env

# Start backend server
npm run dev

```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Optional: Set API proxy if using localhost backend
# vue.config.js handles proxy to port 5000

npm run serve

```

App runs at `http://localhost:8080`

---

## 🌐 Deployment

### Render (Monorepo setup)

- Create **two web services**: one for `/frontend`, another for `/backend`
- Set root directories correctly in Render settings
- Add environment variables in backend service (DB config + JWT_SECRET)

### Vercel + Railway

- Deploy `frontend/` to Vercel
- Deploy `backend/` to Railway or Render
- In `frontend/.env` set: `VUE_APP_API=https://your-backend-url/api`

---

## 📄 License

MIT License. Open-source and free to use.

## .env for safer side
DB_HOST=metro.proxy.rlwy.net
DB_PORT=40416
DB_USER=root
DB_PASSWORD=BtOszafGKyZcfXlHRkIXyJEsMvhqLQkJ
DB_NAME=railway
JWT_SECRET=supersecretkey123

