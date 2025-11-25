-- Agregar columna image a la tabla mascotas
ALTER TABLE mascotas
  ADD COLUMN IF NOT EXISTS image VARCHAR(255) NULL AFTER duenoId;

-- Descripción:
-- image: ruta relativa a la imagen representativa de la mascota
