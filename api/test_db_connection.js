import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

async function testConnection() {
    console.log("Intentando conectar a la base de datos Aiven...");
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`SSL: ${process.env.DB_SSL}`);

    const sslOptions = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: sslOptions
        });

        console.log("¡CONEXIÓN EXITOSA! ✅");
        console.log("La base de datos está respondiendo correctamente.");
        await connection.end();
    } catch (error) {
        console.error("ERROR DE CONEXIÓN ❌:", error.message);
        if (error.code === 'HANDSHAKE_SSL_ERROR') {
            console.error("Posible problema con SSL/Certificados.");
        }
    }
}

testConnection();
