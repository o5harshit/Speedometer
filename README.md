# 🚗 Speedometer App — Real-Time Dockerized Application

## 📘 Overview
The **Speedometer App** is a real-time web application that visualizes vehicle speed updates every second.  
It is built using a **React frontend** and a **Node.js backend** connected to **MySQL**, with each component running in **separate Docker containers**.

This project demonstrates a full-stack, containerized system with real-time communication via **WebSockets (Socket.io)** and persistent data storage in **MySQL**.

---

## 🧠 Problem Statement
Build a **real-time, Dockerized speedometer application** that:
- Records simulated speed data every second in a database.
- Displays live speed updates on a frontend dashboard.
- Runs fully in Docker containers (frontend, backend, and database).

---

## 🧱 Architecture Block Diagram

               ┌──────────────────────────┐
               │     React Frontend       │
               │  (Docker Container 1)    │
               │ Port: 5173               │
               │ Displays live speed data │
               └──────────▲───────────────┘
                          │ WebSocket (Real-Time)
                          │ REST API (Optional)
               ┌──────────┴───────────────┐
               │   Node.js Backend        │
               │  (Docker Container 2)    │
               │  Express + Socket.io     │
               │  Port: 8747              │
               └──────────▲───────────────┘
                          │ SQL Queries
               ┌──────────┴───────────────┐
               │        MySQL DB          │
               │   (Dockerized Service)   │
               │ Port: 3307 (host)        │
               └──────────────────────────┘
---

## 🧩 Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React (Vite) | Real-time UI with WebSocket updates |
| **Backend** | Node.js + Express + Socket.io | API + WebSocket server |
| **Database** | MySQL 8 | Stores speed data (1-sec interval) |
| **Containerization** | Docker + Docker Compose | Manages multi-container environment |

---

## 🗂️ Project Structure

Speedometer/
├─ README.md
├─ client/
│   ├─ public/
│   ├─ assets/
│   ├─ components/
│   ├─ Dockerfile
│   ├─ .dockerignore
│   ├─ .env
│   ├─ .eslintrc.cjs
│   ├─ index.html
│   ├─ package.json
│   ├─ package-lock.json
│   ├─ vite.config.js
│   └─ src/
│       ├─ App.jsx
│       ├─ index.css
│       └─ main.jsx
└─ server/
    ├─ Controllers/
    ├─ db/
    ├─ Routes/
    │   └─ .env
    ├─ docker-compose.yml
    ├─ Dockerfile
    ├─ .dockerignore
    ├─ .env
    ├─ index.js
    ├─ package.json
    └─ package-lock.json

    
---

## ⚙️ Setup & Run Instructions

### 🧩 Step 1: Run the Backend (Server + MySQL)
Navigate into your **server** folder:
```bash
cd server
docker-compose up -d --build 

This command:

Builds your backend image (node-app:dev)

Starts two containers:

Node.js server (nodeapp)

MySQL database (mysqldb)

docker ps
✅ You should see both nodeapp and mysqldb running.

Navigate into your client folder:

cd client
docker build -t react-app:dev .
docker run -p 5173:5173 react-app:dev


Your frontend is now live at:
👉 http://localhost:5173

| Service  | Container     | Host Port | Description             |
| -------- | ------------- | --------- | ----------------------- |
| Frontend | react-app:dev | 5173      | React UI (Speedometer)  |
| Backend  | node-app:dev  | 8747      | Node.js API + Socket.io |
| MySQL    | mysql:8.0     | 3307      | Database                |

🧠 How It Works

Sensor Simulation (sensorSimulator.js) inserts random speed data (0–179 km/h) into MySQL every 1 second.

Backend (Node.js) fetches the latest speed and emits it via Socket.io to all connected clients.

Frontend (React) connects through WebSocket and updates the live speedometer instantly.

🧱 Strategy & Key Design Decisions

🔹 Real-Time Communication

Used Socket.io for live data push instead of polling.
Ensures the frontend receives updates instantly without extra network load.

🔹 Multi-Container Setup

Frontend, backend, and database isolated into separate containers.

Simplifies scaling and maintenance.


🔹 Data Flow

Simulator inserts data into MySQL.

Node.js fetches and broadcasts via WebSocket.

React updates speedometer instantly.

🔹 Scalability

Independent containerization allows horizontal scaling (e.g., multiple Node.js instances behind a load balancer).

Easily deployable to AWS ECS, Azure Container Apps, or Render.

| Challenge                       | Solution                                               |
| ------------------------------- | ------------------------------------------------------ |
| Maintain real-time updates      | Used WebSockets (Socket.io) for instant client updates |
| Synchronizing DB writes & emits | Used 1-sec interval loop emitting latest DB record     |
| Networking between containers   | Used Docker bridge network and service names           |
| Environment reproducibility     | Docker Compose for single-command setup                |
| Avoiding rebuild overhead       | `.dockerignore` + cached layers for efficient builds   |

🧭 Challenges Addressed & Opportunities
Challenges

Building real-time data flow between frontend and backend.

Managing multi-container communication.

Ensuring consistent setup across systems.

Opportunities

Scalable microservice architecture.

Demonstrates practical DevOps (Docker) knowledge.

Easily extendable for analytics dashboards or IoT sensor data.


