import { ServiciosModel } from "../models/serviciosModel.js";

export const ServiciosController = {
  async list(req, res) {
    try {
      const rows = await ServiciosModel.all();
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al listar servicios" });
    }
  },

  async create(req, res) {
    try {
      const row = await ServiciosModel.create(req.body);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear servicio" });
    }
  },

  async update(req, res) {
    try {
      await ServiciosModel.update(req.params.id, req.body);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar servicio" });
    }
  },

  async remove(req, res) {
    try {
      await ServiciosModel.remove(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar servicio" });
    }
  }
};
