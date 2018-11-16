import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Bar from '../components/Bar';
import { fetchCalendar } from '../lib/calendar';
import { FetchCalendar, FetchCalendarError, ReceiveCalendar, StoreState } from '../lib/state';

type Action = FetchCalendar | FetchCalendarError | ReceiveCalendar;
type ThunkResult<R> = ThunkAction<R, StoreState, undefined, Action>;
type MyThunkDispatch = ThunkDispatch<StoreState, undefined, Action>;

function updateCalendar(): ThunkResult<void> {
  return async (dispatch, getState) => {
    const accessToken = getState().config.accessToken;
    if (accessToken !== '') {
      const timeMin = getState().config.timeMin;
      fetchCalendar(accessToken, timeMin).then((data: string) => {
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
      dispatch(updateCalendar());
    },
  };
}

export default connect(null, mapDispatchToProps)(Bar);
