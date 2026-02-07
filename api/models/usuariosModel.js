import { db } from "../config/db.js";

export const UsuariosModel = {
  async findByUsername(username) {
    console.log(`[MODEL] Buscando usuario: ${username}`);
    try {
      const rows = await db.query(
        "SELECT * FROM usuarios WHERE nombre = ?",
        [username]
      );
      console.log(`[MODEL] Resultado búsqueda: ${rows ? rows.length : 0} encontrados`);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error(`[MODEL ERROR] Error buscando usuario ${username}:`, err);
      throw err;
    }
  }
};
