import { DateTime } from 'luxon';

import { Event } from './events';

export interface StoreState {
  baseUrl: string
  config: {
    clientId: string
    timeMin: string
  }
  events?: Event[]
  googleOAuth: {
    accessToken: string
    expiresAt: string
  }
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

export const emptyStore: StoreState = {
  baseUrl,
  config: {
    clientId: '',
    timeMin: '',
  },
  googleOAuth: {
    accessToken: '',
    expiresAt: DateTime.local().toISO(),
  },
  menuOpenned: false,
  status: {
    msg: null
  },
}

export type Action = SetClientId | SetTimeMin | FetchCalendar | FetchCalendarError | ReceiveCalendar | ClearStatus | OpenMenu | CloseMenu | UpdateAccessToken;
export type ConfigAction = SetClientId | SetTimeMin;
export type MenuAction = OpenMenu | CloseMenu;

export interface SetClientId {
  type: 'SetClientId'
  clientId: string
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

export function reducer(state: StoreState, action: Action): StoreState {
  console.log('Reducer', action); // tslint:disable-line:no-console
  switch (action.type) {
    case 'SetClientId':
      return { ...state, config: { ...state.config, clientId: action.clientId }, googleOAuth: { ...state.googleOAuth, expiresAt: DateTime.local().toISO() } };
    case 'SetTimeMin':
      return { ...state, config: { ...state.config, timeMin: action.timeMin } };
    case 'FetchCalendarError':
      return { ...state, status: { ...state.status, msg: action.msg } };
    case 'ReceiveCalendar':
      return { ...state, events: action.events };
    case 'ClearStatus':
      return { ...state, status: { ...state.status, msg: null } };
    case 'OpenMenu':
      return { ...state, menuOpenned: true };
    case 'CloseMenu':
      return { ...state, menuOpenned: false };
    case 'UpdateAccessToken':
      return { ...state, googleOAuth: { accessToken: action.accessToken, expiresAt: action.expiresAt.toISO() } };
    default:
      return state;
  }
}
