"use client";
import { useState } from "react";
import { crearPaciente } from "@/services/pacienteService.js"; // Asegurate de que sea .js
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

    // Validación
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
      router.push("/pacientes"); // Redirige al listado
    } catch (err) {
      console.error("Error al crear paciente:", err);
      setError("Hubo un error al guardar el paciente.");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Agregar Paciente</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          className="border p-2"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="DNI (8 cifras)"
          className="border p-2"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}
