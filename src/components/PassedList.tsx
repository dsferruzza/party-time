import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as Immutable from 'immutable';

import { PropsFromRedux, connector } from '../containers/PassedList';
import { ClassifiedDay, dayTypeColor } from '../lib/calendar';

type Props = PropsFromRedux & {
  days: Immutable.List<ClassifiedDay>
};

function PassedList(props: Props) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.days.reverse().map(d => {
            return (
              <TableRow key={d.day.toISODate()} style={{ backgroundColor: dayTypeColor(d.type) }}>
                <TableCell>{d.day.toFormat('dd/LL/yyyy')}</TableCell>
                <TableCell>{d.type}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connector(PassedList);
