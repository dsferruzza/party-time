import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';

import Bar from '../containers/Bar';
import Config from '../containers/Config';
import Status from '../containers/Status';

const appName = 'Party Time';

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CssBaseline />
        <Bar appName={appName} />
        <Config />
        <Status />
      </div>
    );
  }
}
