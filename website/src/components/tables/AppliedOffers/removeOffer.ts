'use server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Infojobs } from '@/utils/infojobs';
import { Session, getServerSession } from 'next-auth';

export async function removeAlert(alertId: string): Promise<void> {
  'use server';

  const res = await fetch('https://api.jobcompass.dev/v2/alert', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      alertId: alertId,
    }),
  });
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
}
