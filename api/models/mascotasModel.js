import { db } from "../config/db.js";

export const MascotasModel = {
  all() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM mascotas", (e, r) => e ? rej(e) : res(r));
    });
  },

  create(data) {
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
    return new Promise((res, rej) => {
      db.query("INSERT INTO mascotas SET ?", row, (e) => e ? rej(e) : res(row));
    });
  },

  update(id, data) {
    const row = {
      nombre: data.nombre,
      especie: data.especie,
      raza: data.raza,
      sexo: data.sexo,
      peso: data.peso,
      duenoId: data.duenoId || null,
      image: data.image ?? null
    };
    return new Promise((res, rej) => {
      db.query("UPDATE mascotas SET ? WHERE id = ?", [row, id], (e, r) => e ? rej(e) : res(r));
    });
  },

  remove(id) {
    return new Promise((res, rej) => {
      db.query("DELETE FROM mascotas WHERE id = ?", [id], (e, r) => e ? rej(e) : res(r));
    });
  }
};
