import { db } from "./config/db.js";

db.query("SELECT * FROM usuarios LIMIT 1", (err, results) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Estructura del usuario:");
    console.log(JSON.stringify(results[0], null, 2));
    console.log("\nCampos disponibles:");
    console.log(Object.keys(results[0]));
  }
  process.exit(0);
});
