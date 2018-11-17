import { connect } from 'react-redux';

import Home from '../components/Home';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    configured: state.config.accessToken !== '',
  };
}

export default connect(mapStateToProps, null)(Home);
