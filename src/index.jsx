import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import './index.css';
import App from './App';
import { store, persistor } from './context/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

Sentry.init({
  dsn: 'https://7c28dc9138ba433ba161b138e205eec6@o4504454739722240.ingest.sentry.io/4504454741098496',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

