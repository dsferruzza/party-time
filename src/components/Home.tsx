/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import PollIcon from '@mui/icons-material/Poll';
import SettingsIcon from '@mui/icons-material/Settings';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

import { connector, PropsFromRedux } from '../containers/Home';

type Props = PropsFromRedux & {
  configured: boolean
  lastFetch: DateTime | null
};

function Home(props: Props) {
  const configureButton = <Link to="/config"><Button variant="contained">Configurer<SettingsIcon /></Button></Link>;
  const summaryButton = <Link to="/summary"><Button variant="contained">Voir l'analyse<PollIcon /></Button></Link>;
  const fetchWarning = <Typography variant="body1" css={css`margin-top: 30px;`}>{(props.lastFetch !== null) ? `Le calendrier n'a pas été récupéré depuis le ${props.lastFetch.toFormat('dd/LL/yyyy')} à ${props.lastFetch.toFormat('HH:mm:ss')}.` : "Le calendrier n'a jamais été récupéré ; utilisez le bouton en haut à droite !"}</Typography>;

  return (
    <div>
      <Typography variant="h2" gutterBottom={true}>Party Time</Typography>
      <Typography variant="h5" gutterBottom={true}>
        Calcul des congés et jours non travaillés dans le cadre d'un travail à temps partiel.
      </Typography>
      <hr css={css`margin-bottom: 20px;`} />
      {(!props.configured) ? configureButton : summaryButton}
      {(props.configured && (props.lastFetch === null || props.lastFetch.diffNow('days').get('days') > 2)) ? fetchWarning : null}
    </div>
  );
}

export default connector(Home);
