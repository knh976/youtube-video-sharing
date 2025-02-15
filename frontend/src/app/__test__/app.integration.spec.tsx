import React from 'react';
import App from '../app';
import { renderWithRedux } from '../helpers/testWithContext';
import { fireEvent, waitFor } from '@testing-library/react';
import { API_DOMAIN, ROUTES } from '../constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('App', () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should render home correctly', async () => {
    const initState = {
      user: {
        status: 'idle',
      },
      shareMovie: {
        status: 'idle',
      },
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };
    const listMoviesRes = [
      {
        id: 1,
        video_url: 'https://youtu.be/wC4pmo6QLqk',
        video_title: 'video_title',
        video_description: 'video_description',
        username: 'aa@gmail.com',
      },
      {
        id: 2,
        video_url: 'https://youtu.be/wC4pmo6QLqk',
        video_title: 'video_title_2',
        video_description: 'video_description_2',
        username: 'aa@gmail.com',
      },
    ];
    const loginRes = { jwt: 'token', username: 'a@a.com' };
    mock.onGet(`${API_DOMAIN}/shared_videos`).reply(200, listMoviesRes);
    mock
      .onPost(`${API_DOMAIN}/login`, {
        username: 'a@a.com',
        password: '123abc',
      })
      .reply(200, loginRes);
    mock
      .onPost(`${API_DOMAIN}/shared_videos`, {
        url: 'https://www.youtube.com/watch?v=q-cE4ziUBMo',
      })
      .reply(200);

    const {
      getByText,
      getByLabelText,
      getByRole,
      queryAllByRole,
      queryAllByText,
    } = renderWithRedux(<App />, {
      preloadedState: initState,
    });

    // in home page
    await waitFor(() =>
      expect(mock.history.get[0].url).toEqual(`${API_DOMAIN}/shared_videos`)
    );
    expect(getByText('video_title')).toBeTruthy();
    expect(getByText('video_description')).toBeTruthy();
    expect(queryAllByText('aa@gmail.com')).toHaveLength(2);

    // header login
    expect(getByText('Login / Register')).toBeTruthy();
    fireEvent.change(getByLabelText('username'), {
      target: { value: 'a@a.com' },
    });
    fireEvent.change(getByLabelText('password'), {
      target: { value: '123abc' },
    });
    fireEvent.submit(getByRole('button'));
    await waitFor(() => expect(queryAllByRole('alert')).toHaveLength(0));
    await waitFor(() =>
      expect(mock.history.post[0].url).toEqual(`${API_DOMAIN}/login`)
    );

    // header logged in
    expect(queryAllByText('Login / Register')).toHaveLength(0);
    expect(getByText('Welcome a@a.com')).toBeTruthy();
    expect(getByText('Share a movie')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
    fireEvent.click(getByText('Share a movie'));

    // in share page
    expect(getByText('Youtube URL:')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
    fireEvent.change(getByLabelText('url'), {
      target: { value: 'https://www.youtube.com/watch?v=q-cE4ziUBMo' },
    });
    fireEvent.click(getByText('Share'));
    await waitFor(() =>
      expect(mock.history.post[1].url).toEqual(`${API_DOMAIN}/shared_videos`)
    );
    expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.home);

    // logout
    fireEvent.click(getByText('Logout'));
    expect(getByText('Login / Register')).toBeTruthy();
  });
});
