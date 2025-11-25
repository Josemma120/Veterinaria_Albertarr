import { db } from "../config/db.js";

export const CitasModel = {
  all() {
    return new Promise((res, rej) => {
      const sql = `
        SELECT 
          c.*,
          m.nombre as mascotaNombre,
          cl.nombre as clienteNombre,
          s.nombre as servicioNombre,
          e.nombre as veterinarioNombre
        FROM citas c
        LEFT JOIN mascotas m ON c.mascotaId = m.id
        LEFT JOIN clientes cl ON c.clienteId = cl.id
        LEFT JOIN servicios s ON c.servicioId = s.id
        LEFT JOIN empleados e ON c.veterinarioId = e.id
      `;
      db.query(sql, (e, r) => e ? rej(e) : res(r));
    });
  },

  create(data) {
    const row = {
      id: data.id,
      mascotaId: data.mascotaId,
      servicioId: data.servicioId,
      veterinarioId: data.veterinarioId,
      clienteId: data.clienteId,
      fecha: data.fecha,
      hora: data.hora,
      horaTermino: data.horaTermino ?? null,
      duracion: data.duracion,
      estado: data.estado ?? "activa",
      notas: data.notas ?? null
    };
    return new Promise((res, rej) => {
      db.query("INSERT INTO citas SET ?", row, (e) => e ? rej(e) : res(row));
    });
  },

  update(id, data) {
    return new Promise((res, rej) => {
      db.query("UPDATE citas SET ? WHERE id = ?", [data, id], (e, r) => e ? rej(e) : res(r));
    });
  },

  remove(id) {
    return new Promise((res, rej) => {
      db.query("DELETE FROM citas WHERE id = ?", [id], (e, r) => e ? rej(e) : res(r));
    });
  }
};
