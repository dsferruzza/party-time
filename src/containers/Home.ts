import { DateTime } from 'luxon';
import { connect } from 'react-redux';

import Home from '../components/Home';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    configured: state.config.clientId !== '',
    lastFetch: (state.lastFetch !== null) ? DateTime.fromISO(state.lastFetch) : null,
  };
}

export default connect(mapStateToProps, null)(Home);
