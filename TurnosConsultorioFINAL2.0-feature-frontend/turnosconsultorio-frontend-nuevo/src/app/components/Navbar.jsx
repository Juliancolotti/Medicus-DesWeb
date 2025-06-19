"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path) =>
    `px-4 py-2 rounded hover:bg-gray-700 transition ${
      pathname === path
        ? "bg-gray-800 text-white font-semibold"
        : "text-gray-300"
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-md mb-6">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          TurnosConsultorio
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
