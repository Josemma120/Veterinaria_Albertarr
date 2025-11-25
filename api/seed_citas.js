import "./config/db.js";
import { db } from "./config/db.js";

// Datos de prueba para citas
const citasData = [
  {
    id: "CT001",
    mascotaId: "MC445",
    clienteId: "CL297",
    servicioId: "SR253",
    veterinarioId: "EM635",
    fecha: "2025-01-20",
    hora: "09:00",
    duracion: 30,
    estado: "confirmada",
    notas: "Consulta general"
  },
  {
    id: "CT002",
    mascotaId: "MC445",
    clienteId: "CL297",
    servicioId: "SR178",
    veterinarioId: "EM635",
    fecha: "2025-01-21",
    hora: "14:00",
    duracion: 45,
    estado: "programada",
    notas: "Vacunación"
  }
];

async function seedCitas() {
  try {
    console.log("Insertando citas de prueba...");
    
    for (const cita of citasData) {
      db.query("INSERT INTO citas SET ?", cita, (err) => {
        if (err) {
          console.log(`⚠️  Cita ${cita.id} podría existir:`, err.message);
        } else {
          console.log(`✓ Cita ${cita.id} insertada`);
        }
      });
    }
    
    setTimeout(() => {
      console.log("✓ Proceso completado");
      process.exit(0);
    }, 1000);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

seedCitas();
