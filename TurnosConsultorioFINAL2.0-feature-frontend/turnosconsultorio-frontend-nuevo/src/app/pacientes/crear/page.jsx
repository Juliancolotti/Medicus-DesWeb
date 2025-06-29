"use client";
import { useState } from "react";
import { crearPaciente } from "@/services/pacienteService.js";
import { useRouter } from "next/navigation";

export default function CrearPaciente() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre || !apellido || !dni) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^\d{8}$/.test(dni)) {
      setError("El DNI debe tener exactamente 8 cifras numéricas.");
      return;
    }
    try {
      await crearPaciente({ nombre, apellido, dni });
      router.push("/pacientes");
    } catch (err) {
      setError("Hubo un error al guardar el paciente.");
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Agregar Paciente</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}
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
            placeholder="DNI (8 cifras)"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow font-semibold"
          >
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
}
