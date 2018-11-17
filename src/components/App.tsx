import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bar from '../containers/Bar';
import Config from '../containers/Config';
import Home from '../containers/Home';
import Menu from '../containers/Menu';
import Status from '../containers/Status';

const appName = 'Party Time';
const styles = createStyles({
  content: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
  },
});

const publicUrl = process.env.PUBLIC_URL;
function getBase(url: string): string {
  const a = document.createElement('a');
  a.href = url;
  return a.pathname;
}
const base = (typeof publicUrl === 'undefined') ? '' : getBase(publicUrl);

interface Props extends WithStyles<typeof styles> {}

function App(props: Props) {
  const { classes } = props;

  return (
    <Router basename={base}>
      <div>
        <CssBaseline />
        <Bar appName={appName} />
        <Menu />

        <div className={classes.content}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/config" component={Config} />
        </div>

        <Status />
      </div>
    </Router>
  );
}

export default withStyles(styles)(App);
