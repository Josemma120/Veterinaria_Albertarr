import { UsuariosModel } from "../models/usuariosModel.js";

export const AuthController = {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UsuariosModel.findByUsername(username);
      if (!user || user.password !== password) {
        console.warn(`[LOGIN FAIL] Fallo de inicio de sesión para: ${username}`);
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      // aquí no usamos tokens para simplificar: devolvemos datos del usuario
      console.log("Usuario encontrado:", user);
      res.json({ id: user.id, name: user.nombre, role: user.rol });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno" });
    }
  }
};
