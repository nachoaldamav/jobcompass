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

app.get('/user', async (c) => {
  const config = createConfig(c.env);

  // get access token from request header
  const token = c.req.headers.get('Authorization');

  // if no token, return error
  if (!token) {
    return c.json({ error: 'No Access Token Provided' });
  }

  try {
    const conn = connect(config);
    // get the user data, the Access Token is the primary key (UserId)
    const data = await conn.execute(
      `SELECT * FROM Users WHERE UserId = "${token.split(' ')[1]}";`
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
    });
  }
});

app.post('/user', async (c) => {
  const config = createConfig(c.env);

  // get access token from request header
  const token = c.req.headers.get('Authorization');
  const body = await c.req.json();

  // if no token, return error
  if (!token) {
    return c.json({ error: 'No Access Token Provided' });
  }

  const userData: UserProfile = {
    id: body.id,
    email: body.email,
    emailHash: body.emailHash,
    userKey: body.key,
    hasPhoto: body.hasPhoto,
    photo: body.photo,
    name: body.name,
    surname1: body.surname1,
    surname2: body.surname2,
    fullName: body.fullName,
    city: body.city,
    province: body.province,
    publicProfileLink: body.publicProfileLink,
    status: body.status,
    validatedMail: body.validatedMail,
    accountCreation: body.accountCreation,
    lastCVUpdate: body.lastCVUpdate,
    lastInscripcion: body.lastInscripcion,
    extendedBannerAttributes: body.extendedBannerAttributes,
    subSegment: body.subSegment,
    doesNotWantNotifications: body.doesNotWantNotifications,
    photoAccepted: body.photoAccepted,
    access_token: body.access_token,
    expires_in: body.expires_in,
    refresh_token: body.refresh_token,
    scope: body.scope,
    token_type: body.token_type,
  };

  try {
    const conn = connect(config);
    // insert user data into database
    const data = await conn.execute(
      `INSERT INTO users (id, email, emailHash, userKey, hasPhoto, photo, name, surname1, surname2, fullName, city, province, publicProfileLink, status, validatedMail, accountCreation, lastCVUpdate, lastInscripcion, extendedBannerAttributes, subSegment, doesNotWantNotifications, photoAccepted, access_token, expires_in, refresh_token, scope, token_type) VALUES (${userData.id}, ${userData.email}, ${userData.emailHash}, ${userData.userKey}, ${userData.hasPhoto}, ${userData.photo}, ${userData.name}, ${userData.surname1}, ${userData.surname2}, ${userData.fullName}, ${userData.city}, ${userData.province}, ${userData.publicProfileLink}, ${userData.status}, ${userData.validatedMail}, ${userData.accountCreation}, ${userData.lastCVUpdate}, ${userData.lastInscripcion}, ${userData.extendedBannerAttributes}, ${userData.subSegment}, ${userData.doesNotWantNotifications}, ${userData.photoAccepted}, ${userData.access_token}, ${userData.expires_in}, ${userData.refresh_token}, ${userData.scope}, ${userData.token_type});`
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

export default app;
