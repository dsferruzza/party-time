import { List } from 'immutable';
import { connect } from 'react-redux';

import ByMonth from '../components/ByMonth';
import { analyzeEvents, monthSummary } from '../lib/calendar';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  const analyzedEvents = analyzeEvents((typeof state.events === 'undefined') ? [] : state.events, state.config.timeMin);
  return {
    monthSummary: List(monthSummary(analyzedEvents).values()).sort((a, b) => {
      if (a.month < b.month) {
        return 1;
      } else if (a.month > b.month) {
        return -1;
      } else {
        return 0;
      }
    }),
  };
}

export default connect(mapStateToProps, null)(ByMonth);
