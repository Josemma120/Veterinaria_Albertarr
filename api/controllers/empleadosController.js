import { EmpleadosModel } from "../models/empleadosModel.js";

export const EmpleadosController = {
  async list(req, res) {
    try {
      const rows = await EmpleadosModel.all();
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al listar empleados" });
    }
  },

  async create(req, res) {
    try {
      const row = await EmpleadosModel.create(req.body);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear empleado" });
    }
  },

  async update(req, res) {
    try {
      await EmpleadosModel.update(req.params.id, req.body);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar empleado" });
    }
  },

  async remove(req, res) {
    try {
      await EmpleadosModel.remove(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar empleado" });
    }
  }
};
