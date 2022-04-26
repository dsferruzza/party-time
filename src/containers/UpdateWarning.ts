import { connect, ConnectedProps } from 'react-redux';

import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    open: state.appUpdated,
  };
}

export const connector = connect(mapStateToProps, {});
export type PropsFromRedux = ConnectedProps<typeof connector>;
