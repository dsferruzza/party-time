import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

const styles = createStyles({

});

interface Props extends WithStyles<typeof styles> {
  msg: string | null
  onClose: () => void
}

function Status(props: Props) {
  // const { classes } = props;
  const open = props.msg !== null;

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={props.onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.msg}</span>}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.onClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

export default withStyles(styles)(Status);
