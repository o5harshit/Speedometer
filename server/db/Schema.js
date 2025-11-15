// db/schema.js
export const initializeSchema = (db) => {
  const createSpeedTable = `
    CREATE TABLE IF NOT EXISTS speed_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      speed FLOAT NOT NULL,
      recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createSpeedTable, (err) => {
    if (err) {
      console.error("Failed to create 'speed_data' table:", err);
    } else {
      console.log("Table 'speed_data' is ready!");
    }
  });
};
