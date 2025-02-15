import React from 'react';
import Share from '../index';
import { renderWithApp } from '../../../helpers/testWithContext';
import { fireEvent } from '@testing-library/react';

window.alert = jest.fn();

describe('Share', () => {
  it('should dispatch shareMovie action when user is authenticated', async () => {
    const initState = {
      user: {
        token: 'token',
      },
      shareMovie: {
        status: 'idle',
      },
    };

    const { getByLabelText, getByText, store } = renderWithApp(<Share />, {
      initState,
    });

    fireEvent.change(getByLabelText('url'), {
      target: { value: 'https://www.youtube.com/watch?v=q-cE4ziUBMo' },
    });

    fireEvent.click(getByText('Share'));

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual('shareMovie/create/pending');
    expect(actions[0].meta.arg).toEqual(
      'https://www.youtube.com/watch?v=q-cE4ziUBMo'
    );
  });

  it('should show alert and not dispatch any actions when user is not authenticated', async () => {
    const initState = {
      user: {},
      shareMovie: {
        status: 'idle',
      },
    };

    const { getByLabelText, getByText, store } = renderWithApp(<Share />, {
      initState,
    });

    fireEvent.change(getByLabelText('url'), {
      target: { value: 'https://www.youtube.com/watch?v=q-cE4ziUBMo' },
    });

    fireEvent.click(getByText('Share'));

    const actions = store.getActions();
    expect(actions).toHaveLength(0);
    expect(window.alert).toBeCalled();
  });
});
