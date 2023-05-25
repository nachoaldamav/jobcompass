'use client';
import { use } from 'react';

export function OfferStatus({ id }: { id: string }) {
  const offerStatus = use(
    fetch(`https://api.jobcompass.dev/offer-updates/${id}`).then((res) =>
      res.json()
    )
  );

  return (
    <section className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
      <h3 className="text-xl font-bold p-4">Actualizaciones</h3>
      <div className="flex flex-col justify-start items-start w-full">
        {offerStatus.updates?.map((status: string) => (
          <span key={status} className="text-lg p-4 font-light w-full">
            {new Date(status).toLocaleDateString()}
          </span>
        ))}
      </div>
    </section>
  );
}
