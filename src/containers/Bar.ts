import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Bar from '../components/Bar';
import { analyzeEvents, fetchCalendar, parseEvents } from '../lib/calendar';
import { FetchCalendar, FetchCalendarError, MenuAction, ReceiveCalendar, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    menuOpenned: state.menuOpenned,
  };
}

type Action = FetchCalendar | FetchCalendarError | ReceiveCalendar;
type ThunkResult<R> = ThunkAction<R, StoreState, undefined, Action>;
type MyThunkDispatch = ThunkDispatch<StoreState, undefined, Action>;

function updateCalendar(): ThunkResult<void> {
  return async (dispatch, getState) => {
    const accessToken = getState().config.accessToken;
    if (accessToken !== '') {
      const timeMin = getState().config.timeMin;
      fetchCalendar(accessToken, timeMin).then((data: string) => {
        const events = parseEvents(data).items;
        analyzeEvents(events, timeMin);
        dispatch({ type: 'ReceiveCalendar', calendarPayload: data, events });
      }, (error: Error | string) => {
        const msg: string = (error instanceof Error) ? `${error.name}: ${error.message}` : error;
        dispatch({ type: 'FetchCalendarError', msg })
      });
    } else {
      dispatch({ type: 'FetchCalendarError', msg: "Le token d'accès est vide !" });
    }
  }
}

function toggleMenu(): ThunkAction<void, StoreState, undefined, MenuAction> {
  return async (dispatch, getState) => {
    if (getState().menuOpenned) {
      dispatch({ type: 'CloseMenu' });
    } else {
      dispatch({ type: 'OpenMenu' });
    }
  }
}

function mapDispatchToProps(dispatch: MyThunkDispatch) {
  return {
    onReloadClick: () => {
      dispatch({ type: 'FetchCalendar' });
      dispatch(updateCalendar());
    },
    toggleMenu: () => dispatch(toggleMenu()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
