import React from 'react';
import HeaderLogin from '../index';
import { renderWithApp } from '../../../helpers/testWithContext';
import { fireEvent, waitFor } from '@testing-library/react';

describe('App', () => {
  it('should render correctly', async () => {
    const initState = {
      user: {
        status: 'idle',
      },
    };

    const { queryAllByRole, getByLabelText, getByRole, store } = renderWithApp(
      <HeaderLogin />,
      { initState }
    );

    fireEvent.change(getByLabelText('username'), {
      target: { value: 'a@a.com' },
    });
    fireEvent.change(getByLabelText('password'), {
      target: { value: '123abc' },
    });

    fireEvent.submit(getByRole('button'));
    await waitFor(() => expect(queryAllByRole('alert')).toHaveLength(0));

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual('user/login/pending');
    expect(actions[0].meta.arg).toEqual({
      username: 'a@a.com',
      password: '123abc',
    });
  });
});
