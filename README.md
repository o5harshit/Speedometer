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
                          │ REST API 
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
               │      │
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
```

when you run the above command it will do the following things :

1) Builds your backend image (node-app:dev)

2) Starts two containers:

3) Node.js server (nodeapp)

4) MySQL database (mysqldb)

``` bash
docker ps
```

✅ The above command will help you to see both nodeapp and mysqldb running or not.

Step 2: Navigate into your client folder:

```bash
cd client
docker build -t react-app:dev .
docker run -p 5173:5173 react-app:dev
```

The above command will run your frontend :
👉 http://localhost:5173

| Service  | Container     | Host Port | Description             |
| -------- | ------------- | --------- | ----------------------- |
| Frontend | react-app:dev | 5173      | React UI (Speedometer)  |
| Backend  | node-app:dev  | 8747      | Node.js API + Socket.io |
| MySQL    | mysql:8.0     | 3307      | Database                |

🧠 How It Works

1) Inserts random speed data (0–179 km/h) into MySQL every 1 second.

2) Backend (Node.js) fetches the latest speed and emits it via Socket.io to all connected clients.

3) Frontend (React) connects through WebSocket and updates the live speedometer instantly.

🧱 Strategy & Key Design Decisions

🔹 Real-Time Communication

Used Socket.io for live data push instead of polling.
Ensures the frontend receives updates instantly without extra network load.

🔹 Multi-Container Setup

Frontend, backend, and database isolated into separate containers.

Simplifies scaling and maintenance.


🔹 Data Flow

1) Generate random speed using Javascript and then emit it to frontend using websockets.
2) Then save the speed in the Database.
3) React updates speedometer instantly.

🔹 Scalability

1) Independent containerization allows horizontal scaling (e.g., multiple Node.js instances behind a load balancer).

2) Easily deployable to AWS ECS, Azure Container Apps, or Render.


🧭 Challenges Addressed & Opportunities

 * Challenges
 
1) Building real-time data flow between frontend and backend.

2) Managing multi-container communication.

3) Ensuring consistent setup across systems.

* Opportunities

1) Scalable  architecture.

2) Demonstrates practical DevOps (Docker) knowledge.

3) Easily extendable for analytics dashboards or IoT sensor data.


