import { DateTime } from 'luxon';
import { connect, ConnectedProps } from 'react-redux';

import { analyzeEvents, daysOffBalance, yearSummary } from '../lib/calendar';
import { StoreState } from '../lib/state';

function mapStateToProps(state: StoreState) {
  const analyzedEvents = analyzeEvents((typeof state.events === 'undefined') ? [] : state.events, state.config.timeMin, state.config.holidaysRegex, state.config.partialTimeOffRegex);
  const ys = yearSummary(analyzedEvents, DateTime.fromISO(state.config.timeMin), state.config.dueWorkDays, state.config.holidays).sort((a, b) => {
    if (a.startDate < b.startDate) {
      return 1;
    } else if (a.startDate > b.startDate) {
      return -1;
    } else {
      return 0;
    }
  }).map(s => {
    s.monthSummaries = s.monthSummaries.sort((a, b) => {
      if (a.month < b.month) {
        return 1;
      } else if (a.month > b.month) {
        return -1;
      } else {
        return 0;
      }
    }).skipWhile(ms => ms.month > DateTime.local() && ms.partialTimeOffDays <= 0);
    return s;
  });
  const currentYear = ys.find(y => y.startDate.until(y.startDate.plus({ years: 1 }).minus({ days: 1 })).contains(DateTime.local()));
  const balance = (currentYear !== undefined) ? daysOffBalance(currentYear.startDate, currentYear.totalPartialTimeOffDays, analyzedEvents.filter(e => currentYear.startDate.until(DateTime.local()).contains(e.day))) : 0;
  return {
    daysOffBalance: balance,
    yearSummary: ys,
  };
}

export const connector = connect(mapStateToProps, {});
export type PropsFromRedux = ConnectedProps<typeof connector>;
