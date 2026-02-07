import { db } from "../config/db.js";

export const ClientesModel = {
  async all() {
    return await db.query("SELECT * FROM clientes");
  },

  async create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      apP: data.apP,
      apM: data.apM,
      telefono: data.telefono,
      email: data.email,
      domicilio: data.domicilio
    };
    await db.query("INSERT INTO clientes SET ?", row);
    return row;
  },

  async update(id, data) {
    const row = {
      nombre: data.nombre,
      apP: data.apP,
      apM: data.apM,
      telefono: data.telefono,
      email: data.email,
      domicilio: data.domicilio
    };
    return await db.query("UPDATE clientes SET ? WHERE id = ?", [row, id]);
  },

  async remove(id) {
    return await db.query("DELETE FROM clientes WHERE id = ?", [id]);
  }
};
