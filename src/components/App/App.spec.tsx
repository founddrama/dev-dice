jest.mock('../ApiConnector');

import React from 'react';
import App from '.';
import { getDieRoll } from '../ApiConnector';
import { DevTech } from '../../types';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<App />', () => {
  beforeEach(() => {
    render(<App />);
  });

  describe('initial rendering', () => {
    test('requests DevTech', () => {
      expect(getDieRoll).toHaveBeenCalledTimes(1);
      expect(getDieRoll).lastCalledWith(undefined);
    });

    test('the heading', () => {
      const h1 = screen.getByText('Project Management Dev Dice');
      expect(h1).toBeInTheDocument();
    });

    test('<StaticIntro />', () => {
      const staticIntro = screen.getByText(/Are you pressed for time\?/);
      expect(staticIntro);
    });
  
    test('the ".boss-quote"', () => {
      const bossQuote = screen.getByText(/No problem, boss\./);
      expect(bossQuote).toBeInTheDocument();
    });
  
    test('VCS quote as initially hidden', () => {
      const vcsQuote = screen.queryByText(/As for version control/);
      expect(vcsQuote).not.toBeInTheDocument();
    });

    test('the re-roll button', () => {
      const reRoll = screen.getByText('Roll again!');
      expect(reRoll).toBeInTheDocument();
    });

    test('the checkbox', () => {
      const label = screen.getByText(/Greenfield Project\?/);
      expect(label).toBeInTheDocument();

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('the footnote', () => {
      const footnote = screen.getByText(/Where by "us", we mean "chance"./);
      expect(footnote).toBeInTheDocument();
    });

    test('<StaticFooter />', () => {
      const staticFooter = screen.getByText(/Created by/);
      expect(staticFooter).toBeInTheDocument();
    });
  });

  describe('page interactions', () => {
    test('clicking to change front-end', async () => {
      const frontEnd = screen.getByText('jQuery spaghetti');
      expect(frontEnd).toBeInTheDocument();

      fireEvent.click(frontEnd);
      expect(getDieRoll).toHaveBeenCalledTimes(2);
      expect(getDieRoll).lastCalledWith(DevTech.FRONT_END);
    });

    test('clicking to change back-end', () => {
      const backEnd = screen.getByText(/Python scripts/);
      expect(backEnd).toBeInTheDocument();

      fireEvent.click(backEnd);
      expect(getDieRoll).toHaveBeenCalledTimes(2);
      expect(getDieRoll).lastCalledWith(DevTech.BACK_END);
    });

    test('clicking to change database', () => {
      const db = screen.getByText(/JSON files/);
      expect(db).toBeInTheDocument();

      fireEvent.click(db);
      expect(getDieRoll).toHaveBeenCalledTimes(2);
      expect(getDieRoll).lastCalledWith(DevTech.DATABASE);
    });

    describe('version control', () => {
      let vcs: HTMLElement;
      beforeEach(async () => {
        fireEvent.click(screen.getByRole('checkbox'));
        vcs = await screen.findByText(/zip files/);
      });

      test('clicking to show', () => {
        expect(vcs).toBeInTheDocument();
      });

      test('clicking to change', () => {
        fireEvent.click(vcs);
        expect(getDieRoll).toHaveBeenCalledTimes(2);
        expect(getDieRoll).lastCalledWith(DevTech.VERSION_CONTROL);
      });
    });

    test('clicking to re-roll everything', () => {
      fireEvent.click(screen.getByText('Roll again!'));
      expect(getDieRoll).toHaveBeenCalledTimes(2);
      expect(getDieRoll).lastCalledWith(undefined);
    });
  });
});
