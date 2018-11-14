import fetch from 'cross-fetch';
import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Bar from '../components/Bar';
import { FetchCalendar, FetchCalendarError, ReceiveCalendar, StoreState } from '../lib/state';

type Action = FetchCalendar | FetchCalendarError | ReceiveCalendar;
type ThunkResult<R> = ThunkAction<R, StoreState, undefined, Action>;
type MyThunkDispatch = ThunkDispatch<StoreState, undefined, Action>;

function fetchCalendar(): ThunkResult<void> {
  return async (dispatch, getState) => {
    const calendarUrl = getState().config.calendarUrl;
    if (calendarUrl !== '') {
      return fetch(getState().config.calendarUrl)
        .then((res: Response) => {
          if (res.status) {
            return res.text();
          } else {
            return Promise.reject(`L'URL du calendrier a renvoyé le code d'erreur ${res.status} (${res.statusText})`);
          }
        })
        .then((data: string) => {
          dispatch({ type: 'ReceiveCalendar', calendarPayload: data });
        }, (msg: Error | string) => {
          const msgStr: string = (msg instanceof Error) ? `${msg.name}: ${msg.message}` : msg;
          dispatch({ type: 'FetchCalendarError', msg: msgStr })
        });
    } else {
      dispatch({ type: 'FetchCalendarError', msg: "L'URL du calendrier est vide" });
    }
  }
}

function mapDispatchToProps(dispatch: MyThunkDispatch) {
  return {
    onReloadClick: () => {
      dispatch({ type: 'FetchCalendar' });
      dispatch(fetchCalendar());
    },
  };
}

export default connect(null, mapDispatchToProps)(Bar);
