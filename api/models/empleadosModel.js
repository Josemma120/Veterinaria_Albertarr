import { db } from "../config/db.js";

export const EmpleadosModel = {
  all() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM empleados", (e, r) => e ? rej(e) : res(r));
    });
  },

  create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      apP: data.apP ?? null,
      apM: data.apM ?? null,
      puesto: data.puesto,
      telefono: data.telefono,
      email: data.email,
      horario: data.horario ?? null,
      sueldo: data.sueldo ?? null,
      nss: data.nss ?? null
    };
    return new Promise((res, rej) => {
      db.query("INSERT INTO empleados SET ?", row, (e) => e ? rej(e) : res(row));
    });
  },

  update(id, data) {
    const row = {
      nombre: data.nombre,
      apP: data.apP ?? null,
      apM: data.apM ?? null,
      puesto: data.puesto,
      telefono: data.telefono,
      email: data.email,
      horario: data.horario ?? null,
      sueldo: data.sueldo ?? null,
      nss: data.nss ?? null
    };
    return new Promise((res, rej) => {
      db.query("UPDATE empleados SET ? WHERE id = ?", [row, id], (e, r) => e ? rej(e) : res(r));
    });
  },

  remove(id) {
    return new Promise((res, rej) => {
      db.query("DELETE FROM empleados WHERE id = ?", [id], (e, r) => e ? rej(e) : res(r));
    });
  }
};

