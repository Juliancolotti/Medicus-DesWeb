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
        setPacientes(pacientes.filter((p) => p.id !== id));
      } catch (err) {
        alert("No se pudo eliminar el paciente.");
      }
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Listado de Pacientes</h1>
        <Link
          href="/pacientes/crear"
          className="bg-green-700 hover:bg-green-800 transition-colors text-white px-4 py-2 rounded shadow flex items-center gap-2"
        >
          <span className="text-lg font-semibold">+ Nuevo Paciente</span>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-md bg-white shadow">
        <table className="w-full text-left table-auto border border-gray-200">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">DNI</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">{p.apellido}</td>
                <td className="px-4 py-2">{p.dni}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    href={`/pacientes/editar/${p.id}`}
                    className="bg-yellow-600 text-white px-3 py-1 rounded shadow hover:bg-yellow-700"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(p.id)}
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
