import fetch from 'cross-fetch';
import * as queryString from 'query-string';

import { Events } from './events';

export function fetchCalendar(accessToken: string, timeMin: string): Promise<string> {
  const qs = {
    access_token: accessToken,
    maxResults: 2500,
  };
  if (timeMin !== '') {
    Object.assign(qs, { timeMin });
  }
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?' + queryString.stringify(qs);
  const options: RequestInit = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    mode: 'cors',
  };
  return fetch(url, options).then((res: Response) => {
    if (res.status === 200) {
      return res.text();
    } else {
      return Promise.reject(`La récupération du calendrier a renvoyé le code d'erreur ${res.status} (${res.statusText})`);
    }
  });
}

export function parseEvents(payload: string): Events {
  const json = JSON.parse(payload);
  return json as Events;
}
