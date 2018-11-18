import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Config from '../components/Config';
import { ConfigAction, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    clientId: state.config.clientId,
    timeMin: state.config.timeMin,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ConfigAction>) {
  return {
    onClientIdChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetClientId', clientId: e.currentTarget.value }),
    onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'SetTimeMin', timeMin: e.currentTarget.value }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
