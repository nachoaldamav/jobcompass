/* eslint-disable import/no-anonymous-default-export */
import type { Offer, UserProfile } from '../types/infojobs';
import { connect } from '@planetscale/database';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { v4 as uuid } from 'uuid';
import { createConfig } from './utils/createConfig';

type Bindings = {
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  INFOJOBS_BASIC_AUTH: string;
  JOBCOMPASS_BUCKET: R2Bucket;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  '/*',
  cors({
    origin: '*',
  })
);

app.get('/', async (c) => {
  return c.json({ message: 'Hello World!' });
});

app.post('/offers', async (c) => {
  try {
    const { offers: offersList } = await c.req.json();

    const offers = await Promise.all(
      offersList.map(async (offer: string) => {
        // fetch the offer data and save it to the bucket
        const res = await fetch(
          `https://api.infojobs.net/api/7/offer/${offer}`,
          {
            headers: {
              Authorization: `Basic ${c.env.INFOJOBS_BASIC_AUTH}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json());

        return res;
      })
    );

    return c.json(offers);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
    });
  }
});

app.get('/offer/:id', async (c) => {
  const id = c.req.param('id');
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      Authorization: `Basic ${c.env.INFOJOBS_BASIC_AUTH}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  const jsonHash = JSON.stringify(res);

  const sha = await crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(jsonHash))
    .then((hash) => {
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    });

  const exists = await c.env.JOBCOMPASS_BUCKET.get(`offers/${id}/${sha}.json`);

  if (!exists) {
    await c.env.JOBCOMPASS_BUCKET.put(`offers/${id}/${sha}.json`, jsonHash);
    console.log('Offer added', id, sha);
  } else {
    console.log('Offer already exists');
  }

  return c.json(res);
});

app.get('/offer-diff/:id', async (c) => {
  const id = c.req.param('id');

  const directory = await c.env.JOBCOMPASS_BUCKET.list({
    prefix: `offers/${id}/`,
  });

  const files = directory.objects
    .map((file) => {
      return {
        name: file.key,
        uploaded: file.uploaded,
      };
    })
    .sort((a, b) => {
      return b.uploaded.getMilliseconds() - a.uploaded.getMilliseconds();
    });

  const latest = files[0];
  const previous = files[1];

  const latestFile = (await c.env.JOBCOMPASS_BUCKET.get(latest.name).then(
    (res) => res?.json()
  )) as Offer;
  const previousFile = (await c.env.JOBCOMPASS_BUCKET.get(previous.name).then(
    (res) => res?.json()
  )) as Offer;

  const diff = {
    applications: latestFile?.applications - previousFile?.applications,
    maxSalary: latestFile?.maxPay.amount - previousFile?.maxPay.amount,
    minSalary: latestFile?.minPay.amount - previousFile?.minPay.amount,
    vacancies: latestFile?.vacancies - previousFile?.vacancies,
    active: {
      latest: latestFile?.active,
      previous: previousFile?.active,
    },
    updated: latestFile.updateDate,
    killerQuestions:
      latestFile?.hasKillerQuestions - previousFile?.hasKillerQuestions,
    openQuestions:
      latestFile?.hasOpenQuestions - previousFile?.hasOpenQuestions,
  };

  return c.json(diff);
});

app.get('/offer-updates/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const directory = await c.env.JOBCOMPASS_BUCKET.list({
      prefix: `offers/${id}/`,
    });

    const files = directory.objects
      .map((file) => {
        return {
          name: file.key,
          uploaded: file.uploaded,
        };
      })
      .sort((a, b) => {
        return b.uploaded.getMilliseconds() - a.uploaded.getMilliseconds();
      });

    const filesData = (
      await Promise.all(
        files.map(async (file) => {
          const data = (await c.env.JOBCOMPASS_BUCKET.get(file.name).then(
            (res) => res?.json()
          )) as Offer;

          return {
            ...data,
            uploaded: file.uploaded,
          };
        })
      )
    ).sort((a, b) => {
      return new Date(a.uploaded).getTime() - new Date(b.uploaded).getTime();
    });

    const data = {
      id,
      updates: filesData.map((file) => file.uploaded),
      candidates: filesData.map((file) => file.applications || 0),
      maxSalary: filesData.map((file) => file.maxPay?.amount || 0),
      minSalary: filesData.map((file) => file.minPay?.amount || 0),
      vacancies: filesData.map((file) => file.vacancies || 0),
      active: filesData.map((file) => file.active || true),
      updated: filesData.map((file) => file.updateDate || ''),
      killerQuestions: filesData.map((file) => file.hasKillerQuestions || 0),
      openQuestions: filesData.map((file) => file.hasOpenQuestions || 0),
    };

    return c.json(data);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
    });
  }
});

app.post('/alert', async (c) => {
  const config = createConfig(c.env);
  const body = await c.req.json();

  const { userId, offerId } = body;

  try {
    const conn = connect(config);

    const exists = await conn.execute(
      `SELECT * FROM JobAlerts WHERE UserId = "${userId}" AND OfferId = "${offerId}";`
    );

    if (exists.rows.length > 0) {
      return c.json({ error: 'Ya tienes una alerta para esta oferta' });
    }

    // insert user data into database
    const data = await conn.execute(
      `INSERT INTO JobAlerts (UserId, OfferId, AlertId) VALUES ("${userId}", "${offerId}", "${uuid()}");`
    );

    if (!data) {
      return c.json({ error: 'No data' });
    }

    return c.json(data.rows);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.post('/v2/alert', async (c) => {
  const body = await c.req.json();

  const { userId, offerId } = body;

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM JobAlerts WHERE UserId = "${userId}" AND OfferId = "${offerId}";`
    ).all();

    if (results && results.length > 0) {
      return c.json({ error: 'Ya tienes una alerta para esta oferta' });
    }

    // insert user data into database
    const { results: data } = await c.env.DB.prepare(
      `INSERT INTO JobAlerts (UserId, OfferId, AlertId, CreationDate) VALUES ("${userId}", "${offerId}", "${uuid()}", "${new Date().toISOString()}");`
    ).all();

    if (!data) {
      return c.json({ error: 'No data' });
    }

    return c.json(data);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.get('/alerts/:userId', async (c) => {
  const config = createConfig(c.env);
  const userId = c.req.param('userId');

  try {
    const conn = connect(config);

    const data = await conn.execute(
      `SELECT * FROM JobAlerts WHERE UserId = "${userId}";`
    );

    if (!data) {
      return c.json([]);
    }

    return c.json(data.rows);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.get('/v2/alerts/:userId', async (c) => {
  const userId = c.req.param('userId');

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM JobAlerts WHERE UserId = "${userId}";`
    ).all();

    if (!results) {
      return c.json([]);
    }

    return c.json(results);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.post('/v2/user', async (c) => {
  const body = await c.req.json();
  const token = c.req.headers.get('Authorization');

  if (!token) {
    return c.json({ error: 'No token' });
  }

  const { userId, email, name } = body;

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Users WHERE UserId = "${userId}";`
    ).all();

    if (results && results.length > 0) {
      return c.json({ name, email, userId });
    }

    // insert user data into database
    const { results: data } = await c.env.DB.prepare(
      `INSERT INTO Users (UserId, Email, Name, RegistrationDate) VALUES ("${userId}", "${email}", "${name}", "${new Date().toISOString()}");`
    ).all();

    if (!data) {
      return c.json({ error: 'No data' });
    }

    return c.json({ name, email, userId });
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.get('/v2/user/:userId', async (c) => {
  const userId = c.req.param('userId');

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Users WHERE UserId = "${userId}";`
    ).all();

    if (!results) {
      return c.json([]);
    }

    return c.json(results);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.get('/v2/applications/:userId', async (c) => {
  const userId = c.req.param('userId');

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Applications WHERE UserId = "${userId}";`
    ).all();

    if (!results) {
      return c.json([]);
    }

    return c.json(results);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

type EventData = {
  date: string;
  description: string;
  initializer: boolean;
  finisher: boolean;
  rejectReasons?: string[];
};

type Application = {
  ApplicationId: string;
  UserId: string;
  OfferId: string;
  CreationDate: string;
  /**
   * 0: false
   * 1: true
   */
  rejected: number;
  /**
   * 0: false
   * 1: true
   */
  offerRemoved: number;
  /**
   * 0: false
   * 1: true
   */
  processClosed: number;
  inProcessEvent: null | EventData;
  cvReadEvent: null | EventData;
  offerRemovedEvent: null | EventData;
  processClosedEvent: null | EventData;
  cvReceivedEvent: null | EventData;
};

app.post('/v2/application', async (c) => {
  const body = await c.req.json();
  const token = c.req.headers.get('Authorization');

  if (!token) {
    return c.json({ error: 'No token' });
  }

  const applicationData: Application = body;

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Applications WHERE UserId = "${applicationData.UserId}" AND OfferId = "${applicationData.OfferId}";`
    ).all();

    if (results && results.length > 0) {
      c.status(400);
      return c.json({ error: 'Ya has aplicado a esta oferta' });
    }

    // insert user data into database
    const { results: data } = await c.env.DB.prepare(
      `INSERT INTO Applications (ApplicationId, UserId, OfferId, CreationDate) VALUES ("${applicationData.ApplicationId}", "${applicationData.UserId}", "${applicationData.OfferId}", "${applicationData.CreationDate}");`
    ).all();

    if (!data) {
      c.status(500);
      return c.json({ error: 'No data' });
    }

    return c.json(data);
  } catch (err: any) {
    console.log(err);
    c.status(500);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
      cause: err.cause,
    });
  }
});

app.put('/v2/application', async (c) => {
  const body = await c.req.json();
  const token = c.req.headers.get('Authorization');

  if (!token) {
    return c.json({ error: 'No token' });
  }

  const applicationData: Application = body;

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Applications WHERE ApplicationId = "${applicationData.ApplicationId}";`
    ).all();

    if (!results || results.length === 0) {
      return c.json({ error: 'No existe la aplicación' });
    }

    // insert user data into database
    const { results: data } = await c.env.DB.prepare(
      `UPDATE Applications SET rejected = ${
        applicationData.rejected
      }, offerRemoved = ${applicationData.offerRemoved}, processClosed = ${
        applicationData.processClosed
      }, inProcessEvent = ${JSON.stringify(
        applicationData.inProcessEvent
      )}, cvReadEvent = ${JSON.stringify(
        applicationData.cvReadEvent
      )}, offerRemovedEvent = ${JSON.stringify(
        applicationData.offerRemovedEvent
      )}, processClosedEvent = ${JSON.stringify(
        applicationData.processClosedEvent
      )}, cvReceivedEvent = ${JSON.stringify(
        applicationData.cvReceivedEvent
      )} WHERE ApplicationId = "${applicationData.ApplicationId}";`
    ).all();

    if (!data) {
      return c.json({ error: 'No data' });
    }

    return c.json(data);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

app.get('/v2/application/:applicationId', async (c) => {
  const applicationId = c.req.param('applicationId');
  const token = c.req.headers.get('Authorization');

  if (!token) {
    return c.json({ error: 'No token' });
  }

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM Applications WHERE ApplicationId = "${applicationId}" AND UserId = "${token}";`
    ).all();

    if (!results) {
      return c.json([]);
    }

    return c.json(results);
  } catch (err: any) {
    console.log(err);
    return c.json({
      code: err.status,
      name: err.name,
      error: err,
    });
  }
});

export default app;
