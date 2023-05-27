'use client';
import Link from 'next/link';
import { SingleOffer } from '../../types/infojobs/getOffer';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { fetchOffer } from '@/utils/fetchOffer';

type SavedOffersProps = {
  offerData?: {
    offer: SingleOffer;
    AlertId: string;
    OfferId: string;
    CreationDate: string;
    UserId: string;
  };
  offerId: string;
};

export function SavedOffers({ offerId }: SavedOffersProps): React.ReactElement {
  const [offer, setOffer] = useState<SingleOffer | null>(null);

  useEffect(() => {
    fetchOffer(offerId).then((offer) => setOffer(offer));
  }, [offerId]);

  return !offer ? (
    <div className='grid grid-cols-12 gap-4 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out'>
      <div className='animate-pulse rounded-xl col-span-1 bg-gray-700 w-12 h-12' />
      <div className='flex flex-col items-start justify-start gap-2 col-span-11 ml-2'>
        <div className='animate-pulse rounded-lg bg-gray-700 w-1/2 h-4' />
        <div className='animate-pulse rounded-lg bg-gray-700 w-1/4 h-4' />
      </div>
    </div>
  ) : (
    <Link
      key={offerId}
      className='grid grid-cols-12 gap-2 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out'
      href={`/offer/${offerId}`}
    >
      <Image
        src={offer.profile.logoUrl || '/infojobs.png'}
        alt={offer.profile.name}
        height={50}
        width={50}
        className='rounded-xl col-span-1'
      />
      <div className='flex flex-col items-start justify-start gap-2 col-span-11'>
        <h3 className='text-lg font-bold text-left truncate w-full max-w-full'>
          {offer.title}
        </h3>
        <span className='text-sm font-semibold text-left'>
          {offer.profile.name} -{' '}
          <span
            className={twMerge(
              'text-sm font-semibold text-left px-[5px] py-[2.5px] rounded-lg border',
              offer.active
                ? 'text-green-500 border-green-500 bg-green-500/10'
                : 'text-red-500 border-red-500 bg-red-500/10',
            )}
          >
            {offer.active ? 'Abierta' : 'Cerrada'}
          </span>
        </span>
      </div>
    </Link>
  );
}
