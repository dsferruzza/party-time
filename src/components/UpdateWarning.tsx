import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';

import { PropsFromRedux, connector } from '../containers/UpdateWarning';

type Props = PropsFromRedux & {
  open: boolean
};

function UpdateWarning(props: Props) {
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
        (
          <IconButton
            key="update"
            aria-label="Update"
            color="inherit"
            onClick={reload}
            size="large">
            <SystemUpdateIcon />
          </IconButton>
        ),
      ]}
    />
  );
}

function reload() {
  window.location.reload();
}

export default connector(UpdateWarning);
