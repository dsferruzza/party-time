import { DateTime } from 'luxon';
import { connect } from 'react-redux';

import List from '../components/List';
import { analyzeEvents } from '../lib/calendar';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  const analyzedEvents = analyzeEvents((typeof state.events === 'undefined') ? [] : state.events, state.config.timeMin, state.config.holidaysRegex, state.config.partialTimeOffRegex);
  return {
    days: analyzedEvents.filter(d => d.day >= DateTime.local().minus({ days: 1 })).sort((a, b) => {
      if (a.day < b.day) {
        return 1;
      } else if (a.day > b.day) {
        return -1;
      } else {
        return 0;
      }
    }),
  };
}

export default connect(mapStateToProps, null)(List);
