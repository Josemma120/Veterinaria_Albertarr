import { db } from "../config/db.js";

export const ServiciosModel = {
  async all() {
    const rows = await db.query("SELECT * FROM servicios");
    return rows.map(row => ({
      ...row,
      encargadosIds: row.encargadosIds ? JSON.parse(row.encargadosIds) : []
    }));
  },

  async create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      duracion: data.duracion ?? null,
      precio: data.precio,
      encargadosIds: JSON.stringify(data.encargadosIds || [])
    };
    await db.query("INSERT INTO servicios SET ?", row);
    return row;
  },

  async update(id, data) {
    const row = {
      nombre: data.nombre,
      duracion: data.duracion ?? null,
      precio: data.precio,
      encargadosIds: JSON.stringify(data.encargadosIds || [])
    };
    return await db.query("UPDATE servicios SET ? WHERE id = ?", [row, id]);
  },

  async remove(id) {
    return await db.query("DELETE FROM servicios WHERE id = ?", [id]);
  }
};
