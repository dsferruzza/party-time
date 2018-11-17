import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import CachedIcon from '@material-ui/icons/Cached';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';

const styles = createStyles({
  bar: {
    display: 'flex',
    zIndex: 1301,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface Props extends WithStyles<typeof styles> {
  appName: string
  onReloadClick: () => void
  menuOpenned: boolean
  toggleMenu: () => void
}

function Bar(props: Props) {
  const { classes } = props;

  return (
    <AppBar position="fixed" className={classes.bar}>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={props.toggleMenu}>
          {(props.menuOpenned) ? <BackIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {props.appName}
        </Typography>
        <IconButton color="inherit" onClick={props.onReloadClick}>
          <CachedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Bar);
