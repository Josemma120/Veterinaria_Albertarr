import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import mascotasRoutes from "./routes/mascotasRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import serviciosRoutes from "./routes/serviciosRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Servir archivos estáticos subidos
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Rutas API
app.use("/auth", authRoutes);
app.use("/clientes", clientesRoutes);
app.use("/mascotas", mascotasRoutes);
app.use("/empleados", empleadosRoutes);
app.use("/servicios", serviciosRoutes);
app.use("/citas", citasRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "No encontrado" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
