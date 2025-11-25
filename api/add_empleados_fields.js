import { db } from './config/db.js';

const queries = [
  'ALTER TABLE empleados ADD COLUMN horario LONGTEXT NULL;',
  'ALTER TABLE empleados ADD COLUMN sueldo VARCHAR(50) NULL;',
  'ALTER TABLE empleados ADD COLUMN nss VARCHAR(50) NULL;',
  'ALTER TABLE empleados ADD COLUMN curp VARCHAR(50) NULL;'
];

let done = 0;
queries.forEach((query, i) => {
  db.query(query, (err) => {
    if (err && err.message.includes('Duplicate')) {
      console.log('✓ Campo', i+1, 'ya existe');
    } else if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('✓ Campo', i+1, 'agregado');
    }
    done++;
    if (done === queries.length) {
      db.query('DESCRIBE empleados', (err, cols) => {
        console.log('\nEstructura final de empleados:');
        cols.forEach(c => console.log('  ', c.Field, '-', c.Type));
        process.exit(0);
      });
    }
  });
});
