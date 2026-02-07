import { db } from "../config/db.js";

export const MascotasModel = {
  async all() {
    return await db.query("SELECT * FROM mascotas");
  },

  async create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      especie: data.especie,
      raza: data.raza,
      sexo: data.sexo,
      peso: data.peso,
      duenoId: data.duenoId || null,
      image: data.image ?? null
    };
    await db.query("INSERT INTO mascotas SET ?", row);
    return row;
  },

  async update(id, data) {
    const row = {
      nombre: data.nombre,
      especie: data.especie,
      raza: data.raza,
      sexo: data.sexo,
      peso: data.peso,
      duenoId: data.duenoId || null,
      image: data.image ?? null
    };
    return await db.query("UPDATE mascotas SET ? WHERE id = ?", [row, id]);
  },

  async remove(id) {
    return await db.query("DELETE FROM mascotas WHERE id = ?", [id]);
  }
};
