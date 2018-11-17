import { Event } from './events';

export interface StoreState {
  config: {
    accessToken: string
    timeMin: string
  }
  events?: Event[]
  menuOpenned: boolean
  status: {
    msg: string | null
  }
}

export const emptyStore: StoreState = {
  config: {
    accessToken: '',
    timeMin: '',
  },
  menuOpenned: false,
  status: {
    msg: null
  },
}

export type Action = SetAccessToken | SetTimeMin | FetchCalendar | FetchCalendarError | ReceiveCalendar | ClearStatus | OpenMenu | CloseMenu;
export type ConfigAction = SetAccessToken | SetTimeMin;
export type MenuAction = OpenMenu | CloseMenu;

export interface SetAccessToken {
  type: 'SetAccessToken'
  accessToken: string
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

export function reducer(state: StoreState, action: Action): StoreState {
  console.log('Reducer', action); // tslint:disable-line:no-console
  switch (action.type) {
    case 'SetAccessToken':
      return { ...state, config: { ...state.config, accessToken: action.accessToken } };
    case 'SetTimeMin':
      return { ...state, config: { ...state.config, timeMin: action.timeMin } };
    case 'FetchCalendarError':
      return { ...state, status: { ...state.status, msg: action.msg } };
    case 'ClearStatus':
      return { ...state, status: { ...state.status, msg: null } };
    case 'OpenMenu':
      return { ...state, menuOpenned: true };
    case 'CloseMenu':
      return { ...state, menuOpenned: false };
    default:
      return state;
  }
}
