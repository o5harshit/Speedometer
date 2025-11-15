import db from "../db/connection.js";
import { io } from "../index.js";

export const saveSpeed = (req, res) => {
  const { speed } = req.body;

  // 1. Validate input
  if (speed === undefined || isNaN(speed)) {
    return res.status(400).json({ error: "Invalid speed value" });
  }

  const sql = "INSERT INTO speed_data (speed) VALUES (?)";

  // 2. Insert into DB
  db.query(sql, [speed], (err) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    // 3. Try to emit socket event safely
    try {
      if (io && io.emit) {
        io.emit("newSpeed", speed);
      } else {
        console.warn("Socket instance not available.");
      }
    } catch (socketError) {
      console.error("Socket emit failed:", socketError.message);
    }

    //  4. Send success response to client
    res.json({ message: "Speed data inserted successfully", speed });
  });
}


