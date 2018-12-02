import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bar from '../containers/Bar';
import ByMonth from '../containers/ByMonth';
import Config from '../containers/Config';
import FutureList from '../containers/FutureList';
import Home from '../containers/Home';
import Menu from '../containers/Menu';
import PassedList from '../containers/PassedList';
import Status from '../containers/Status';
import UpdateWarning from '../containers/UpdateWarning';

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
const base = (typeof publicUrl === 'undefined' || publicUrl === '') ? '/' : getBase(publicUrl);

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
          <Route path="/passed" component={PassedList} />
          <Route path="/coming" component={FutureList} />
          <Route path="/bymonth" component={ByMonth} />
        </div>

        <Status />
        <UpdateWarning />
      </div>
    </Router>
  );
}

export default withStyles(styles)(App);
