import { getServerSession } from 'next-auth';
import {
  Event,
  EventType,
  EventsDictionary,
  fetchApplication,
} from './getApplication';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Session } from 'next-auth';
import { Infojobs } from '@/utils/infojobs';
import { SingleOffer } from 'types/infojobs/getOffer';
import { EventsForm } from './eventsForm';

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

  const events = application.events;

  events.push({
    EventId: application.ApplicationId,
    ApplicationId: application.ApplicationId,
    date: application.CreationDate,
    type: EventType.CV_RECEIVED,
    description: 'Tu solicitud se ha enviado correctamente',
    finisher: 0,
    initializer: 0,
    rejectedReasons: '',
  });

  events.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const isDisabled =
    application.offerRemoved === 1 ||
    application.processClosed === 1 ||
    application.rejected === 1;

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      <div className="flex flex-col min-h-screen gap-4 w-full p-4 rounded-lg bg-gray-800/30 border-gray-300/10 border shadow-md backdrop-filter backdrop-blur-sm transition duration-300 ease-in-out">
        <h1 className="text-2xl font-bold text-gray-100">{offer.title}</h1>
        <div className="flex flex-col gap-2">
          <span className="text-gray-400">{offer.profile.name}</span>
        </div>
        <section id="timeline" className="w-full h-full flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-100">Actividad</h2>
          <ol className="relative border-l border-gray-700">
            {events.map((event) => (
              <TimelineSection key={event.EventId} event={event} />
            ))}
          </ol>
        </section>
        <EventsForm
          applicationId={application.ApplicationId}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
}

function TimelineSection({ event }: { event: Event }) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3  rounded-full mt-1.5 -left-1.5 border  border-gray-900 bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-500">
        {new Date(event.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        -{' '}
        {new Date(event.date).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {EventsDictionary[event.type]}
      </h3>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {event.description}
      </p>
    </li>
  );
}
