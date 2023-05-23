'use client';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginButton({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <div className="flex flex-row gap-2 items-center justify-center">
          <Link
            className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-900 py-2 px-2 border border-white hover:border-transparent rounded"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      ) : (
        <button
          className="bg-transparent hover:bg-white text-white font-semibold hover:text-gray-900 py-2 px-4 border border-white hover:border-transparent rounded"
          onClick={() => signIn('infojobs')}
        >
          Login
        </button>
      )}
    </>
  );
}
