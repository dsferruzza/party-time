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
  onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clientId: string
  dueWorkDays: number
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
    </div>
  )
}

export default withStyles(styles)(Config);
