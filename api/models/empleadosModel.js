import { db } from "../config/db.js";

export const EmpleadosModel = {
  async all() {
    return await db.query("SELECT * FROM empleados");
  },

  async create(data) {
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
    await db.query("INSERT INTO empleados SET ?", row);
    return row;
  },

  async update(id, data) {
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
    return await db.query("UPDATE empleados SET ? WHERE id = ?", [row, id]);
  },

  async remove(id) {
    return await db.query("DELETE FROM empleados WHERE id = ?", [id]);
  }
};

