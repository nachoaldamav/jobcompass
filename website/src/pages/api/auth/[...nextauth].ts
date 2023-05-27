import type { JWT } from 'next-auth/jwt';
import NextAuth, { AuthOptions } from 'next-auth';
import { Infojobs } from 'infojobs-auth-adapter';

if (
  !process.env.INFOJOBS_BASIC_AUTH ||
  !process.env.INFOJOBS_SECRET ||
  !process.env.INFOJOBS_CLIENT_ID ||
  !process.env.INFOJOBS_REDIRECT_URI
) {
  throw new Error(
    `Missing environment variables for Infojobs OAuth. Please check your .env file, found: ${JSON.stringify(
      {
        INFOJOBS_BASIC_AUTH: process.env.INFOJOBS_BASIC_AUTH,
        INFOJOBS_SECRET: process.env.INFOJOBS_SECRET,
        NFOJOBS_CLIENT_ID: process.env.INFOJOBS_CLIENT_ID,
        NFOJOBS_REDIRECT_URI: process.env.INFOJOBS_REDIRECT_URI,
      },
      null,
      2
    )}`
  );
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Infojobs({
      basicAuth: process.env.INFOJOBS_BASIC_AUTH as string,
      clientId: process.env.INFOJOBS_CLIENT_ID as string,
      clientSecret: process.env.INFOJOBS_SECRET as string,
      redirectUri: process.env.INFOJOBS_REDIRECT_URI as string,
      scope: 'CANDIDATE_PROFILE_WITH_EMAIL,MY_APPLICATIONS',
      logo: new URL('/infojobs.svg', process.env.NEXTAUTH_URL).href,
      logoDark: new URL('/infojobs.svg', process.env.NEXTAUTH_URL).href,
    }),
  ],
  callbacks: {
    async jwt({ token, account, session }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        return {
          accessToken: account.access_token,
          expiresAt: Date.now() + (account as any).expires_in * 1000,
          refreshToken: account.refresh_token,
        };
      } else if (Date.now() < (token as any).expiresAt) {
        return token;
      } else {
        console.log('Refreshing token from Infojobs');
        const res = await fetch(
          `https://www.infojobs.net/oauth/authorize?${new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: process.env.INFOJOBS_CLIENT_ID as string,
            client_secret: process.env.INFOJOBS_SECRET as string,
            redirect_uri: process.env.INFOJOBS_REDIRECT_URI as string,
            refresh_token: token.refreshToken as string,
          })}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        if (!res.ok) {
          console.error(
            'Error refreshing token from Infojobs',
            await res.json()
          );
          throw new Error('Error refreshing token from Infojobs');
        }

        const data = await res.json();

        const userProfile = await fetch(
          'https://api.infojobs.net/api/6/candidate',
          {
            headers: {
              Authorization: `Bearer ${data.access_token}, Basic ${process.env.INFOJOBS_BASIC_AUTH}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        ).then((r) => r.json());

        return {
          accessToken: data.access_token,
          expiresAt: Date.now() + data.expires_in * 1000,
          refreshToken: data.refresh_token,
          email: userProfile.email,
          name: userProfile.name + ' ' + userProfile.surname1,
          picture: userProfile.photo,
        };
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

declare module 'next-auth' {
  interface Session {
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

export default NextAuth(authOptions);
