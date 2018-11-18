import { connect } from 'react-redux';

import List from '../components/List';
import { analyzeEvents } from '../lib/calendar';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  return {
    days: analyzeEvents((typeof state.events === 'undefined') ? [] : state.events, state.config.timeMin),
  };
}

export default connect(mapStateToProps, null)(List);
