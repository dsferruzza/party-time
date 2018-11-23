import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import 'typeface-roboto';

import App from './components/App';
import { installAuthCallback } from './lib/googleOAuth';
import registerServiceWorker from './lib/registerServiceWorker';
import { emptyStore, reducer } from './lib/state';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['config', 'events', 'googleOAuth', 'lastFetch'],
};
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, emptyStore, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker(store);
installAuthCallback();
