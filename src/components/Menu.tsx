/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import PollIcon from '@mui/icons-material/Poll';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { PropsFromRedux, connector } from '../containers/Menu';

type Props = PropsFromRedux & {
  lastFetch: DateTime | null
  open: boolean
  onOpen: () => void
  onClose: () => void
};

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: 'inherit',
  textDecoration: 'none',
  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
});

// tslint:disable:jsx-no-lambda
function Menu(props: Props) {
  const lockedItems = (props.lastFetch !== null) ? (
    <Fragment>
      <NavLink to="/passed" style={navLinkStyle} onClick={props.onClose} children={({ isActive }) => (
        <ListItemButton selected={isActive}>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary="Jours passés" />
        </ListItemButton>
      )} />
      <NavLink to="/coming" style={navLinkStyle} onClick={props.onClose} children={({ isActive }) => (
        <ListItemButton selected={isActive}>
          <ListItemIcon><TrendingUpIcon /></ListItemIcon>
          <ListItemText primary="Jours à venir" />
        </ListItemButton>
      )} />
      <NavLink to="/summary" style={navLinkStyle} onClick={props.onClose} children={({ isActive }) => (
        <ListItemButton selected={isActive}>
          <ListItemIcon><PollIcon /></ListItemIcon>
          <ListItemText primary="Analyse" />
        </ListItemButton>
      )} />
    </Fragment>
  ) : null;

  return (
    <div>
      <SwipeableDrawer css={css`flex-shrink: 0;`} open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
        <div css={css`
          margin-top: 70px;
          width: 250px;
        `}>
          <List>
            <NavLink to="/" end={true} style={navLinkStyle} onClick={props.onClose} children={({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Accueil" />
              </ListItemButton>
            )} />
            <NavLink to="/config" style={navLinkStyle} onClick={props.onClose} children={({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Configuration" />
              </ListItemButton>
            )} />
            {lockedItems}
          </List>
          <Divider />
          <List>
            <ListItem><ListItemText primary={`Dernière récupération : ${(props.lastFetch !== null) ? props.lastFetch.toFormat('dd/LL/yyyy HH:mm:ss') : 'jamais'}`} /></ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default connector(Menu);
