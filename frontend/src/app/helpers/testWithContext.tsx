import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { thunk } from 'redux-thunk';
import setupStore, { AppStore, RootState } from '../store';

interface Options extends Omit<RenderOptions, 'queries'> {
  initState: any;
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: RootState;
  store?: AppStore;
}

export const renderWithApp = (ui: React.ReactElement, options?: Options) => {
  const middlewares = [thunk] as any;
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

export const renderWithProvider = (ui: React.ReactElement, options?: Options) => {
  const middlewares = [thunk] as any;
  const mockStore = configureStore(middlewares);
  const store = mockStore(options?.initState || {});

  const Wrapper = ({ children }: any) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    ...render(ui, { ...options, wrapper: Wrapper }),
    store,
  };
};

export const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState = {} as RootState,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const store = setupStore(preloadedState)
  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  )
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), store };
}
