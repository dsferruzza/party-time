import { DateTime, Duration } from 'luxon';

export const authWindowName = 'google_oauth2_login_popup';
type WindowWithAuthCallback = Window & { authCallback(rawHash: string): void; };

export interface AccessToken {
  accessToken: string
  expirationDate: DateTime
}

function getFullBaseUrl(baseUrl: string): string {
  const base = ((baseUrl === '/') ? '' : baseUrl);
  const a = document.createElement('a');
  a.href = '.';
  if (a.port === '') {
    return `${a.protocol}//${a.hostname}${base}`;
  } else {
    return `${a.protocol}//${a.hostname}:${a.port}${base}`;
  }
}

export function getAccessToken(clientId: string, currentAccessToken: string, currentExpirationDate: DateTime, baseUrl: string): Promise<AccessToken> {
  return new Promise((resolve, reject) => {
    if (currentExpirationDate.diffNow('milliseconds').as('milliseconds') <= 0) {
      const page = window.location.href.split(getFullBaseUrl(baseUrl))[1];
      const qs = {
        client_id: clientId,
        redirect_uri: getFullBaseUrl(baseUrl),
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
        state: page,
      };
      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + (new URLSearchParams(qs)).toString();
      const popup = window.open(authUrl, authWindowName, `width=500,height=700,location=no,toolbar=no,menubar=no`);
      const windowWithAuthCallback = window as unknown as WindowWithAuthCallback;
      windowWithAuthCallback.authCallback = (rawHash: string) => {
        if (popup !== null) {
          popup.close();
        }
        if (rawHash !== '') {
          const hash = new URLSearchParams(rawHash.replace('#', ''));
          const authHash = toAuthHash(hash);
          if (authHash !== null) {
            const seconds = parseInt(authHash.expires_in, 10) - 5;
            const expirationDate = DateTime.local().plus(Duration.fromObject({ seconds }));
            resolve({ accessToken: authHash.access_token, expirationDate });
          }
        }
      };
    } else {
      resolve({ accessToken: currentAccessToken, expirationDate: currentExpirationDate });
    }
  });
}

export function installAuthCallback(): void {
  if (window.opener !== null && window.name === authWindowName) {
    const windowWithAuthCallback = window.opener as unknown as WindowWithAuthCallback;
    windowWithAuthCallback.authCallback(window.location.hash);
  }
}

interface AuthHash {
  access_token: string
  expires_in: string
  state: string
}

function toAuthHash(hash: URLSearchParams): AuthHash | null {
  const accessToken = hash.get('access_token');
  const expiresIn = hash.get('expires_in');
  const state = hash.get('state');

  if (accessToken !== null && expiresIn !== null && state !== null) {
    return {
      access_token: accessToken,
      expires_in: expiresIn,
      state,
    };
  } else {
    return null;
  }
}
