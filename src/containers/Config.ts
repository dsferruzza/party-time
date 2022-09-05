import { FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

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
    onClientIdChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetClientId', clientId: e.currentTarget.value }),
    onDueWorkDaysChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const n = parseInt(e.currentTarget.value, 10);
      if (!isNaN(n) && n < 365 && n >= 0) {
        dispatch({ type: 'SetDueWorkDays', dueWorkDays: n });
      }
    },
    onHolidaysChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const n = parseInt(e.currentTarget.value, 10);
      if (!isNaN(n) && n < 365 && n >= 0) {
        dispatch({ type: 'SetHolidays', holidays: n });
      }
    },
    onHolidaysRegexChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetHolidaysRegexChange', holidaysRegex: e.currentTarget.value }),
    onPartialTimeOffRegexChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetPartialTimeOffRegex', partialTimeOffRegex: e.currentTarget.value }),
    onTimeMinChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetTimeMin', timeMin: e.currentTarget.value }),
  };
}

export const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
