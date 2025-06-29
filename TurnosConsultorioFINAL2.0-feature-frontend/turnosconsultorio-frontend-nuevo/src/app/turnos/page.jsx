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
        setTurnos(turnos.filter((t) => t.id !== id));
      } catch (err) {
        alert("Error al eliminar el turno");
      }
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const turnos = await getTurnos();
        const pacientes = await getPacientes();
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
    <main className="p-6 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Listado de Turnos</h1>
        <Link
          href="/turnos/crear"
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded shadow"
        >
          + Nuevo Turno
        </Link>
      </div>
      <div className="overflow-x-auto rounded-md bg-white shadow">
        <table className="w-full text-left table-auto border border-gray-200">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Motivo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr
                key={turno.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
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
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(turno.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-900 hover:shadow-lg transition cursor-pointer"
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