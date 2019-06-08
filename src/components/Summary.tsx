import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Chartist from 'chartist';
import { List as ImmutableList } from 'immutable';
import { DateTime } from 'luxon';
import * as React from 'react';

import { YearSummary } from '../lib/calendar';
import './chartsColors.css';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

const styles = createStyles({
});

interface Props extends WithStyles<typeof styles> {
  daysOffBalance: number
  yearSummary: ImmutableList<YearSummary>
}

function Summary(props: Props) {
  // const { classes } = props;
  const sections = props.yearSummary.map((ys, k) => {
    const cards = ys.monthSummaries.map(ms => {
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
    const isCurrentYear = ys.startDate.until(ys.startDate.plus({ years: 1 }).minus({ days: 1 })).contains(DateTime.local());
    const isExpanded = isCurrentYear;
    const daysOffleft = ys.totalPartialTimeOffDays - ys.partialTimeOffDays;
    const balance = isCurrentYear ? <Typography>Jours off temps partiel au {DateTime.local().toFormat('dd/LL/yyyy')} : <strong>{(props.daysOffBalance > 0) ? `+${props.daysOffBalance}` : props.daysOffBalance}</strong></Typography> : '';
    const partialTimeOffDaysGraphOption = {
      axisX: {
        labelInterpolationFnc: (value: number) => {
          return DateTime.fromMillis(value).toFormat('d LLL');
        },
        scaleMinSpace: 40,
        type: Chartist.AutoScaleAxis,
      },
      height: 300,
      series: {
        'earnedPartialTimeOffDaysSeries': {
          showArea: true,
        },
      },
      showPoint: false,
    };
    const todaySeries = [
      { x: DateTime.local(), y: 0 },
      { x: DateTime.local().plus({ milliseconds: 1 }), y: ys.totalPartialTimeOffDays },
    ];
    const partialTimeOffDaysGraphData = {
      series: [
        { name: 'earnedPartialTimeOffDaysSeries', data: ys.earnedPartialTimeOffDaysSeries.toArray() },
        { name: 'consumedPartialTimeOffDaysSeries', data: ys.consumedPartialTimeOffDaysSeries.toArray() },
        { name: 'today', data: todaySeries },
      ],
    };

    return (
      <ExpansionPanel key={ys.startDate.toISO()} defaultExpanded={isExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12} sm={4}>
              <Typography variant="h4">{ys.startDate.get('year')} - {ys.startDate.get('year') + 1}</Typography>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
              <Typography>Jours off temps partiel restants : <strong>{daysOffleft}</strong> / {ys.totalPartialTimeOffDays}</Typography>
              {balance}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12}>
              <Card>
                <CardHeader title="Jours off temps partiel gagnés/dépensés" />
                <CardContent>
                  <LineChart className="ct-party-time" data={partialTimeOffDaysGraphData} options={partialTimeOffDaysGraphOption} />
                </CardContent>
              </Card>
            </Grid>
            {cards}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  });

  return (
    <div>
      {sections}
    </div>
  )
}

export default withStyles(styles)(Summary);
