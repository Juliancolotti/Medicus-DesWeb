"use client";
import { useEffect, useState } from "react";
import { getPacientes } from "@/services/pacienteService.js";
import Link from "next/link";
import { eliminarPaciente } from "@/services/pacienteService.js";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    getPacientes()
      .then((data) => setPacientes(data))
      .catch((err) => console.error("Error al obtener pacientes:", err));
  }, []);

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de que querés eliminar este paciente?")) {
      try {
        await eliminarPaciente(id);
        setPacientes(pacientes.filter((p) => p.id !== id)); // Actualiza la tabla sin recargar
      } catch (err) {
        console.error("Error al eliminar paciente:", err);
        alert("No se pudo eliminar el paciente.");
      }
    }
  };

  return (
    <main className="p-6 min-h-screen bg-black text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Listado de Pacientes</h1>
        <Link
          href="/pacientes/crear"
          className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <span className="text-lg font-semibold">+ Nuevo Paciente</span>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="w-full text-left table-auto border border-gray-500">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">DNI</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-600 hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">{p.apellido}</td>
                <td className="px-4 py-2">{p.dni}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    href={`/pacientes/editar/${p.id}`}
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
