import { db } from './config/db.js';

db.query('DESCRIBE mascotas', (err, cols) => {
  if(err) {
    console.log('Error:', err.message);
  } else {
    console.log('Estructura de mascotas:');
    cols.forEach(c => console.log('  ', c.Field, '-', c.Type));
    
    const hasImage = cols.find(c => c.Field === 'image');
    if (!hasImage) {
      console.log('\nAñadiendo columna image...');
      db.query('ALTER TABLE mascotas ADD COLUMN image LONGTEXT NULL;', (err) => {
        if (err) console.error('Error:', err.message);
        else console.log('✓ Columna image agregada');
        process.exit(0);
      });
    } else {
      console.log('\n✓ Columna image ya existe');
      process.exit(0);
    }
  }
});
