'use server';
import { SingleOffer } from 'types/infojobs/getOffer';

export async function fetchOffer(offerId: string) {
  const offer = await fetch(`https://api.jobcompass.dev/offer/${offerId}`, {
    cache: 'force-cache',
  }).then((res) => res.json());
  return offer as SingleOffer;
}
