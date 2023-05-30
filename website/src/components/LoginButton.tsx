'use client';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginButton({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <div className="flex flex-row gap-2 items-center justify-center">
          <Link
            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
            href="/dashboard"
          >
            Mi perfil
          </Link>
          <button
            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
            onClick={() => signOut().then(() => window.location.reload())}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button
          className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
          onClick={() => signIn('infojobs')}
        >
          Iniciar sesión
        </button>
      )}
    </>
  );
}
