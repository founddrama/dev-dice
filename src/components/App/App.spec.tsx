import React from 'react';
import App from '.';
import { render, screen } from '@testing-library/react';

describe('<App />', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('renders the heading', () => {
    const h1 = screen.getByText('Project Management Dev Dice');
    expect(h1).toBeInTheDocument();
  });
});
