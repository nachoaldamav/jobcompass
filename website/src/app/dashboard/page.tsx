import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LogoutButton from '@/components/LogoutButton';
import { ClientRedirect } from '@/components/ClientRedirect';
import { Infojobs } from '@/utils/infojobs';
import { SyncExtension } from '@/components/apiKey';
import { SingleOffer } from 'types/infojobs/getOffer';
import { SavedOffers } from '@/components/SavedOffers';
import { Suspense } from 'react';

async function getOrCreateUser(
  id: string,
  email: string,
  name: string,
  accessToken: string,
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

async function getApplications(userId: string) {
  const applicationsIds = await fetch(
    `https://api.jobcompass.dev/v2/applications/${userId}`,
  ).then((response) => response.json());

  const applications = await fetch(`https://api.jobcompass.dev/offers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offers: applicationsIds.map((application: any) => application.OfferId),
    }),
  }).then((response) => response.json());

  return applications as SingleOffer[];
}

export default async function Dashboard() {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    return <ClientRedirect to='/' />;
  }

  const infojobsInstance = new Infojobs({
    accessToken: session.accessToken as string,
    basicAuth: process.env.INFOJOBS_BASIC_AUTH as string,
    clientId: process.env.INFOJOBS_CLIENT_ID as string,
    clientSecret: process.env.INFOJOBS_CLIENT_SECRET as string,
  });

  const currentUser = await infojobsInstance.getCurrentUser();

  // Don't wait for this as it's only to create the user if it doesn't exist
  getOrCreateUser(
    currentUser.key,
    currentUser.email,
    currentUser.fullName,
    session.accessToken,
  ).catch((error) => {
    console.error("Couldn't create user", error);
  });

  const alerts = (await fetch(
    `https://api.jobcompass.dev/v2/alerts/${currentUser.key}`,
  ).then((response) => response.json())) as {
    AlertId: string;
    UserId: string;
    OfferId: string;
    CreationDate: string;
  }[];

  const [applications] = await Promise.all([getApplications(currentUser.key)]);

  return (
    <div className='flex flex-col items-center justify-between relative'>
      <SyncExtension api={currentUser.key} />
      <main className='flex flex-col items-center justify-start p-10 flex-1 relative min-h-screen w-full'>
        <span id='login-button' className='absolute top-0 right-0 mt-8 mr-8'>
          <LogoutButton session={session} />
        </span>
        <h1 className='text-4xl font-bold text-center opacity-75'>Dashboard</h1>
        <div className='flex flex-row items-center justify-between w-3/4 mt-10'>
          <h3 className='text-xl font-bold text-left'>
            {getCurrentGreet()}, {session.user?.name}!
          </h3>
        </div>
        <div className='flex flex-row items-start justify-between w-3/4 mt-10 gap-10'>
          <div className='flex flex-col items-center justify-center mt-10 w-1/2'>
            <h3 className='text-xl font-bold text-left'>Ofertas guardadas</h3>
            {alerts.length === 0 && (
              <div className='flex flex-col items-center justify-center w-full mt-10 gap-2 border border-gray-500 rounded-lg p-4 h-72 border-dashed bg-gray-800/40'>
                <span className='text-lg font-semibold text-center'>
                  No tienes ofertas guardadas
                </span>
                <span className='text-sm font-semibold text-center'>
                  Instala la extensión para vincular tu cuenta actual
                </span>
              </div>
            )}
            <div className='flex flex-col items-center justify-center w-full mt-10 gap-2'>
              {alerts
                .sort(
                  (a, b) =>
                    new Date(b.CreationDate).getTime() -
                    new Date(a.CreationDate).getTime(),
                )
                .map((offer) => (
                  <Suspense
                    key={offer.AlertId}
                    fallback={<div>Loading...</div>}
                  >
                    <SavedOffers key={offer.AlertId} offerId={offer.OfferId} />
                  </Suspense>
                ))}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center mt-10 w-1/2'>
            <h3 className='text-xl font-bold text-left'>Candidaturas</h3>
            {applications.length === 0 && (
              <div className='flex flex-col items-center justify-center w-full mt-10 gap-2 border border-gray-500 rounded-lg p-4 h-72 border-dashed bg-gray-800/40'>
                <span className='text-lg font-semibold text-center'>
                  No has aplicado a ninguna oferta
                </span>
              </div>
            )}
            <div className='flex flex-col items-center justify-center w-full mt-10 gap-2'>
              {applications.map((offer) => (
                <a
                  key={'application' + offer.id}
                  className='grid grid-cols-16 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out'
                  href='#'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image
                    src={offer.profile?.logoUrl || '/infojobs.png'}
                    alt={offer.profile?.name}
                    width={50}
                    height={50}
                    className='rounded-xl col-span-1'
                  />
                  <div className='flex flex-col items-start justify-start col-span-6 gap-2'>
                    <h3 className='text-lg font-bold text-left truncate max-w-full'>
                      {offer.title}
                    </h3>
                    <span className='text-sm font-semibold text-left'>
                      {offer.profile?.name}
                    </span>
                  </div>
                  <div className='flex flex-row items-center justify-center w-full gap-2 col-span-3'>
                    <span className='text-sm font-semibold text-right px-2 py-1 rounded-lg bg-gray-700'>
                      {offer.contractType?.value}
                    </span>
                    {offer.salaryDescription && (
                      <span className='text-xs font-semibold text-right px-2 py-1 rounded-lg bg-gray-700'>
                        {offer?.salaryDescription}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-col items-center justify-center w-full gap-2 col-span-3'>
                    <span className='text-sm font-semibold text-right'>
                      {offer.multiProvince ? 'Varias provincias' : offer.city}
                    </span>
                  </div>
                  <div className='flex flex-col items-end justify-end w-full gap-2 col-span-3'>
                    <span className='text-sm font-semibold text-right'>
                      {offer.province?.value}
                    </span>
                    <span className='text-sm font-semibold text-right'>
                      {new Date(offer.updateDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(offer.updateDate).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </a>
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
