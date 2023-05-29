type BasicApplication = {
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
  events: Event[];
};

export type Event = {
  EventId: string;
  type: EventType;
  date: string;
  description: string;
  initializer: number;
  finisher: number;
  rejectedReasons: string;
  ApplicationId: string;
};

export enum EventType {
  CV_RECEIVED = 1,
  AUTOMATICALLY_REJECTED = 2,
  CV_READ = 3,
  OFFER_REMOVED = 4,
  CONTINUE_PROCESS = 5,
  REJECTED = 6,
  CV_DELETED = 7,
  MESSAGE_SENT = 8,
  OFFER_MODIFIED = 9,
  OTHER_CVS_READ = 10,
  OTHER_CVS_MOVED = 11,
  RETURN_TO_PROCESS = 12,
  PROCESS_CLOSED = 13,
  PROCESS_OPENED = 14,
  CV_EXPORTED = 15,
  USER_DISCARDED = 16,
  INTERVIEW_SCHEDULED = 17,
  HIRED = 18,
  CONTACTED = 19,
  TEST = 20,
  FINAL_INTERVIEW = 21,
  FINALIST = 22,
  NOT_PRESELECTED = 23,
  DECLINED_BY_USER = 24,
}

export const EventsDictionary = {
  [EventType.CV_RECEIVED]: 'CV Recibido',
  [EventType.AUTOMATICALLY_REJECTED]: 'Rechazado automáticamente',
  [EventType.CV_READ]: 'CV Leído',
  [EventType.OFFER_REMOVED]: 'Oferta eliminada',
  [EventType.CONTINUE_PROCESS]: 'Continua en el proceso',
  [EventType.REJECTED]: 'Rechazado',
  [EventType.CV_DELETED]: 'CV Eliminado',
  [EventType.MESSAGE_SENT]: 'Mensaje enviado',
  [EventType.OFFER_MODIFIED]: 'Oferta modificada',
  [EventType.OTHER_CVS_READ]: 'Otros CVs leídos',
  [EventType.OTHER_CVS_MOVED]: 'Otros CVs movidos',
  [EventType.RETURN_TO_PROCESS]: 'Vuelve al proceso',
  [EventType.PROCESS_CLOSED]: 'Proceso cerrado',
  [EventType.PROCESS_OPENED]: 'Proceso abierto',
  [EventType.CV_EXPORTED]: 'CV exportado',
  [EventType.USER_DISCARDED]: 'Descartado por usuario',
  [EventType.INTERVIEW_SCHEDULED]: 'Entrevista agendada',
  [EventType.HIRED]: 'Contratado',
  [EventType.CONTACTED]: 'Contactado',
  [EventType.TEST]: 'Test',
  [EventType.FINAL_INTERVIEW]: 'Entrevista final',
  [EventType.FINALIST]: 'Finalista',
  [EventType.NOT_PRESELECTED]: 'No preseleccionado',
  [EventType.DECLINED_BY_USER]: 'Rechazado por usuario',
};

export async function fetchApplication(id: string, token: string) {
  const application = await fetch(
    `https://api.jobcompass.dev/v2/application/${id}`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    }
  ).then((response) => response.json());

  return application as BasicApplication;
}
