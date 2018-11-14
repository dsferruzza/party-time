import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import 'typeface-roboto';

import App from './components/App';
import registerServiceWorker from './lib/registerServiceWorker';
import { emptyStore, reducer } from './lib/state';

const store = createStore(reducer, emptyStore, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
