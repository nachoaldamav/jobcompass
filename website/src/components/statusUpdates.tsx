'use client';
import { OfferStatus, useOfferStatus } from '@/app/offer/[id]/context';
import { twMerge } from 'tailwind-merge';

export function StatusUpdates({
  statusKey,
}: {
  statusKey: keyof OfferStatus;
}) {
  const { offerStatus } = useOfferStatus();

  if (!offerStatus) {
    return null;
  }

  if (!offerStatus[statusKey]) {
    return null;
  }

  // find the last key that the value is not 0
  const lastKey = offerStatus[statusKey].length - 2;

  const diff =
    (offerStatus[statusKey][lastKey] as number) -
    (offerStatus[statusKey][0] as number);

  if (diff === 0) {
    return null;
  }

  return (
    <div className='flex flex-col items-center'>
      <div
        className={twMerge(
          'text-xs font-semibold inline-flex items-start justify-center ml-1 gap-1',
          diff > 0 ? 'text-green-500' : 'text-red-500',
        )}
      >
        {diff}
        {diff > 0 ? <ArrowUpRight /> : <ArrowDownRight />}
      </div>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-3 h-3'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
      />
    </svg>
  );
}

function ArrowDownRight() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-3 h-3'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181'
      />
    </svg>
  );
}
