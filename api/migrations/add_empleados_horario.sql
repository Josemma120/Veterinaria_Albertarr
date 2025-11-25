-- Agregar columna horario a la tabla empleados
ALTER TABLE empleados
  ADD COLUMN IF NOT EXISTS horario VARCHAR(255) NULL AFTER sueldo;

-- horario: texto libre con el horario del empleado (ej. "Lun-Vie 9:00-18:00")
