'use server';
import { Infojobs } from './infojobs';
import crypto from 'crypto';

export async function applyToOffer(
  accessToken: string,
  offerId: string
): Promise<{
  error?: string;
  ok: boolean;
}> {
  'use server';
  const infojobsInstance = new Infojobs({
    accessToken: accessToken as string,
    basicAuth: process.env.INFOJOBS_BASIC_AUTH as string,
    clientId: process.env.INFOJOBS_CLIENT_ID as string,
    clientSecret: process.env.INFOJOBS_CLIENT_SECRET as string,
  });
  const currentUser = await infojobsInstance.getCurrentUser();

  const uuid = crypto.randomUUID();

  const res = await fetch('https://api.jobcompass.dev/v2/application', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify({
      ApplicationId: uuid,
      UserId: currentUser.key,
      OfferId: offerId,
      CreationDate: new Date().toISOString(),
    }),
  });

  const json = await res.json();

  if (json.error) {
    return {
      error: json.error,
      ok: false,
    };
  }

  console.log('Saved application', {
    ApplicationId: uuid,
    UserId: currentUser.key,
    OfferId: offerId,
    CreationDate: new Date().toISOString(),
  });

  return {
    ok: true,
  };
}
