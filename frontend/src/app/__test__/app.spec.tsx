import React from 'react';
import App from '../app';
import { renderWithApp, renderWithProvider } from '../helpers/testWithContext';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from '../constants';

describe('App', () => {
  it('should render HeaderLogin', async () => {
    const initState = {
      user: {},
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };
    const { getByText } = renderWithApp(<App />, { initState });
    expect(getByText('Login / Register')).toBeTruthy();
  });

  it('should render HeaderLoggedIn', async () => {
    const initState = {
      user: {
        token: 'token',
        username: 'owner@gmail.com',
      },
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };
    const { getByText } = renderWithApp(<App />, { initState });
    expect(getByText('Welcome owner@gmail.com')).toBeTruthy();
    expect(getByText('Share a movie')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('should render Share', async () => {
    const initState = {
      user: {},
      shareMovie: {
        status: 'idle',
      },
    };
    const { getByText } = renderWithProvider(
      <MemoryRouter initialEntries={[ROUTES.share]}>
        <App />
      </MemoryRouter>,
      { initState }
    );
    expect(getByText('Youtube URL:')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
  });

  it('should render ListMovies', async () => {
    const initState = {
      user: {},
      listMovies: {
        status: 'succeeded',
        movies: [
          {
            id: 1,
            video_url: 'https://youtu.be/wC4pmo6QLqk',
            video_title: 'video_title',
            video_description: 'video_description',
            username: 'aa@gmail.com',
          },
        ],
      },
    };
    const { getByText } = renderWithProvider(
      <MemoryRouter initialEntries={[ROUTES.home]}>
        <App />
      </MemoryRouter>,
      { initState }
    );
    expect(getByText('video_title')).toBeTruthy();
    expect(getByText('video_description')).toBeTruthy();
    expect(getByText('aa@gmail.com')).toBeTruthy();
  });
});
