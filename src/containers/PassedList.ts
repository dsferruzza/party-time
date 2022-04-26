import { DateTime } from 'luxon';
import { connect, ConnectedProps } from 'react-redux';

import { analyzeEvents } from '../lib/calendar';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  const analyzedEvents = analyzeEvents((typeof state.events === 'undefined') ? [] : state.events, state.config.timeMin, state.config.holidaysRegex, state.config.partialTimeOffRegex);
  return {
    days: analyzedEvents.filter(d => d.day <= DateTime.local()).sort((a, b) => {
      if (a.day < b.day) {
        return -1;
      } else if (a.day > b.day) {
        return 1;
      } else {
        return 0;
      }
    }),
  };
}

export const connector = connect(mapStateToProps, {});
export type PropsFromRedux = ConnectedProps<typeof connector>;
