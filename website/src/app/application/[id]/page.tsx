import { getServerSession } from 'next-auth';
import { fetchApplication } from './getApplication';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Session } from 'next-auth';
import { Infojobs } from '@/utils/infojobs';
import { SingleOffer } from 'types/infojobs/getOffer';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const session = (await getServerSession(authOptions)) as Session;

  const infojobsInstance = new Infojobs({
    accessToken: session.accessToken as string,
    basicAuth: process.env.INFOJOBS_BASIC_AUTH as string,
    clientId: process.env.INFOJOBS_CLIENT_ID as string,
    clientSecret: process.env.INFOJOBS_CLIENT_SECRET as string,
  });

  const currentUser = await infojobsInstance.getCurrentUser();

  const application = await fetchApplication(params.id, currentUser.key);

  const offer: SingleOffer = await infojobsInstance.getOffer(
    application.OfferId
  );

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      <div className="flex flex-col gap-4 w-full p-4 rounded-lg bg-gray-800/30 border-gray-300/10 border shadow-md backdrop-filter backdrop-blur-sm transition duration-300 ease-in-out">
        <h1 className="text-2xl font-bold text-gray-100">{offer.title}</h1>
        <div className="flex flex-col gap-2">
          <span className="text-gray-400">{offer.profile.name}</span>
        </div>
      </div>
    </div>
  );
}
