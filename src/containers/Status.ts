import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

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

export const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
