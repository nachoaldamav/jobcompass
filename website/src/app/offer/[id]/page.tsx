import type { Session } from 'next-auth';
import type { SingleOffer } from 'types/infojobs/getOffer';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CollapsibleText } from '@/components/CollapsibleText';
import { Sidebar } from './sidebar';
import Head from 'next/head';
import { Metadata } from 'next';

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
  const offer = await getOffer(params.id);

  return {
    title: `${offer.title} | JobCompass`,
    description: offer.description,
  };
}

export default async function Page({ params }: OfferPageProps) {
  const session = (await getServerSession(authOptions)) as Session;
  const offer = await getOffer(params.id);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <>
      <Head>
        <title>{offer.title} | JobCompass</title>
        <meta name="description" content={offer.description} />
        <meta property="og:title" content={offer.title} />
        <meta property="og:description" content={offer.description} />
        <meta property="og:image" content={offer.profile.logoUrl} />
        <meta
          property="og:url"
          content={`https://jobcompass.dev/offer/${offer.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JobCompass" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jobcompass" />
        <meta name="twitter:creator" content="@jobcompass" />
        <meta name="twitter:title" content={offer.title} />
        <meta name="twitter:description" content={offer.description} />
        <meta name="twitter:image" content={offer.profile.logoUrl} />
        <meta
          name="twitter:url"
          content={`https://jobcompass.dev/offer/${offer.id}`}
        />
      </Head>

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
            <h1 className="text-2xl font-bold">{offer.title}</h1>
            <h2 className="text-xl">{offer.profile.name}</h2>
          </div>
        </header>
        <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
          <h3 className="text-xl font-bold p-4">Descripción</h3>
          <CollapsibleText
            text={offer.description}
            className="text-lg p-4 font-light w-full"
            maxLength={400}
          />
        </article>
        {offer.minRequirements && (
          <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
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
