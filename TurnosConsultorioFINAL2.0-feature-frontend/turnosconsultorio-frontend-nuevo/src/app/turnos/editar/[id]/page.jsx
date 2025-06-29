"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { actualizarTurno, obtenerTurno } from "@/services/turnoService.js";
import { getPacientes } from "@/services/pacienteService.js";

export default function EditarTurno() {
  const router = useRouter();
  const { id } = useParams();

  const [pacienteId, setPacienteId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    obtenerTurno(id).then((turno) => {
      setPacienteId(turno.pacienteId);
      setFecha(turno.fecha.split("T")[0]);
      setHora(turno.hora.slice(0, 5));
      setDescripcion(turno.descripcion || "");
    });
    getPacientes().then(setPacientes);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarTurno(id, {
        pacienteId,
        fecha,
        hora,
        descripcion,
      });
      router.push("/turnos");
    } catch (error) {
      alert("Error al actualizar el turno");
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Editar Turno</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            className="border border-gray-300 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            required
          />
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            required
          />
          <input
            type="text"
            placeholder="Motivo (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow font-semibold"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </main>
  );
}