import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as Immutable from 'immutable';
import * as React from 'react';

import { ClassifiedDay, dayTypeColor } from '../lib/calendar';

const styles = createStyles({
});

interface Props extends WithStyles<typeof styles> {
  days: Immutable.List<ClassifiedDay>
}

function List(props: Props) {
  // const { classes } = props;

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

export default withStyles(styles)(List);
