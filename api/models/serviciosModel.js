import { db } from "../config/db.js";

export const ServiciosModel = {
  all() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM servicios", (e, r) => {
        if (e) return rej(e);
        // Parse encargadosIds
        const rows = r.map(row => ({
          ...row,
          encargadosIds: row.encargadosIds ? JSON.parse(row.encargadosIds) : []
        }));
        res(rows);
      });
    });
  },

  create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      duracion: data.duracion ?? null,
      precio: data.precio,
      encargadosIds: JSON.stringify(data.encargadosIds || [])
    };
    return new Promise((res, rej) => {
      db.query("INSERT INTO servicios SET ?", row, (e) => e ? rej(e) : res(row));
    });
  },

  update(id, data) {
    const row = {
      nombre: data.nombre,
      duracion: data.duracion ?? null,
      precio: data.precio,
      encargadosIds: JSON.stringify(data.encargadosIds || [])
    };
    return new Promise((res, rej) => {
      db.query("UPDATE servicios SET ? WHERE id = ?", [row, id], (e, r) => e ? rej(e) : res(r));
    });
  },

  remove(id) {
    return new Promise((res, rej) => {
      db.query("DELETE FROM servicios WHERE id = ?", [id], (e, r) => e ? rej(e) : res(r));
    });
  }
};
