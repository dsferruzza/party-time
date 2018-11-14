export interface StoreState {
  config: {
    calendarUrl: string
  }
  status: {
    msg: string | null
  }
  fetchedCalendar?: object
}

export const emptyStore: StoreState = {
  config: {
    calendarUrl: '',
  },
  status: {
    msg: null
  }
}

export type Action = SetCalendarUrl | FetchCalendar | FetchCalendarError | ReceiveCalendar | ClearStatus;

export interface SetCalendarUrl {
  type: 'SetCalendarUrl'
  calendarUrl: string
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
    case 'SetCalendarUrl':
      return { ...state, config: { ...state.config, calendarUrl: action.calendarUrl } };
    case 'FetchCalendarError':
      return { ...state, status: { ...state.status, msg: action.msg } };
    case 'ClearStatus':
      return { ...state, status: { ...state.status, msg: null } };
    default:
      return state;
  }
}
