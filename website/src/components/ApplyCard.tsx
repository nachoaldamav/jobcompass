'use client';
import { applyToOffer } from '@/utils/apply';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function ApplyCard({
  offerId,
}: {
  offerId: string;
}): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <>
      <button
        className='group relative mx-auto w-full overflow-hidden rounded-[16px] bg-gray-300/20 p-[2px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500'
        onClick={async () => {
          setLoading(true);
          const result = await applyToOffer(session.accessToken, offerId);
          if (!result.error) {
            toast.success('¡Aplicación enviada!');
          } else {
            toast.error(result.error);
          }
          setLoading(false);
        }}
      >
        <div className='group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:visible rounded-[50%]'></div>
        <div className='relative rounded-[15px] bg-gray-800 z-[999] p-4 hover:bg-gray-800 font-bold text-white'>
          {!loading ? 'Aplicar ahora 🚀' : 'Enviando...'}
        </div>
      </button>
    </>
  );
}
