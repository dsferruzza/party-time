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
  onAccessTokenChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTimeMinChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  accessToken: string
  timeMin: string
}

function Config(props: Props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="accessToken">Token d'accès à l'API Google</InputLabel>
        <Input id="accessToken" value={props.accessToken} onChange={props.onAccessTokenChange} />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="timeMin">Date minimum</InputLabel>
        <Input id="timeMin" value={props.timeMin} onChange={props.onTimeMinChange} />
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(Config);
