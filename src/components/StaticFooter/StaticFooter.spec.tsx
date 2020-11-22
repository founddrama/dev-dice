import React from 'react';
import StaticFooter from '.';
import { render, screen } from '@testing-library/react';

describe('<StaticFooter />', () => {
  test('renders', () => {
    render(<StaticFooter />);
    expect(screen.getByText(/Created by/)).toBeInTheDocument();
  });
});
