import { ClientRedirect } from '@/components/ClientRedirect';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { fetchApplication } from './getApplication';
import { Infojobs } from '@/utils/infojobs';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
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

  const application = await fetchApplication(params.id, currentUser.key);

  if (application.UserId !== currentUser.key) {
    console.error(
      `User is not the owner of this application [${params.id}] (${application.UserId} !== ${currentUser.key})`
    );
    return <ClientRedirect to="/" />;
  }

  return (
    <main className="min-h-screen w-full lg:w-3/4 flex flex-col items-center justify-start mx-auto p-10">
      {children}
    </main>
  );
}
