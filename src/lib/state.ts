export interface StoreState {
  config: {
    accessToken: string
    timeMin: string
  }
  status: {
    msg: string | null
  }
  fetchedCalendar?: object
}

export const emptyStore: StoreState = {
  config: {
    accessToken: '',
    timeMin: '',
  },
  status: {
    msg: null
  }
}

export type Action = SetAccessToken | SetTimeMin | FetchCalendar | FetchCalendarError | ReceiveCalendar | ClearStatus;
export type ConfigAction = SetAccessToken | SetTimeMin;

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
}

export interface ClearStatus {
  type: 'ClearStatus'
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
    default:
      return state;
  }
}
