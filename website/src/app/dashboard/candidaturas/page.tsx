import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ClientRedirect } from '@/components/ClientRedirect';
import { Infojobs } from '@/utils/infojobs';
import { SyncExtension } from '@/components/apiKey';
import { SavedOffers } from '@/components/SavedOffers';
import { Suspense } from 'react';
import { AppliedOffer } from '@/components/AppliedOffers';

async function getOrCreateUser(
  id: string,
  email: string,
  name: string,
  accessToken: string
) {
  return fetch('https://api.jobcompass.dev/v2/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify({
      userId: id,
      email: email,
      name: name,
    }),
  }).then((response) => response.json());
}

function Skeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out">
      <div className="animate-pulse rounded-xl col-span-1 bg-gray-700 w-12 h-12" />
      <div className="flex flex-col items-start justify-start gap-2 col-span-11 ml-2">
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/4 h-4" />
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-1/4 p-2">Title</th>
          <th className="w-1/4 p-2">Company</th>
          <th className="w-1/4 p-2">Status</th>
          <th className="w-1/4 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">
            <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
          </td>
          <td className="p-2">
            <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
          </td>
          <td className="p-2">
            <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
          </td>
          <td className="p-2">
            <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default async function Dashboard() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    return <ClientRedirect to="/" />;
  }

  const infojobsInstance = new Infojobs({
    accessToken: session.accessToken as string,
    basicAuth: process.env.INFOJOBS_BASIC_AUTH as string,
    clientId: process.env.INFOJOBS_CLIENT_ID as string,
    clientSecret: process.env.INFOJOBS_CLIENT_SECRET as string,
  });

  const currentUser = await infojobsInstance.getCurrentUser().catch((error) => {
    console.error("Couldn't get current user", error);
    throw error;
  });

  // Don't wait for this as it's only to create the user if it doesn't exist
  getOrCreateUser(
    currentUser.key,
    currentUser.email,
    currentUser.fullName,
    session.accessToken
  ).catch((error) => {
    console.error("Couldn't create user", error);
  });

  const applications = (await fetch(
    `https://api.jobcompass.dev/v2/applications/${currentUser.key}`
  ).then((response) => response.json())) as {
    ApplicationId: string;
    UserId: string;
    OfferId: string;
    CreationDate: string;
    rejected: number;
    offerRemoved: number;
    processClosed: number;
    inProcessEvent?: string;
    cvReadEvent?: string;
    offerRemovedEvent?: string;
    processClosedEvent?: string;
    cvReceivedEvent?: string;
  }[];

  return (
    <div className="flex flex-col items-center justify-between relative">
      <SyncExtension api={currentUser.key} />
      <main className="flex flex-col items-center justify-start p-10 flex-1 relative min-h-screen w-full">
        <h1 className="text-4xl font-bold text-center opacity-75">Dashboard</h1>
        <div className="flex flex-row items-center justify-between w-3/4 mt-10">
          <h3 className="text-xl font-bold text-left">
            {getCurrentGreet()}, {session.user?.name}!
          </h3>
        </div>
        <div className="flex flex-row items-start justify-center w-3/4 mt-10 gap-10">
          <div className="flex flex-col items-center justify-center mt-10 w-1/2">
            <h3 className="text-xl font-bold text-left">Candidaturas</h3>
            {applications.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full mt-10 gap-2 border border-gray-500 rounded-lg p-4 h-72 border-dashed bg-gray-800/40">
                <span className="text-lg font-semibold text-center">
                  No has aplicado a ninguna oferta
                </span>
                <span className="text-sm font-semibold text-center">
                  Entra en una oferta y haz click en el botón de aplicar <br />
                  <span className="text-xs font-base opacity-50">
                    (solo funciona con ofertas en jobcompass.dev)
                  </span>
                </span>
              </div>
            )}
            <div className="flex flex-col items-center justify-center w-full mt-10 gap-2">
              {applications
                .sort(
                  (a, b) =>
                    new Date(b.CreationDate).getTime() -
                    new Date(a.CreationDate).getTime()
                )
                .map((offer) => (
                  <Suspense key={offer.ApplicationId} fallback={<Skeleton />}>
                    {/* @ts-ignore - JSX doesn't support async components yet */}
                    <AppliedOffer offerId={offer.OfferId} data={offer} />
                  </Suspense>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getCurrentGreet() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 0 && hour < 12) {
    return 'Buenos días';
  } else if (hour >= 12 && hour < 18) {
    return 'Buena tardes';
  } else {
    return 'Buenas noches';
  }
}
