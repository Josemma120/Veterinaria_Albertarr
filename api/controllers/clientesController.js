import { ClientesModel } from "../models/clientesModel.js";

export const ClientesController = {
  async list(req, res) {
    try {
      const rows = await ClientesModel.all();
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al listar clientes" });
    }
  },

  async create(req, res) {
    try {
      const row = await ClientesModel.create(req.body);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear cliente" });
    }
  },

  async update(req, res) {
    try {
      await ClientesModel.update(req.params.id, req.body);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar cliente" });
    }
  },

  async remove(req, res) {
    try {
      await ClientesModel.remove(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar cliente" });
    }
  }
};
