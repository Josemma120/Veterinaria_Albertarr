import { db } from "../config/db.js";

export const ClientesModel = {
  all() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM clientes", (e, r) => e ? rej(e) : res(r));
    });
  },

  create(data) {
    const row = {
      id: data.id,
      nombre: data.nombre,
      apP: data.apP,
      apM: data.apM,
      telefono: data.telefono,
      email: data.email,
      domicilio: data.domicilio
    };
    return new Promise((res, rej) => {
      db.query("INSERT INTO clientes SET ?", row, (e) => e ? rej(e) : res(row));
    });
  },

  update(id, data) {
    const row = {
      nombre: data.nombre,
      apP: data.apP,
      apM: data.apM,
      telefono: data.telefono,
      email: data.email,
      domicilio: data.domicilio
    };
    return new Promise((res, rej) => {
      db.query("UPDATE clientes SET ? WHERE id = ?", [row, id], (e, r) => e ? rej(e) : res(r));
    });
  },

  remove(id) {
    return new Promise((res, rej) => {
      db.query("DELETE FROM clientes WHERE id = ?", [id], (e, r) => e ? rej(e) : res(r));
    });
  }
};
