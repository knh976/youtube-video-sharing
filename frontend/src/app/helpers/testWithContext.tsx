import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { thunk } from "redux-thunk";

interface Options extends Omit<RenderOptions, 'queries'> {
  initState: any;
}
export const renderWithApp = (ui: React.ReactElement, options?: Options) => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(options?.initState || {});

  const Wrapper = ({ children }: any) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return {
    ...render(ui, { ...options, wrapper: Wrapper }),
    store,
  };
};
