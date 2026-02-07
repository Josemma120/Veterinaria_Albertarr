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

// Servir archivos estáticos del frontend (subir un nivel desde 'api')
const frontendPath = path.join(process.cwd(), '../');

// Seguridad: Bloquear acceso a carpetas sensibles del backend si se intentan acceder como estáticos
app.use((req, res, next) => {
    const forbidden = ['/api', '/node_modules', '/.env', '/.git'];
    if (forbidden.some(f => req.path.startsWith(f))) {
        return res.status(403).send('Forbidden');
    }
    next();
});

app.use(express.static(frontendPath));

// Rutas para las páginas principales (SPA-like o multipage)
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});

// Para cualquier otra ruta no api, intentar servir el index o login si es SPA, 
// o dejar que el static middleware maneje los archivos (.html, .js, .css)
// Si no se encuentra, caerá en el 404 de abajo.

// 404
app.use((req, res) => res.status(404).json({ error: "No encontrado" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
