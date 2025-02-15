import React from 'react';
import { render } from '@testing-library/react';
import Header from '../index';

describe('App', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Header>
        <span>This is children</span>
      </Header>
    );
    expect(getByText('Funny Movies')).toBeTruthy();
    expect(getByText('This is children')).toBeTruthy();
  });
});
