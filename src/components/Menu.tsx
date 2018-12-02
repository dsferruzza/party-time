import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { DateTime } from 'luxon';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const styles = createStyles({
  activeNavLink: {
    '& > div': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  drawer: {
    flexShrink: 0,
  },
  list: {
    marginTop: 70,
    width: 250,
  },
  navLink: {
    textDecoration: 'none',
  },
});

interface Props extends WithStyles<typeof styles> {
  lastFetch: DateTime | null
  open: boolean
  onOpen: () => void
  onClose: () => void
}

function Menu(props: Props) {
  const { classes } = props;

  return (
    <div>
      <SwipeableDrawer className={classes.drawer} open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
        <div className={classes.list}>
          <List>
            <NavLink to="/" exact={true} className={classes.navLink} activeClassName={classes.activeNavLink} onClick={props.onClose}>
              <ListItem button={true}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Accueil" />
              </ListItem>
            </NavLink>
            <NavLink to="/config" className={classes.navLink} activeClassName={classes.activeNavLink} onClick={props.onClose}>
              <ListItem button={true}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Configuration" />
              </ListItem>
            </NavLink>
            <NavLink to="/passed" className={classes.navLink} activeClassName={classes.activeNavLink} onClick={props.onClose}>
              <ListItem button={true}>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary="Jours passés" />
              </ListItem>
            </NavLink>
            <NavLink to="/coming" className={classes.navLink} activeClassName={classes.activeNavLink} onClick={props.onClose}>
              <ListItem button={true}>
                <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                <ListItemText primary="Jours à venir" />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <List>
            <ListItem><ListItemText primary={`Dernière récupération : ${(props.lastFetch !== null) ? props.lastFetch.toFormat('dd/LL/yyyy HH:mm:ss') : 'jamais'}`} /></ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default withStyles(styles)(Menu);
