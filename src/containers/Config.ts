import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Config from '../components/Config';
import { ConfigAction, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    clientId: state.config.clientId,
    dueWorkDays: state.config.dueWorkDays,
    holidays: state.config.holidays,
    holidaysRegex: state.config.holidaysRegex,
    partialTimeOffRegex: state.config.partialTimeOffRegex,
    timeMin: state.config.timeMin,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ConfigAction>) {
  return {
    onClientIdChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetClientId', clientId: e.currentTarget.value }),
    onDueWorkDaysChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const n = parseInt(e.currentTarget.value, 10);
      if (!isNaN(n) && n < 365 && n >= 0) {
        dispatch({ type: 'SetDueWorkDays', dueWorkDays: n });
      }
    },
    onHolidaysChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const n = parseInt(e.currentTarget.value, 10);
      if (!isNaN(n) && n < 365 && n >= 0) {
        dispatch({ type: 'SetHolidays', holidays: n });
      }
    },
    onHolidaysRegexChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetHolidaysRegexChange', holidaysRegex: e.currentTarget.value }),
    onPartialTimeOffRegexChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetPartialTimeOffRegex', partialTimeOffRegex: e.currentTarget.value }),
    onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetTimeMin', timeMin: e.currentTarget.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
