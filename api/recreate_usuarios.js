import { db } from './config/db.js';

// Recrear la tabla completamente
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

let completed = 0;
queries.forEach((query, i) => {
  setTimeout(() => {
    db.query(query, (err) => {
      if (err) {
        console.error('Error en query', i+1, ':', err.message);
      } else {
        console.log('✓ Query', i+1, 'ejecutada');
      }
      completed++;
      if (completed === queries.length) {
        setTimeout(() => {
          db.query('SELECT * FROM usuarios', (err, rows) => {
            console.log('\nUsuarios finales:');
            console.log(JSON.stringify(rows, null, 2));
            process.exit(0);
          });
        }, 300);
      }
    });
  }, i * 300);
});
