"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 text-gray-900 flex flex-col items-center justify-center p-10">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-800 text-center">
          Sistema de Turnos del Consultorio
        </h1>
        <p className="mb-10 text-gray-600 text-center">
          Seleccioná una sección para comenzar:
        </p>
        <div className="flex flex-col gap-4 w-full">
          <Link
            href="/pacientes"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg text-lg font-medium text-white text-center shadow transition"
          >
            📋 Gestión de Pacientes
          </Link>
          <Link
            href="/turnos"
            className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-lg text-lg font-medium text-white text-center shadow transition"
          >
            🗓️ Gestión de Turnos
          </Link>
        </div>
      </div>
    </main>
  );
}