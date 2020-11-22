import React from 'react';
import StaticIntro from '.';
import { render, screen } from '@testing-library/react';

describe('<StaticIntro />', () => {
  test('renders', () => {
    render(<StaticIntro />);
    expect(screen.getByText(/Are you pressed for time\?/)).toBeInTheDocument();
  });
});
