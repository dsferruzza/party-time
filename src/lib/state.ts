import { DateTime } from 'luxon';
import { PersistState } from 'redux-persist';

import { Event } from './events';

export interface StoreState {
  appUpdated: boolean
  baseUrl: string
  config: {
    clientId: string
    dueWorkDays: number
    holidays: number
    holidaysRegex: string
    partialTimeOffRegex: string
    timeMin: string
  }
  events?: Event[]
  googleOAuth: {
    accessToken: string
    expiresAt: string
  }
  lastFetch: string | null
  menuOpenned: boolean
  status: {
    msg: string | null
  }
}

const publicUrl = process.env.PUBLIC_URL;
function getBase(url: string): string {
  const a = document.createElement('a');
  a.href = url;
  return a.pathname;
}
const baseUrl = (typeof publicUrl === 'undefined' || publicUrl === '') ? '/' : getBase(publicUrl);

export const emptyStore = {
  appUpdated: false,
  baseUrl,
  config: {
    clientId: '',
    dueWorkDays: 218,
    holidays: 25,
    holidaysRegex: '^Congés',
    partialTimeOffRegex: '^Absent|^RTT',
    timeMin: '',
  },
  googleOAuth: {
    accessToken: '',
    expiresAt: DateTime.local().toISO(),
  },
  lastFetch: null,
  menuOpenned: false,
  status: {
    msg: null,
  },
} as StoreState & { _persist: PersistState };

export type Action = SetClientId | SetDueWorkDays | SetHolidays | SetHolidaysRegexChange | SetPartialTimeOffRegex | SetTimeMin | FetchCalendar | FetchCalendarError | ReceiveCalendar | ClearStatus | OpenMenu | CloseMenu | UpdateAccessToken | AppUpdated;
export type ConfigAction = SetClientId | SetDueWorkDays | SetHolidays | SetHolidaysRegexChange | SetPartialTimeOffRegex | SetTimeMin;
export type MenuAction = OpenMenu | CloseMenu;

export interface SetClientId {
  type: 'SetClientId'
  clientId: string
}

export interface SetDueWorkDays {
  type: 'SetDueWorkDays'
  dueWorkDays: number
}

export interface SetHolidays {
  type: 'SetHolidays'
  holidays: number
}

export interface SetHolidaysRegexChange {
  type: 'SetHolidaysRegexChange'
  holidaysRegex: string
}

export interface SetPartialTimeOffRegex {
  type: 'SetPartialTimeOffRegex'
  partialTimeOffRegex: string
}

export interface SetTimeMin {
  type: 'SetTimeMin'
  timeMin: string
}

export interface FetchCalendar {
  type: 'FetchCalendar'
}

export interface FetchCalendarError {
  type: 'FetchCalendarError'
  msg: string
}

export interface ReceiveCalendar {
  type: 'ReceiveCalendar'
  calendarPayload: string
  events: Event[]
}

export interface ClearStatus {
  type: 'ClearStatus'
}

export interface OpenMenu {
  type: 'OpenMenu'
}

export interface CloseMenu {
  type: 'CloseMenu'
}

export interface UpdateAccessToken {
  type: 'UpdateAccessToken'
  accessToken: string
  expiresAt: DateTime
}

export interface AppUpdated {
  type: 'AppUpdated'
}

export function reducer(state: StoreState | undefined, action: Action): StoreState {
  if (!state) {
    state = emptyStore;
  }
  switch (action.type) {
    case 'SetClientId':
      return { ...state, config: { ...state.config, clientId: action.clientId }, googleOAuth: { ...state.googleOAuth, expiresAt: DateTime.local().toISO() } };
    case 'SetDueWorkDays':
      return { ...state, config: { ...state.config, dueWorkDays: action.dueWorkDays } };
    case 'SetHolidays':
      return { ...state, config: { ...state.config, holidays: action.holidays } };
    case 'SetHolidaysRegexChange':
      return { ...state, config: { ...state.config, holidaysRegex: action.holidaysRegex } };
    case 'SetPartialTimeOffRegex':
      return { ...state, config: { ...state.config, partialTimeOffRegex: action.partialTimeOffRegex } };
    case 'SetTimeMin':
      return { ...state, config: { ...state.config, timeMin: action.timeMin } };
    case 'FetchCalendarError':
      return { ...state, status: { ...state.status, msg: action.msg } };
    case 'ReceiveCalendar':
      return { ...state, events: action.events, lastFetch: DateTime.local().toISO() };
    case 'ClearStatus':
      return { ...state, status: { ...state.status, msg: null } };
    case 'OpenMenu':
      return { ...state, menuOpenned: true };
    case 'CloseMenu':
      return { ...state, menuOpenned: false };
    case 'UpdateAccessToken':
      return { ...state, googleOAuth: { accessToken: action.accessToken, expiresAt: action.expiresAt.toISO() } };
    case 'AppUpdated':
      return { ...state, appUpdated: true };
    default:
      return state;
  }
}
