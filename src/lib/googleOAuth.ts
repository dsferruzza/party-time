import { DateTime, Duration } from 'luxon';
import * as queryString from 'query-string';
import { Store } from 'redux';
import { PersistPartial } from 'redux-persist'

import { Action, StoreState } from './state'

function getFullBaseUrl(baseUrl: string): string {
  const base = ((baseUrl === '/') ? '' : baseUrl);
  const a = document.createElement('a');
  a.href = '.';
  if (a.protocol === 'http:' || a.protocol === 'https:') {
    return `${a.protocol}//${a.hostname}${base}`;
  } else {
    return `${a.protocol}//${a.hostname}:${a.port}${base}`;
  }
}

export function getAccessToken(clientId: string, currentAccessToken: string, currentExpirationDate: DateTime, baseUrl: string): string {
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
    window.location.href = authUrl;
    return '';
  } else {
    return currentAccessToken;
  }
}

interface ValidHash {
  access_token: string
  expires_in: string
  state: string
}

function isValidHash(obj: any): obj is ValidHash {
  return typeof obj.access_token === "string" && typeof obj.expires_in === "string" && typeof obj.state === "string";
}

export function storeUrlHash(store: Store<StoreState & PersistPartial, Action> & { dispatch: {} }): void {
  const rawHash = window.location.hash;
  if (rawHash !== '') {
    const hash = queryString.parse(rawHash);
    if (isValidHash(hash)) {
      const seconds = parseInt(hash.expires_in, 10) - 5;
      const expirationDate = DateTime.local().plus(Duration.fromObject({ seconds }));
      store.dispatch({ type: 'UpdateAccessToken', accessToken: hash.access_token, expiresAt: expirationDate });
      window.location.href = `${process.env.PUBLIC_URL}${hash.state}`;
    }
  }
}
