import { db } from './config/db.js';

async function recreateUsuarios() {
  console.log("Iniciando recreación de tabla usuarios...");
  const queries = [
    'DROP TABLE IF EXISTS usuarios;',
    `CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      rol VARCHAR(50) NOT NULL,
      password VARCHAR(120) NOT NULL
    );`,
    "INSERT INTO usuarios (nombre, rol, password) VALUES ('Isaac', 'Administrador', '123456');",
    "INSERT INTO usuarios (nombre, rol, password) VALUES ('Emmanuel', 'Secretario', '123456');"
  ];

  try {
    for (const [i, query] of queries.entries()) {
      await db.query(query);
      console.log(`✓ Query ${i + 1} ejecutada`);
    }

    console.log("\nVerificando usuarios creados...");
    const rows = await db.query('SELECT * FROM usuarios');
    console.log('Usuarios finales:');
    console.log(JSON.stringify(rows, null, 2));

  } catch (err) {
    console.error("Error crítico:", err);
  } finally {
    console.log("Cerrando proceso...");
    process.exit(0);
  }
}

recreateUsuarios();
