import fetch from 'cross-fetch';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Bar from '../components/Bar';
import { FetchCalendar, FetchCalendarError, ReceiveCalendar, StoreState } from '../lib/state';

type Action = FetchCalendar | FetchCalendarError | ReceiveCalendar;
type ThunkResult<R> = ThunkAction<R, StoreState, undefined, Action>;
type MyThunkDispatch = ThunkDispatch<StoreState, undefined, Action>;

function fetchCalendar(): ThunkResult<void> {
  return async (dispatch, getState) => {
    const accessToken = getState().config.accessToken;
    if (accessToken !== '') {
      const timeMin = getState().config.timeMin;
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
      return fetch(url, options)
        .then((res: Response) => {
          if (res.status === 200) {
            return res.text();
          } else {
            return Promise.reject(`La récupération du calendrier a renvoyé le code d'erreur ${res.status} (${res.statusText})`);
          }
        })
        .then((data: string) => {
          dispatch({ type: 'ReceiveCalendar', calendarPayload: data });
        }, (error: Error | string) => {
          const msg: string = (error instanceof Error) ? `${error.name}: ${error.message}` : error;
          dispatch({ type: 'FetchCalendarError', msg })
        });
    } else {
      dispatch({ type: 'FetchCalendarError', msg: "Le token d'accès est vide !" });
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
