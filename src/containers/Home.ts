import { DateTime } from 'luxon';
import { connect, ConnectedProps } from 'react-redux';

import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    configured: state.config.clientId !== '',
    lastFetch: (state.lastFetch !== null) ? DateTime.fromISO(state.lastFetch) : null,
  };
}

export const connector = connect(mapStateToProps, {});
export type PropsFromRedux = ConnectedProps<typeof connector>;
