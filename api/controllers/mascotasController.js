import { MascotasModel } from "../models/mascotasModel.js";

export const MascotasController = {
  async list(req, res) {
    try {
      const rows = await MascotasModel.all();
      res.json(rows);
    } catch (e) {
      console.error(e);
      import("fs").then(fs => fs.appendFileSync("error.log", e.message + "\n" + e.stack + "\n"));
      res.status(500).json({ error: "Error al crear mascota: " + e.message });
    }
  },

  async create(req, res) {
    try {
      if (req.file) {
        req.body.image = `http://localhost:3000/uploads/${req.file.filename}`;
      }
      const row = await MascotasModel.create(req.body);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear mascota" });
    }
  },

  async update(req, res) {
    try {
      if (req.file) {
        req.body.image = `http://localhost:3000/uploads/${req.file.filename}`;
      }
      await MascotasModel.update(req.params.id, req.body);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al actualizar mascota" });
    }
  },

  async remove(req, res) {
    try {
      await MascotasModel.remove(req.params.id);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al eliminar mascota" });
    }
  }
};
