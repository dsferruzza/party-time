import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Config from '../components/Config';
import { ConfigAction, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    clientId: state.config.clientId,
    dueWorkDays: state.config.dueWorkDays,
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
    onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetTimeMin', timeMin: e.currentTarget.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
