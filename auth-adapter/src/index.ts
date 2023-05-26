import type { OAuthConfig } from 'next-auth/providers';

export interface InfojobsProviderOptions {
  clientId: string;
  clientSecret: string;
  basicAuth: string;
  scope: string;
  redirectUri: string;
  logo: string;
  logoDark: string;
}

export function Infojobs(options: InfojobsProviderOptions): OAuthConfig<any> {
  return {
    id: 'infojobs',
    name: 'Infojobs',
    type: 'oauth',
    version: '2.0',
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    async profile(_profile, tokens) {
      const res = await fetch('https://api.infojobs.net/api/6/candidate', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}, Basic ${options.basicAuth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then((r) => r.json());

      return {
        id: res.key,
        name: res.name + ' ' + res.surname1,
        email: res.email,
        image: res.photo,
      };
    },
    userinfo: {
      url: 'https://api.infojobs.net/api/6/candidate',
      async request(context) {
        const res = await fetch('https://api.infojobs.net/api/6/candidate', {
          headers: {
            Authorization: `Bearer ${context.tokens.access_token}, Basic ${options.basicAuth}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then((r) => r.json())
          .catch((e) => {
            console.error('Error fetching user info from Infojobs', e);
            throw e;
          });

        return {
          name: res.name + ' ' + res.surname1,
          email: res.email,
          image: res.photo,
          sub: res.key,
        };
      },
    },
    authorization: {
      url: 'https://www.infojobs.net/api/oauth/user-authorize/index.xhtml',
      params: {
        scope: options.scope,
        client_id: options.clientId,
        redirect_uri: options.redirectUri,
        response_type: 'code',
      },
    },
    client: {
      token_endpoint_auth_method: 'client_secret_post',
    },
    token: {
      async request({ params }) {
        const res = await fetch(
          'https://www.infojobs.net/oauth/authorize?' +
            new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: options.clientId,
              client_secret: options.clientSecret,
              redirect_uri: options.redirectUri,
              code: params.code as string,
            }).toString(),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        if (!res.ok) {
          console.error('Error fetching token from Infojobs', await res.json());
          throw new Error('Error fetching token from Infojobs');
        }

        const data = await res.json();

        return {
          tokens: {
            access_token: data.access_token,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token,
            scope: data.scope,
            token_type: 'Bearer',
          },
        };
      },
    },
    idToken: false,
    checks: ['nonce', 'state', 'pkce'],
    style: {
      logo: options.logo,
      logoDark: options.logoDark,
      bg: '#167DB7',
      bgDark: '#167DB7',
      text: '#fff',
      textDark: '#fff',
    },
  };
}
