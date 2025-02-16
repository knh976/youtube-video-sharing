import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './app/app';
import setupStore from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
