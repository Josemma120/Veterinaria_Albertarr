import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

async function listUsers() {
    console.log("Iniciando conexión...");

    const sslOptions = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined;

    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: sslOptions
        });

        console.log("Conectado ✔️. Obteniendo usuarios...");

        // Seleccionamos solo campos relevantes para evitar problemas de buffer o datos binarios
        const [rows] = await connection.execute("SELECT id, nombre, cedula, rol, telefono, email FROM usuarios");

        console.log("\n====== USUARIOS REGISTRADOS ======");
        if (rows.length === 0) {
            console.log("⚠️  No hay usuarios en la base de datos.");
        } else {
            // Formateo simple manual por si console.table falla en buffer
            rows.forEach(u => {
                console.log(`[${u.id}] ${u.nombre} (${u.rol}) - ${u.email || 'Sin email'}`);
            });
        }
        console.log("==================================\n");

    } catch (error) {
        console.error("❌ ERROR AL CONECTAR O CONSULTAR:", error.message);
    } finally {
        if (connection) await connection.end();
        process.exit(0);
    }
}

listUsers();
