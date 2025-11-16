import mysql from "mysql2";
import dotenv from "dotenv";
import { initializeSchema } from "./Schema.js";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD , // your MySQL password
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: process.env.DB_PASSWORD, // your MySQL password
// });

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,       // 'db' (from docker-compose)
//   user: process.env.DB_USER,       // 'user'
//   password: process.env.DB_PASSWORD, // 'password'
//   database: process.env.DB_NAME,     // 'mydatabase'
//   port: process.env.DB_PORT || 3306, // optional but good practice
// });

// Connect and log
// Step 2️⃣ Connect to MySQL server
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }

  console.log("Connected to MySQL server");

  // Step 3️⃣ Create the database if it doesn’t exist
  const dbName = process.env.DB_NAME || "speeddb";
  db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log(`Database '${dbName}' is ready!`);

    // Step 4️⃣ Switch to that database
    db.changeUser({ database: dbName }, (err) => {
      if (err) {
        console.error("Failed to switch to database:", err);
        return;
      }

      console.log(`Now using database '${dbName}'`);

      // Step 5️⃣ Initialize tables/schema
      initializeSchema(db);
    });
  });
});

export default db;
