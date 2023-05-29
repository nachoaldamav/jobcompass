'use server';
import { randomUUID } from 'crypto';
import type { Event } from './getApplication';

export async function sendEvent(event: Event) {
  'use server';
  const { ApplicationId, type, date, description } = event;
  const EventId = randomUUID();

  const data: {
    eventId: string;
    applicationId: string;
    date: string;
    description: string;
    type: number;
    initializer: number;
    finisher: number;
    rejectReasons: string[];
  } = {
    eventId: EventId,
    applicationId: ApplicationId,
    date,
    description,
    type,
    initializer: 0,
    finisher: 0,
    rejectReasons: [],
  };

  return fetch('https://api.jobcompass.dev/v2/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
