import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TechBuzzword from '.';
import { DevTech } from '../../types';
import { DEVTECH_DEFAULTS } from './constants';

describe('<TechBuzzword />', () => {
  describe('init without a techName', () => {
    [
      DevTech.FRONT_END,
      DevTech.BACK_END,
      DevTech.DATABASE,
      DevTech.VERSION_CONTROL,
    ].forEach((devTech) => {
      test(`${devTech} default should be ${DEVTECH_DEFAULTS[devTech]}`, () => {
        render(<TechBuzzword onClick={jest.fn()} devTech={devTech} />);
        expect(screen.getByText(DEVTECH_DEFAULTS[devTech])).toBeInTheDocument();
      });
    });
  });

  describe('core behaviors', () => {
    const onClick = jest.fn();
    const devTech = DevTech.FRONT_END;
    const techName = 'React';
    const props = { onClick, devTech, techName };

    test('renders with a techName if supplied', () => {
      render(<TechBuzzword {...props} />);
  
      expect(screen.queryByText(DEVTECH_DEFAULTS[devTech])).not.toBeInTheDocument();
      expect(screen.queryByText(techName)).toBeInTheDocument();
    });
  
    test('responds to the onClick', () => {
      render(<TechBuzzword {...props} />);
      fireEvent.click(screen.getByText(techName));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(devTech);
    });
  });
});
