import { db } from './config/db.js';

db.query('DESCRIBE empleados', (err, cols) => {
  if(err) {
    console.log('Error:', err.message);
    process.exit(1);
  }
  console.log('Estructura actual de empleados:');
  cols.forEach(c => console.log('  ', c.Field, '-', c.Type));
  
  const fields = cols.map(c => c.Field);
  const missing = ['horario', 'sueldo', 'nss', 'curp'].filter(f => !fields.includes(f));
  
  if (missing.length > 0) {
    console.log('\nAgregando campos faltantes:', missing.join(', '));
    const queries = [
      'ALTER TABLE empleados ADD COLUMN horario LONGTEXT NULL;',
      'ALTER TABLE empleados ADD COLUMN sueldo VARCHAR(50) NULL;',
      'ALTER TABLE empleados ADD COLUMN nss VARCHAR(50) NULL;',
      'ALTER TABLE empleados ADD COLUMN curp VARCHAR(50) NULL;'
    ];
    
    let done = 0;
    queries.forEach((query, i) => {
      db.query(query, (err) => {
        if (err) console.error('Error en query', i, ':', err.message);
        else console.log('✓ Query', i+1, 'ejecutada');
        done++;
        if (done === queries.length) {
          db.query('DESCRIBE empleados', (err, cols) => {
            console.log('\nEstructura final:');
            cols.forEach(c => console.log('  ', c.Field, '-', c.Type));
            process.exit(0);
          });
        }
      });
    });
  } else {
    console.log('\n✓ Todos los campos ya existen');
    process.exit(0);
  }
});
