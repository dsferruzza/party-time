import { Button } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = createStyles({
});

interface Props extends WithStyles<typeof styles> {
  configured: boolean
}

function Home(props: Props) {
  // const { classes } = props;

  return (
    <div>
      <Typography variant="h2" gutterBottom={true}>Party Time</Typography>
      <Typography variant="h5" gutterBottom={true}>
        Calcul des congés et jours non travaillés dans le cadre d'un travail à temps partiel.
      </Typography>
      <hr />
      {(!props.configured) ? <Link to="/config"><Button variant="contained" color="default">Configurer <SettingsIcon /></Button></Link> : null}
    </div>
  )
}

export default withStyles(styles)(Home);
