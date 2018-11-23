import { connect } from 'react-redux';

import UpdateWarning from '../components/UpdateWarning';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    open: state.appUpdated,
  };
}

export default connect(mapStateToProps, null)(UpdateWarning);
