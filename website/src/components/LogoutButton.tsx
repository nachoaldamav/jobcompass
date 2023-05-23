'use client';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

export default function LogoutButton({ session }: { session: Session | null }) {
  return (
    <>
      {session && (
        <button
          className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-900 py-2 px-4 border border-white hover:border-transparent rounded"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      )}
    </>
  );
}
