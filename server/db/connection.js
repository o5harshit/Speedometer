import mysql from "mysql2";
import dotenv from "dotenv";
import { initializeSchema } from "./Schema.js";

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: process.env.DB_PASSWORD,      // your MySQL password
  database: process.env.DB_NAME // your database name
});

// Connect and log
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
    initializeSchema(db);
  }
});


export default db;
