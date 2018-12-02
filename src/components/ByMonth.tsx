import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { List as ImmutableList } from 'immutable';
import * as React from 'react';

import { MonthSummary } from '../lib/calendar';
import { PieChart } from './PieChart';
import './pieChartColors.css';

const styles = createStyles({
});

interface Props extends WithStyles<typeof styles> {
  monthSummary: ImmutableList<MonthSummary>
}

function ByMonth(props: Props) {
  // const { classes } = props;
  const cards = props.monthSummary.map(ms => {
    const data = {
      labels: ['ON', 'OFF', 'CP'],
      series: [ms.workedDays, ms.partialTimeOffDays, ms.holidays],
    };
    const options = {
      chartPadding: 0,
      donut: true,
      donutWidth: 30,
      ignoreEmptyValues: true,
      showLabel: true,
      startAngle: 270,
      total: ms.totalWorkingDays * 2,
    };
    return <Grid item={true} xs={12} sm={6} md={4} lg={3} xl={2} key={ms.month.toISO()}>
      <Card>
        <CardHeader title={ms.month.toFormat('LLLL yyyy')} />
        <CardContent>
          <PieChart className="ct-party-time" data={data} options={options} />
          <Typography>
            <strong>Jours ouvrés :</strong> {ms.totalWorkingDays}
          </Typography>
          <Typography>
            <strong>Jours travaillés :</strong> {ms.workedDays}
          </Typography>
          <Typography>
            <strong>Jours off temps partiel :</strong> {ms.partialTimeOffDays}
          </Typography>
          <Typography>
            <strong>Jours de congé :</strong> {ms.holidays}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  });

  return (
    <Grid container={true} spacing={16}>
      {cards}
    </Grid>
  )
}

export default withStyles(styles)(ByMonth);
