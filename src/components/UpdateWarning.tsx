import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import * as React from 'react';

const styles = createStyles({

});

interface Props extends WithStyles<typeof styles> {
  open: boolean
}

function UpdateWarning(props: Props) {
  // const { classes } = props;

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      open={props.open}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">L'application a été mise à jour !</span>}
      action={[
        <IconButton key="update" aria-label="Update" color="inherit" onClick={reload}>
          <SystemUpdateIcon />
        </IconButton>,
      ]}
    />
  )
}

function reload() {
  window.location.reload();
}

export default withStyles(styles)(UpdateWarning);
