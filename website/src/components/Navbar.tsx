import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import LoginButton from "./LoginButton";

export async function Navbar() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <div className="w-full mx-auto px-4 sm:px-6">
      <nav className="w-1/2 mx-auto flex items-center justify-between px-4 py-3 bg-gray-800/40 rounded-b-lg shadow-lg border-gray-400/10 border z-[999] backdrop-filter backdrop-blur-lg">
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full">
            <a href="/">
              <span className="sr-only">JobCompass</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
            <LoginButton session={session} />
          </div>
        </div>
      </nav>
    </div>
  );
}
