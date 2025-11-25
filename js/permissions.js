const MAP = {
  Administrador: {
    clientes: true,
    mascotas: true,
    servicios: true,
    empleados: true,
    citas: true
  },
  Secretario: {
    clientes: true,
    mascotas: true,
    servicios: true,
    empleados: false,
    citas: true
  },
  Veterinario: {
    clientes: false,
    mascotas: true,
    servicios: false,
    empleados: false,
    citas: true
  }
};

export function can(role, entity) {
  return !!MAP[role]?.[entity];
}
