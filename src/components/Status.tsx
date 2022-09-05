import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import { PropsFromRedux, connector } from '../containers/Status';

type Props = PropsFromRedux & {
  msg: string | null
  onClose: () => void
};

function Status(props: Props) {
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
        (
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.onClose}
            size="large">
            <CloseIcon />
          </IconButton>
        ),
      ]}
    />
  );
}

export default connector(Status);
