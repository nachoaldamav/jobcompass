import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  // get the code from the query params
  const code = new URL(
    (process.env.NEXTAUTH_URL as string) + req.nextUrl
  ).searchParams.get('code');

  const state = new URL(
    (process.env.NEXTAUTH_URL as string) + req.nextUrl
  ).searchParams.get('state');

  const scopes = new URL(
    (process.env.NEXTAUTH_URL as string) + req.nextUrl
  ).searchParams.get('scope');

  const authType = new URL(
    (process.env.NEXTAUTH_URL as string) + req.nextUrl
  ).searchParams.get('auth_type');

  return Response.redirect(
    `${
      process.env.NEXTAUTH_URL as string
    }/api/auth/callback/infojobs?code=${code}&state=${state}&scopes=${scopes}&auth_type=${authType}`,
    302
  );
}
