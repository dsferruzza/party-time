import { fetch } from 'cross-fetch';
import { List } from 'immutable';
import { DateTime, Duration, Interval, Settings } from 'luxon';
import * as queryString from 'query-string';

import { Event, Events } from './events';
import { nonWorkingDays } from './nonWorkingDays';

Settings.defaultLocale = 'fr';

export async function fetchCalendar(accessToken: string, timeMin: string): Promise<string> {
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

function computeDays(timeMin: DateTime, timeMax: DateTime): List<DateTime> {
  const interval = Interval.fromDateTimes(timeMin, timeMax);
  const days = List(interval.splitBy(Duration.fromObject({ days: 1 }))).map(i => i.start);
  return days;
}

type DayType = 'working' | 'weekend' | 'non-working' | 'holiday' | 'partial-time-off';

export interface ClassifiedDay {
  day: DateTime
  type: DayType
}

function classifyDay(holidays: List<DayOffEvent>, partialTimeOff: List<DayOffEvent>, day: DateTime): ClassifiedDay {
  const ajustedDay = day.set({ hour: 12 });
  if (day.weekday >= 6) {
    return { day, type: 'weekend' };
  } else if (nonWorkingDays(day.year).find(d => d.month === day.month && d.day === day.day)) {
    return { day, type: 'non-working' };
  } else if (holidays.find(d => Interval.fromDateTimes(d.startDate, d.endDate).contains(ajustedDay))) {
    return { day, type: 'holiday' };
  } else if (partialTimeOff.find(d => Interval.fromDateTimes(d.startDate, d.endDate).contains(ajustedDay))) {
    return { day, type: 'partial-time-off' };
  } else {
    return { day, type: 'working' };
  }
}

interface DayOffEvent {
  endDate: DateTime
  startDate: DateTime
  summary: string
}

export function analyzeEvents(es: Event[], timeMinStr: string, holidaysRegex: string, partialTimeOffRegex: string): List<ClassifiedDay> {
  const events: List<DayOffEvent> = List(es).filter(e => e.status === 'confirmed').map(e => ({
    endDate: DateTime.fromISO(e.end.dateTime),
    startDate: DateTime.fromISO(e.start.dateTime),
    summary: e.summary,
  }));
  const holidays = events.filter(e => RegExp(holidaysRegex).test(e.summary));
  const partialTimeOff = events.filter(e => RegExp(partialTimeOffRegex).test(e.summary));
  const timeMin = DateTime.fromISO(timeMinStr);
  const eventTimeMax = holidays.concat(partialTimeOff).reduce((acc, cur) => (cur.endDate > acc) ? cur.endDate : acc, DateTime.local()).endOf('month');
  const potentialTimeMax = timeMin.set({ year: eventTimeMax.get('year') }).minus({ days: 1 });
  const timeMax = (potentialTimeMax >= eventTimeMax) ? potentialTimeMax : potentialTimeMax.plus({ years: 1 });
  const days = computeDays(timeMin, timeMax);
  const classifiedDays = days.map(d => classifyDay(holidays, partialTimeOff, d));
  return classifiedDays;
}

export function dayTypeColor(type: DayType): string {
  switch (type) {
    case 'working':
      return 'skyblue';
    case 'partial-time-off':
      return 'gold';
    case 'holiday':
      return 'palegreen';
    case 'weekend':
      return 'gray';
    case 'non-working':
      return 'silver';
  }
}

export interface MonthSummary {
  month: DateTime
  totalWorkingDays: number
  workedDays: number
  holidays: number
  partialTimeOffDays: number
}

export function monthSummary(classifiedDays: List<ClassifiedDay>): List<MonthSummary> {
  const grouped = classifiedDays.groupBy(d => d.day.startOf('month').toISO()).map(v => List(v.values()));
  const withSummary = grouped.map((days, monthStr) => {
    const totalWorkingDays = days.count(d => d.type !== 'weekend' && d.type !== 'non-working');
    const holidays = days.count(d => d.type === 'holiday');
    const partialTimeOffDays = days.count(d => d.type === 'partial-time-off');
    const workedDays = totalWorkingDays - holidays - partialTimeOffDays;
    return {
      holidays,
      month: DateTime.fromISO(monthStr),
      partialTimeOffDays,
      totalWorkingDays,
      workedDays,
    };
  });
  return List(withSummary.values());
}

export interface YearSummary {
  consumedPartialTimeOffDaysSeries: List<Point>
  earnedPartialTimeOffDaysSeries: List<Point>
  holidays: number
  monthSummaries: List<MonthSummary>
  partialTimeOffDays: number
  startDate: DateTime
  totalPartialTimeOffDays: number
  totalWorkingDays: number
  workedDays: number
}

export interface Point {
  x: DateTime
  y: number
}

function generateEarnedPartialTimeOffDaysSeries(days: List<ClassifiedDay>, totalPartialTimeOffDays: number): List<Point> {
  const sortedDays = days.sort((a, b) => {
    if (a.day < b.day) {
      return -1;
    } else if (a.day > b.day) {
      return 1;
    } else {
      return 0;
    }
  });
  const numberOfDays = sortedDays.count();
  const gainPerDay = totalPartialTimeOffDays / numberOfDays;
  return sortedDays.reduce((acc, cur) => {
    const point = { x: cur.day, y: acc.nextValue };
    return {
      nextValue: acc.nextValue + gainPerDay,
      series: acc.series.push(point),
    };
  }, { series: List<Point>(), nextValue: 0 }).series;
}

function generateConsumedPartialTimeOffDaysSeries(days: List<ClassifiedDay>): List<Point> {
  const sortedDays = days.sort((a, b) => {
    if (a.day < b.day) {
      return -1;
    } else if (a.day > b.day) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedDays.reduce((acc, cur) => {
    const point = { x: cur.day, y: acc.nextValue };
    return {
      nextValue: acc.nextValue + ((cur.type === 'partial-time-off') ? 1 : 0),
      series: acc.series.push(point),
    };
  }, { series: List<Point>(), nextValue: 0 }).series;
}

export function yearSummary(classifiedDays: List<ClassifiedDay>, timeMin: DateTime, dueWorkDays: number, dueHolidays: number): List<YearSummary> {
  const diffToLowerYear = timeMin.diff(timeMin.startOf('year'));
  const grouped = classifiedDays.groupBy(d => d.day.minus(diffToLowerYear).get('year')).map(v => List(v.values()));
  const withSummary = grouped.map((days, startYearStr) => {
    const totalWorkingDays = days.count(d => d.type !== 'weekend' && d.type !== 'non-working');
    const holidays = days.count(d => d.type === 'holiday');
    const partialTimeOffDays = days.count(d => d.type === 'partial-time-off');
    const workedDays = totalWorkingDays - holidays - partialTimeOffDays;
    const totalPartialTimeOffDays = totalWorkingDays - dueWorkDays - dueHolidays;
    const ms = monthSummary(days);
    const earnedPartialTimeOffDaysSeries = generateEarnedPartialTimeOffDaysSeries(days, totalPartialTimeOffDays);
    const consumedPartialTimeOffDaysSeries = generateConsumedPartialTimeOffDaysSeries(days);
    return {
      consumedPartialTimeOffDaysSeries,
      earnedPartialTimeOffDaysSeries,
      holidays,
      monthSummaries: ms,
      partialTimeOffDays,
      startDate: timeMin.set({ year: startYearStr }),
      totalPartialTimeOffDays,
      totalWorkingDays,
      workedDays,
    };
  });
  return List(withSummary.values());
}

export function daysOffBalance(startDate: DateTime, totalPartialTimeOffDays: number, days: List<ClassifiedDay>): number {
  const daysInYear = Math.floor(startDate.diff(startDate.plus({ years: 1 }).minus({ days: 1 }), 'days').negate().get('days'));
  const passedDays = Math.floor(startDate.diffNow('days').negate().get('days'));
  const expectedDaysOff = Math.floor(totalPartialTimeOffDays * passedDays / daysInYear);
  return expectedDaysOff - days.count(d => d.type === 'partial-time-off');
}
