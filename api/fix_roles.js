import { db } from './config/db.js';

const updates = [
  "UPDATE usuarios SET rol = 'Administrador' WHERE nombre = 'Isaac';",
  "UPDATE usuarios SET rol = 'Secretario' WHERE nombre = 'Emmanuel';"
];

let completed = 0;
updates.forEach((query, i) => {
  db.query(query, (err) => {
    if (err) console.error('Error:', err.message);
    else console.log('✓ Actualizado');
    completed++;
    if (completed === updates.length) {
      db.query('SELECT * FROM usuarios', (err, rows) => {
        console.log('\nUsuarios finales:');
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
      });
    }
  });
});
