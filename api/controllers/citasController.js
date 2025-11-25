import { CitasModel } from "../models/citasModel.js";

export const CitasController = {
  async list(req, res) {
    try {
      const rows = await CitasModel.all();
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al listar citas" });
    }
  },

  async create(req, res) {
    try {
      const row = await CitasModel.create(req.body);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear cita" });
    }
  },

  async update(req, res) {
    try {
      const { hora, fecha, estado, veterinarioId } = req.body;
      const dataToUpdate = { hora, fecha, estado, veterinarioId };

      // Filter out undefined values to avoid overwriting existing data with null
      Object.keys(dataToUpdate).forEach(key => dataToUpdate[key] === undefined && delete dataToUpdate[key]);

      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "No fields to update provided." });
      }

      await CitasModel.update(req.params.id, dataToUpdate);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar cita" });
    }
  },

  async remove(req, res) {
    try {
      await CitasModel.remove(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar cita" });
    }
  }
};
