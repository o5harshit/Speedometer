import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import SpeedRoutes from "./Routes/SpeedRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Speed Meter Server is running");
});


app.use("/api/speed",SpeedRoutes);


setInterval(async () => {
  const randomSpeed = Math.floor(Math.random() * 180);
  try {
    await axios.post(process.env.INSERT_SPEED_ROUTE, { speed: randomSpeed });
  } catch (error) {
    console.error("Failed to send fake speed:", error);
  }
}, 1000);

