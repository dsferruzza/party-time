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
      return fetch(getState().config.calendarUrl, { mode: 'cors', headers: new Headers({'Content-Type': 'text/calendar'}) })
        .then((res: Response) => {
          if (res.status === 200) {
            return res.text();
          } else {
            return Promise.reject(`L'URL du calendrier a renvoyé le code d'erreur ${res.status} (${res.statusText})`);
          }
        })
        .then((data: string) => {
          dispatch({ type: 'ReceiveCalendar', calendarPayload: data });
        }, (error: Error | string) => {
          const msg: string = (error instanceof Error) ? `${error.name}: ${error.message}` : error;
          dispatch({ type: 'FetchCalendarError', msg })
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
