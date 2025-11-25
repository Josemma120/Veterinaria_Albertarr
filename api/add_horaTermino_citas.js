import { db } from './config/db.js';

const query = 'ALTER TABLE citas ADD COLUMN horaTermino TIME NULL AFTER hora;';

db.query(query, (err) => {
    if (err && err.message.includes('Duplicate')) {
        console.log('✓ Campo horaTermino ya existe');
    } else if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('✓ Campo horaTermino agregado');
    }

    db.query('DESCRIBE citas', (err, cols) => {
        console.log('\nEstructura final de citas:');
        cols.forEach(c => console.log('  ', c.Field, '-', c.Type));
        process.exit(0);
    });
});
