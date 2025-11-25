import { db } from "../config/db.js";

export const UsuariosModel = {
  findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE nombre = ?",
        [username],
        (err, rows) => {
          if (err) {
            console.error("Error en query:", err);
            reject(err);
          } else {
            console.log("Usuario buscado:", username, "Resultado:", rows[0]);
            resolve(rows[0] || null);
          }
        }
      );
    });
  }
};
