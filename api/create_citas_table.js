import { db } from './config/db.js';

const query = `
CREATE TABLE IF NOT EXISTS citas (
  id VARCHAR(16) PRIMARY KEY,
  mascotaId VARCHAR(16) NOT NULL,
  servicioId VARCHAR(16) NOT NULL,
  veterinarioId VARCHAR(16) NOT NULL,
  fecha DATE NOT NULL,
  horaInicio TIME NOT NULL,
  duracion INT NOT NULL COMMENT 'Duración en minutos',
  estado VARCHAR(20) DEFAULT 'pendiente' COMMENT 'pendiente, confirmada, completada, cancelada',
  notas LONGTEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mascotaId) REFERENCES mascotas(id) ON DELETE CASCADE,
  FOREIGN KEY (servicioId) REFERENCES servicios(id) ON DELETE CASCADE,
  FOREIGN KEY (veterinarioId) REFERENCES empleados(id) ON DELETE CASCADE
);
`;

db.query(query, (err) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('✓ Tabla citas creada exitosamente');
  }
  process.exit(0);
});
