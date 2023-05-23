import Link from 'next/link';
import { SingleOffer } from '../../types/infojobs/getOffer';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type SavedOffersProps = {
  offer: {
    offer: SingleOffer;
    AlertId: string;
    OfferId: string;
    CreationDate: string;
    UserId: string;
  };
};

export function SavedOffers({ offer }: SavedOffersProps): React.ReactElement {
  return (
    <Link
      key={offer.AlertId}
      className="inline-flex gap-2 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out"
      href={`/offer/${offer.OfferId}`}
    >
      <Image
        src={offer.offer.profile.logoUrl || '/infojobs.png'}
        alt={offer.offer.profile.name}
        width={50}
        height={50}
        className="rounded-xl col-span-1"
      />
      <div
        className="flex flex-col items-start justify-start gap-2"
        style={{
          gridColumn: 'span 15 / span 15',
        }}
      >
        <h3 className="text-lg font-bold text-left truncate max-w-full">
          {offer.offer.title}
        </h3>
        <span className="text-sm font-semibold text-left">
          {offer.offer.profile.name} -{' '}
          <span
            className={twMerge(
              'text-sm font-semibold text-left px-[5px] py-[2.5px] rounded-lg border',
              offer.offer.active
                ? 'text-green-500 border-green-500 bg-green-500/10'
                : 'text-red-500 border-red-500 bg-red-500/10'
            )}
          >
            {offer.offer.active ? 'Abierta' : 'Cerrada'}
          </span>
        </span>
      </div>
    </Link>
  );
}
