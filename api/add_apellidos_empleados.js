import { db } from './config/db.js';

const queries = [
    'ALTER TABLE empleados ADD COLUMN apP VARCHAR(100) NULL AFTER nombre;',
    'ALTER TABLE empleados ADD COLUMN apM VARCHAR(100) NULL AFTER apP;'
];

let done = 0;
queries.forEach((query, i) => {
    db.query(query, (err) => {
        if (err && err.message.includes('Duplicate')) {
            console.log('✓ Campo', i + 1, 'ya existe');
        } else if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('✓ Campo', i + 1, 'agregado');
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
