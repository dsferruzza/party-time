/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BackIcon from '@mui/icons-material/ArrowBack';
import CachedIcon from '@mui/icons-material/Cached';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

import { PropsFromRedux, connector } from '../containers/Bar';

type Props = PropsFromRedux & {
  appName: string
  onReloadClick: () => void
  menuOpenned: boolean
  toggleMenu: () => void
};

function Bar(props: Props) {
  return (
    <AppBar position="fixed" css={css`display: flex; z-index: 1301;`}>
      <Toolbar>
        <IconButton
          css={css`
            margin-left: -12px;
            margin-right: 20px;
          `}
          color="inherit"
          aria-label="Menu"
          onClick={props.toggleMenu}
          size="large">
          {(props.menuOpenned) ? <BackIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" color="inherit" css={css`flex-grow: 1;`}>
          {props.appName}
        </Typography>
        <IconButton color="inherit" onClick={props.onReloadClick} size="large">
          <CachedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default connector(Bar);
