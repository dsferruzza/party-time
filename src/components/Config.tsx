import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
  },
});

interface Props extends WithStyles<typeof styles> {
  onClientIdChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onDueWorkDaysChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onHolidaysChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onHolidaysRegexChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPartialTimeOffRegexChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clientId: string
  dueWorkDays: number
  holidays: number
  holidaysRegex: string
  partialTimeOffRegex: string
  timeMin: string
}

function Config(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="clientId">Identifiant client pour l'accès à l'API Google (client_id)</InputLabel>
        <Input id="clientId" value={props.clientId} onChange={props.onClientIdChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="timeMin">Date minimum</InputLabel>
        <Input id="timeMin" value={props.timeMin} onChange={props.onTimeMinChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="dueWorkDays">Nombre de jours par an à travailler</InputLabel>
        <Input id="dueWorkDays" type="number" value={props.dueWorkDays} onChange={props.onDueWorkDaysChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="holidays">Nombre de jours de congé gagnés par an</InputLabel>
        <Input id="holidays" type="number" value={props.holidays} onChange={props.onHolidaysChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="partialTimeOffRegex">Expression régulière pour reconnaitre les événements des jours off temps partiel (exemple : ^Absent|^RTT)</InputLabel>
        <Input id="partialTimeOffRegex" type="text" value={props.partialTimeOffRegex} onChange={props.onPartialTimeOffRegexChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="holidaysRegex">Expression régulière pour reconnaitre les événements des congés payés (exemple : ^Congés)</InputLabel>
        <Input id="holidaysRegex" type="text" value={props.holidaysRegex} onChange={props.onHolidaysRegexChange} />
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(Config);
