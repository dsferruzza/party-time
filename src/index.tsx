import '../node_modules/chartist/dist/index.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import 'typeface-roboto';

import App from './components/App';
import { installAuthCallback } from './lib/googleOAuth';
import { register } from './lib/registerServiceWorker';
import { emptyStore, reducer } from './lib/state';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['config', 'events', 'googleOAuth', 'lastFetch'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, emptyStore, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

createRoot(document.getElementById('root')!)
  .render(
    (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  );

register({
  onUpdate: () => {
    store.dispatch({ type: 'AppUpdated' });
  },
});
installAuthCallback();
