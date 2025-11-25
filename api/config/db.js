import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",              // pon la tuya
  database: "veterinaria_mvc"
});

db.connect(err => {
  if (err) console.error("Error MySQL:", err.message);
  else console.log("MySQL conectado");
});
