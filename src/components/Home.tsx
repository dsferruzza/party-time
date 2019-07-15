import { Button } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PollIcon from '@material-ui/icons/Poll';
import SettingsIcon from '@material-ui/icons/Settings';
import { DateTime } from 'luxon';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = createStyles({
  separator: {
    marginBottom: 20,
  },
  warning: {
    marginTop: 30,
  },
});

interface Props extends WithStyles<typeof styles> {
  configured: boolean
  lastFetch: DateTime | null
}

function Home(props: Props) {
  const { classes } = props;

  const configureButton = <Link to="/config"><Button variant="contained" color="default">Configurer <SettingsIcon /></Button></Link>;
  const summaryButton = <Link to="/summary"><Button variant="contained" color="default">Voir l'analyse <PollIcon /></Button></Link>;
  const fetchWarning = <Typography variant="body1" className={classes.warning}>{(props.lastFetch !== null) ? `Le calendrier n'a pas été récupéré depuis le ${props.lastFetch.toFormat('dd/LL/yyyy')} à ${props.lastFetch.toFormat('HH:mm:ss')}.` : "Le calendrier n'a jamais été récupéré ; utilisez le bouton en haut à droite !"}</Typography>;

  return (
    <div>
      <Typography variant="h2" gutterBottom={true}>Party Time</Typography>
      <Typography variant="h5" gutterBottom={true}>
        Calcul des congés et jours non travaillés dans le cadre d'un travail à temps partiel.
      </Typography>
      <hr className={classes.separator} />
      {(!props.configured) ? configureButton : summaryButton}
      {(props.configured && (props.lastFetch === null || props.lastFetch.diffNow('days').get('days') > 2)) ? fetchWarning : null}
    </div>
  );
}

export default withStyles(styles)(Home);
