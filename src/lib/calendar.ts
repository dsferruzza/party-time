import fetch from 'cross-fetch';
import { List } from 'immutable';
import { DateTime, Duration, Interval, Settings } from 'luxon';
import * as queryString from 'query-string';

import { Event, Events } from './events';
import { nonWorkingDays } from './nonWorkingDays';

Settings.defaultLocale = 'fr';

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

function computeDays(timeMin: string): List<DateTime> {
  const beginning = DateTime.fromISO(timeMin);
  const currentDay = DateTime.local();
  const interval = Interval.fromDateTimes(beginning, currentDay);
  const days = List(interval.splitBy(Duration.fromObject({ days: 1 }))).map(i => i.start);
  return days;
}

type DayTypes = "working" | "weekend" | "non-working" | "holiday" | "partial-time-off";
interface ClassifiedDay {
  day: DateTime
  type: DayTypes
}

function classifyDay(holidays: List<EventDay>, partialTimeOff: List<EventDay>, day: DateTime): ClassifiedDay {
  if (day.weekday >= 6) {
    return { day, type: "weekend" };
  } else if (nonWorkingDays(day.year).find(d => d.month === day.month && d.day === day.day)) {
    return { day, type: "non-working" };
  } else if (holidays.find(d => d.startDate.year === day.year && d.startDate.month === day.month && d.startDate.day === day.day)) {
    return { day, type: "holiday" };
  } else if (partialTimeOff.find(d => d.startDate.year === day.year && d.startDate.month === day.month && d.startDate.day === day.day)) {
    return { day, type: "partial-time-off" };
  } else {
    return { day, type: "working" }
  }
}

interface EventDay {
  startDate: DateTime
  summary: string
}

export function analyzeEvents(es: Event[], timeMin: string): void {
  const days = computeDays(timeMin);
  const events: List<EventDay> = List(es).filter(e => e.status === "confirmed").map(e => ({
    startDate: DateTime.fromISO(e.start.dateTime),
    summary: e.summary,
  }));
  const holidays = events.filter(e => /^Congés/.test(e.summary));
  const partialTimeOff = events.filter(e => /^Absent/.test(e.summary));
  const classifiedDays = days.map(d => classifyDay(holidays, partialTimeOff, d));
  console.log(classifiedDays.map(d => ({ day: d.day.toString(), type: d.type })).toArray()); // tslint:disable-line:no-console
  console.log(holidays.map(e => ({ day: e.startDate.toString(), summary: e.summary })).toArray()); // tslint:disable-line:no-console
}
