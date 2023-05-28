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
};

export async function fetchApplication(id: string, token: string) {
  const application = await fetch(
    `https://api.jobcompass.dev/v2/application/${id}`,
    {
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    }
  ).then((response) => response.json());

  return application[0] as BasicApplication;
}
