import { db } from './config/db.js';

// Primero, ver la estructura actual
db.query('DESCRIBE usuarios', (err, cols) => {
  if (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
  console.log('Estructura actual de usuarios:');
  cols.forEach(col => console.log('  -', col.Field, col.Type));
  
  // Ahora modificar la tabla
  const queries = [
    'ALTER TABLE usuarios DROP COLUMN username;',
    'ALTER TABLE usuarios DROP COLUMN nombre;',
    'ALTER TABLE usuarios ADD COLUMN nombre VARCHAR(100) NOT NULL AFTER id;',
    'ALTER TABLE usuarios ADD COLUMN rol VARCHAR(50) NOT NULL AFTER nombre;',
    'TRUNCATE TABLE usuarios;',
    "INSERT INTO usuarios (nombre, rol, password) VALUES ('Isaac', 'Administrador', '123456');",
    "INSERT INTO usuarios (nombre, rol, password) VALUES ('Emmanuel', 'Secretario', '123456');"
  ];
  
  let completed = 0;
  queries.forEach((query, i) => {
    setTimeout(() => {
      db.query(query, (err) => {
        if (err) {
          console.error('Error en query', i, ':', err.message);
        } else {
          console.log('✓ Query', i+1, 'ejecutada:', query.substring(0, 50) + '...');
        }
        completed++;
        if (completed === queries.length) {
          setTimeout(() => {
            db.query('SELECT * FROM usuarios', (err, rows) => {
              console.log('\nUsuarios finales:');
              console.log(JSON.stringify(rows, null, 2));
              process.exit(0);
            });
          }, 500);
        }
      });
    }, i * 300);
  });
});
