-- Agregar columna image a la tabla servicios
ALTER TABLE servicios
  ADD COLUMN IF NOT EXISTS image VARCHAR(255) NULL AFTER duracion;

-- Descripción:
-- image: ruta relativa a la imagen representativa del servicio
