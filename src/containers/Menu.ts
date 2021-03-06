import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Menu from '../components/Menu';
import { MenuAction, StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    lastFetch: (state.lastFetch !== null) ? DateTime.fromISO(state.lastFetch) : null,
    open: state.menuOpenned,
  };
}

function mapDispatchToProps(dispatch: Dispatch<MenuAction>) {
  return {
    onClose: () => dispatch({ type: 'CloseMenu' }),
    onOpen: () => dispatch({ type: 'OpenMenu' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
