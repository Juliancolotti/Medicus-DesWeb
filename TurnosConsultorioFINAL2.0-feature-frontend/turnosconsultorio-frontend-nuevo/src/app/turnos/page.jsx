"use client";
import { useEffect, useState } from "react";
import { getTurnos } from "@/services/turnoService.js";
import { getPacientes } from "@/services/pacienteService.js";
import Link from "next/link";
import { eliminarTurno } from "@/services/turnoService.js";

export default function TurnosPage() {
  const [turnos, setTurnos] = useState([]);

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de que querés eliminar este turno?")) {
      try {
        await eliminarTurno(id);
        setTurnos(turnos.filter((t) => t.id !== id)); // actualiza la lista
      } catch (err) {
        alert("Error al eliminar el turno");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const turnos = await getTurnos();
        const pacientes = await getPacientes();

        // Agregamos el nombre del paciente al turno
        const turnosConNombres = turnos.map((turno) => {
          const paciente = pacientes.find((p) => p.id === turno.pacienteId);
          return {
            ...turno,
            nombrePaciente: paciente
              ? `${paciente.nombre} ${paciente.apellido}`
              : "Desconocido",
          };
        });

        setTurnos(turnosConNombres);
      } catch (error) {
        console.error("Error al obtener turnos o pacientes:", error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <main className="p-6 min-h-screen bg-black text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Listado de Turnos</h1>
        <Link
          href="/turnos/crear"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Nuevo Turno
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="w-full text-left table-auto border border-gray-500">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Acciones</th>
              <th className="px-4 py-2">Motivo</th>
            </tr>
          </thead>

          <tbody>
            {turnos.map((turno) => (
              <tr
                key={turno.id}
                className="border-t border-gray-600 hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{turno.nombrePaciente}</td>
                <td className="px-4 py-2">
                  {new Date(turno.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{turno.hora}</td>
                <td className="px-4 py-2">{turno.descripcion || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    href={`/turnos/editar/${turno.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(turno.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
