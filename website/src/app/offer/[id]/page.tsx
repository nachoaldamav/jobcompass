import type { Session } from 'next-auth';
import type { SingleOffer } from 'types/infojobs/getOffer';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CollapsibleText } from '@/components/CollapsibleText';
import { Sidebar } from './sidebar';
import { Metadata } from 'next';
import { OfferStatus } from './status';
import { Toaster } from 'react-hot-toast';

type OfferPageProps = {
  params: {
    id: string;
  };
};

async function getOffer(id: string): Promise<SingleOffer> {
  return fetch(`https://api.jobcompass.dev/offer/${id}`).then((res) =>
    res.json()
  );
}

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  /* const offer = await getOffer(params.id); */
  const [offer] = await Promise.all([getOffer(params.id)]);

  return {
    title: `${offer.title} | JobCompass`,
    description: offer.description,
  };
}

export default async function Page({ params }: OfferPageProps) {
  const session = (await getServerSession(authOptions)) as Session;
  const [offer] = await Promise.all([getOffer(params.id)]);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <div className="flex flex-col justify-start items-start gap-4 w-full col-span-6">
        <header className="flex flex-row justify-start gap-4 items-center w-full rounded-xl p-4 border border-gray-500/20 bg-gray-800/40">
          <Image
            src={offer.profile.logoUrl || '/infojobs.png'}
            alt={offer.profile.name}
            width={60}
            height={60}
            className="rounded-xl"
          />
          <div className="flex flex-col justify-start items-start">
            <h1 id="prefijoPuesto" className="text-2xl font-bold">
              {offer.title}
            </h1>
            <h2 className="text-xl">{offer.profile.name}</h2>
          </div>
        </header>
        {offer.skillsList.length > 0 && (
          <section
            className="flex flex-row justify-start gap-4 items-center w-full rounded-xl p-4 border border-gray-500/20 bg-gray-800/40"
            aria-labelledby="prefijoPuesto"
          >
            <div className="flex flex-col justify-start items-start">
              <h3 className="text-xl font-bold">Requisitos mínimos</h3>
              <div className="flex flex-row justify-start gap-2 mt-2 items-center flex-wrap">
                {offer.skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 font-light bg-gray-800/20 rounded-xl border border-gray-500/20"
                  >
                    {skill.skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
        <OfferStatus id={params.id} currentCandidates={offer.applications} />
        <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20">
          <h3 className="text-xl font-bold p-4">Descripción</h3>
          <CollapsibleText
            text={offer.description}
            className="text-lg p-4 font-light w-full"
            maxLength={400}
          />
        </article>
        {offer.minRequirements && (
          <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[900]">
            <h3 className="text-xl font-bold p-4">Requisitos mínimos</h3>
            <CollapsibleText
              text={offer.minRequirements}
              className="text-lg p-4 font-light w-full"
              maxLength={400}
            />
          </article>
        )}
      </div>
      <Sidebar offer={offer} />
    </>
  );
}
