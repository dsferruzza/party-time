import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Config from '../components/Config';
import { SetCalendarUrl, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    calendarUrl: state.config.calendarUrl,
  };
}

function mapDispatchToProps(dispatch: Dispatch<SetCalendarUrl>) {
  return {
    onConfigChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetCalendarUrl', calendarUrl: e.currentTarget.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
