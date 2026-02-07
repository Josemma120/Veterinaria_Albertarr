import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const sslOptions = process.env.DB_SSL_CA_PATH
  ? { ca: fs.readFileSync(path.resolve(process.env.DB_SSL_CA_PATH)) }
  : (process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql-c5b3d5e-gomezbj206-da13.g.aivencloud.com",
  port: parseInt(process.env.DB_PORT || "27854", 10),
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "defaultdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslOptions
});

export const db = {
  query: async (sql, params = []) => {
    const [rows] = await pool.query(sql, params);
    return rows;
  },
  pool
};

pool.getConnection()
  .then(conn => {
    conn.release();
    console.log("MySQL pool conectado (SSL:", !!sslOptions, ")");
  })
  .catch(err => console.error("Error MySQL:", err.message));
