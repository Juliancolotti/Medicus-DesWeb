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
      const turnoPayload = {
        pacienteId,
        fecha,
        hora,
        descripcion,
      };

      console.log("Turno enviado al backend:", turnoPayload); // 👀

      await actualizarTurno(id, turnoPayload);
      router.push("/turnos");
    } catch (error) {
      console.error("Error al actualizar turno:", error);
      alert("Error al actualizar el turno");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Turno</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <select
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          className="border p-2 text-black"
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
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}
