"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-900 transition font-medium ${
      pathname === path
        ? "bg-blue-200 text-blue-900 shadow"
        : "text-gray-700"
    }`;

  return (
    <nav className="bg-white text-gray-900 shadow-md mb-8">
      <div className="px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700 tracking-tight">
          Medicus
        </Link>
        <div className="flex gap-4">
          <Link href="/" className={linkClasses("/")}>
            Inicio
          </Link>
          <Link href="/pacientes" className={linkClasses("/pacientes")}>
            Pacientes
          </Link>
          <Link href="/turnos" className={linkClasses("/turnos")}>
            Turnos
          </Link>
        </div>
      </div>
    </nav>
  );
}