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
  onConfigChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  calendarUrl: string
}

function Config(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="calendarUrl">URL de l'agenda</InputLabel>
        <Input id="calendarUrl" value={props.calendarUrl} onChange={props.onConfigChange} />
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(Config);
