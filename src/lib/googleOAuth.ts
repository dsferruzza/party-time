import { DateTime, Duration } from 'luxon';
import * as queryString from 'query-string';

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
      const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + queryString.stringify(qs);
      const popup = window.open(authUrl, authWindowName, `width=500,height=700,location=no,toolbar=no,menubar=no`);
      const windowWithAuthCallback = window as unknown as WindowWithAuthCallback;
      windowWithAuthCallback.authCallback = (rawHash: string) => {
        if (popup !== null) {
          popup.close();
        }
        if (rawHash !== '') {
          const hash = queryString.parse(rawHash);
          if (isValidHash(hash)) {
            const seconds = parseInt(hash.expires_in, 10) - 5;
            const expirationDate = DateTime.local().plus(Duration.fromObject({ seconds }));
            resolve({ accessToken: hash.access_token, expirationDate });
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

interface ValidHash {
  access_token: string
  expires_in: string
  state: string
}

function isValidHash(obj: any): obj is ValidHash {
  return typeof obj.access_token === 'string' && typeof obj.expires_in === 'string' && typeof obj.state === 'string';
}
