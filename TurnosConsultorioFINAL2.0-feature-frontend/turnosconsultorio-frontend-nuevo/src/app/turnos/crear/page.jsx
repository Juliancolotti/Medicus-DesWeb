"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { crearTurno } from "@/services/turnoService.js";
import { getPacientes } from "@/services/pacienteService.js";

export default function CrearTurno() {
  const router = useRouter();

  // Estados del formulario
  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Lista de pacientes
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    getPacientes()
      .then(setPacientes)
      .catch((err) => console.error("Error al obtener pacientes:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearTurno({
        pacienteId,
        fecha,
        hora: hora.length === 5 ? `${hora}:00` : hora,
        descripcion,
      });

      router.push("/turnos");
    } catch (error) {
      alert("Ocurrió un error al guardar el turno.");
      console.error(error);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Turno</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <select
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          className="border p-2 bg-white text-black rounded"
          required
        >
          <option value="">Seleccionar Paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="border p-2"
          required
        />

        <input
          type="text"
          placeholder="Motivo (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Guardar Turno
        </button>
      </form>
    </main>
  );
}
