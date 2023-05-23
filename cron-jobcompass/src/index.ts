/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler deploy --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { connect } from '@planetscale/database';

export interface Env {
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  INFOJOBS_BASIC_AUTH: string;
  JOBCOMPASS_BUCKET: R2Bucket;
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    const database = connect({
      host: env.DATABASE_HOST,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
    });

    const alerts = await database.execute(`SELECT * FROM JobAlerts;`);

    const offerIds = alerts.rows.map((alert) => (alert as any).OfferId);

    const uniqueOfferIds = [...new Set(offerIds)];

    await Promise.all(
      uniqueOfferIds.map(async (offerId) => {
        return fetchOffer(offerId);
      })
    );

    console.log(`Hello World!`);
  },
};

async function fetchOffer(offerId: string) {
  const res = await fetch(`https://api.jobcompass.io/offer/${offerId}`).then(
    (res) => res.json()
  );

  return res;
}
