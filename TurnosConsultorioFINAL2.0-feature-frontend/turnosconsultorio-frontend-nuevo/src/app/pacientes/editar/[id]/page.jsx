"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  obtenerPaciente,
  actualizarPaciente,
} from "@/services/pacienteService.js";

export default function EditarPaciente() {
  const router = useRouter();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        const data = await obtenerPaciente(id);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setDni(data.dni);
      } catch (err) {
        console.error("Error al cargar paciente:", err);
      }
    };
    cargarPaciente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarPaciente(id, { nombre, apellido, dni });
      router.push("/pacientes");
    } catch (err) {
      console.error("Error al actualizar paciente:", err);
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Editar Paciente</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="DNI"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
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
