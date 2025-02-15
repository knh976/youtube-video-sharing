import React from 'react';
import ListMovies from '../index';
import { renderWithApp } from '../../../helpers/testWithContext';

describe('ListMovies', () => {
  it('should render correctly', async () => {
    const initState = {
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

    const { getByText } = renderWithApp(<ListMovies />, {
      initState,
    });

    expect(getByText('video_title')).toBeTruthy();
    expect(getByText('video_description')).toBeTruthy();
    expect(getByText('aa@gmail.com')).toBeTruthy();
  });

  it('should dispatch actions correctly', async () => {
    const initState = {
      listMovies: {
        status: 'idle',
        movies: [],
      },
    };

    const { store } = renderWithApp(<ListMovies />, {
      initState,
    });

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual('listMovies/get/pending');
  });
});
