import React from 'react';
import HeaderLoggedIn from '../index';
import { renderWithApp } from '../../../helpers/testWithContext';
import { fireEvent } from '@testing-library/react';

describe('HeaderLoggedIn', () => {
  it('should dispatch actions correctly', () => {
    const initState = {
      user: {
        username: 'abc_xyz',
      },
    };
    const { getByText, store } = renderWithApp(<HeaderLoggedIn />, {
      initState,
    });
    expect(getByText('Welcome abc_xyz')).toBeTruthy();

    fireEvent.click(getByText('Logout'));
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toEqual('user/logout');
  });
});
