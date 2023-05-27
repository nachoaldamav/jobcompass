import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import LoginButton from './LoginButton';
import Image from 'next/image';

export async function Navbar() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <div className='w-full mx-auto z-[999] absolute top-0'>
      <nav className='w-3/4 px-10 sm:px-6 mx-auto flex items-center justify-between py-3 bg-gray-800/40 rounded-b-lg shadow-lg border-gray-400/10 border z-[999] backdrop-filter backdrop-blur-lg'>
        <div className='flex items-center flex-1'>
          <div className='flex items-center justify-between w-full'>
            <Link
              href='/'
              className='inline-flex items-center gap-2 justify-start'
            >
              <span className='sr-only'>JobCompass</span>
              <Image
                src='/logo.png'
                alt='JobCompass'
                width={40}
                height={40}
                className='h-8 w-auto sm:h-10'
              />
              <h1 className='text-2xl font-bold text-white ml-2'>JobCompass</h1>
            </Link>
            <LoginButton session={session} />
          </div>
        </div>
      </nav>
    </div>
  );
}
