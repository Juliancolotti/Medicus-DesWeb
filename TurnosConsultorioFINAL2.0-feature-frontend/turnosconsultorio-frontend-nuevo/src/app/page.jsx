"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Sistema de Turnos del Consultorio
      </h1>
      <p className="mb-10 text-gray-300">
        Seleccioná una sección para comenzar:
      </p>

      <div className="flex flex-col gap-4">
        <Link
          href="/pacientes"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded text-lg font-medium text-center"
        >
          📋 Gestión de Pacientes
        </Link>
        <Link
          href="/turnos"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded text-lg font-medium text-center"
        >
          🗓️ Gestión de Turnos
        </Link>
      </div>
    </main>
  );
}
