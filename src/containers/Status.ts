import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Status from '../components/Status';
import { ClearStatus, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    msg: state.status.msg,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ClearStatus>) {
  return {
    onClose: () => dispatch({ type: 'ClearStatus' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
