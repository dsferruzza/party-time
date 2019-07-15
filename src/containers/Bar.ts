import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Bar from '../components/Bar';
import { fetchCalendar, parseEvents } from '../lib/calendar';
import { getAccessToken } from '../lib/googleOAuth';
import { FetchCalendar, FetchCalendarError, MenuAction, ReceiveCalendar, StoreState, UpdateAccessToken } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    menuOpenned: state.menuOpenned,
  };
}

type Action = FetchCalendar | FetchCalendarError | ReceiveCalendar | UpdateAccessToken;
type ThunkResult<R> = ThunkAction<R, StoreState, undefined, Action>;
type MyThunkDispatch = ThunkDispatch<StoreState, undefined, Action>;

function updateCalendar(): ThunkResult<void> {
  return async (dispatch, getState) => {
    const clientId = getState().config.clientId;
    if (clientId !== '') {
      const currentAccessToken = getState().googleOAuth.accessToken;
      const currentExpirationDate = DateTime.fromISO(getState().googleOAuth.expiresAt);
      const baseUrl = getState().baseUrl;
      getAccessToken(clientId, currentAccessToken, currentExpirationDate, baseUrl).then(token => {
        const accessToken = token.accessToken;
        if (accessToken !== currentAccessToken) {
          dispatch({ type: 'UpdateAccessToken', accessToken, expiresAt: token.expirationDate });
        }
        const timeMin = getState().config.timeMin;
        fetchCalendar(accessToken, timeMin).then((data: string) => {
          const events = parseEvents(data).items;
          dispatch({ type: 'ReceiveCalendar', calendarPayload: data, events });
        }, (error: Error | string) => {
          const msg: string = (error instanceof Error) ? `${error.name}: ${error.message}` : error;
          dispatch({ type: 'FetchCalendarError', msg });
        });
      });
    } else {
      dispatch({ type: 'FetchCalendarError', msg: "L'identifiant client est vide !" });
    }
  };
}

function toggleMenu(): ThunkAction<void, StoreState, undefined, MenuAction> {
  return async (dispatch, getState) => {
    if (getState().menuOpenned) {
      dispatch({ type: 'CloseMenu' });
    } else {
      dispatch({ type: 'OpenMenu' });
    }
  };
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
