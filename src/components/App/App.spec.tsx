import React from 'react';
import App from '.';
import mockApiConnector from '../ApiConnector';
import { DevDiceApiResponse, DevTech } from '../../types';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../ApiConnector');

describe('<App />', () => {
  const mockResponse: DevDiceApiResponse = {
    frontEnd: 'React',
    backEnd: 'Node',
    db: 'Mongo',
    vcs: 'Git',
  };

  describe('initial rendering', () => {
    beforeEach(async () => {
      (mockApiConnector.getDieRoll as jest.Mock)
        .mockResolvedValue(mockResponse);
      render(<App />);
    });

    test('requests DevTech', async () => {
      expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(1);
      expect(mockApiConnector.getDieRoll).lastCalledWith(undefined);
      await expect(mockApiConnector.getDieRoll()).resolves.toEqual(mockResponse);
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
    const mockResponse2: DevDiceApiResponse = {
      frontEnd: 'Angular',
      backEnd: 'Grails',
      db: 'Postgres',
      vcs: 'Subversion',
    };

    beforeEach(async () => {
      const mockImpl = (respondWith = mockResponse) => ((devTech?: DevTech) => {
        return Promise.resolve(devTech ? { [devTech]: respondWith[devTech] } : respondWith);
      });
      (mockApiConnector.getDieRoll as jest.Mock)
        .mockImplementation(mockImpl())
        .mockImplementationOnce(mockImpl(mockResponse))
        .mockImplementationOnce(mockImpl(mockResponse2))
      render(<App />);
    });

    test('clicking to change front-end', async () => {
      const frontEnd = screen.getByText(/React/);
      expect(frontEnd).toBeInTheDocument();

      fireEvent.click(frontEnd);
      expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(2);
      expect(mockApiConnector.getDieRoll).lastCalledWith(DevTech.FRONT_END);
      expect(await screen.findByText('Angular')).toBeInTheDocument();

      Object.values(mockResponse2).filter(devTech => devTech !== 'Angular')
        .forEach((devTech) => {
          expect(screen.queryByText(devTech!)).not.toBeInTheDocument();
        });
    });

    test('clicking to change back-end', async () => {
      const backEnd = screen.getByText(/Node/);
      expect(backEnd).toBeInTheDocument();

      fireEvent.click(backEnd);
      expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(2);
      expect(mockApiConnector.getDieRoll).lastCalledWith(DevTech.BACK_END);
      expect(await screen.findByText('Grails')).toBeInTheDocument();

      Object.values(mockResponse2).filter(devTech => devTech !== 'Grails')
        .forEach((devTech) => {
          expect(screen.queryByText(devTech!)).not.toBeInTheDocument();
        });
    });

    test('clicking to change database', async () => {
      const db = screen.getByText(/Mongo/);
      expect(db).toBeInTheDocument();

      fireEvent.click(db);
      expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(2);
      expect(mockApiConnector.getDieRoll).lastCalledWith(DevTech.DATABASE);
      expect(await screen.findByText('Postgres')).toBeInTheDocument();

      Object.values(mockResponse2).filter(devTech => devTech !== 'Postgres')
        .forEach((devTech) => {
          expect(screen.queryByText(devTech!)).not.toBeInTheDocument();
        });
    });

    describe('with version control showing', () => {
      let vcs: HTMLElement;
      beforeEach(async () => {
        fireEvent.click(screen.getByRole('checkbox'));
        vcs = await screen.findByText('Git');
      });

      test('clicking to show', () => {
        expect(vcs).toBeInTheDocument();
      });

      test('clicking to change', async () => {
        fireEvent.click(vcs);
        expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(2);
        expect(mockApiConnector.getDieRoll).lastCalledWith(DevTech.VERSION_CONTROL);
        expect(await screen.findByText('Subversion')).toBeInTheDocument();

        Object.values(mockResponse2).filter(devTech => devTech !== 'Subversion')
        .forEach((devTech) => {
          expect(screen.queryByText(devTech!)).not.toBeInTheDocument();
        });
      });

      test('clicking to re-roll everything', async () => {
        fireEvent.click(screen.getByText('Roll again!'));
        expect(mockApiConnector.getDieRoll).toHaveBeenCalledTimes(2);
        expect(mockApiConnector.getDieRoll).lastCalledWith(undefined);
  
        expect(await screen.findByText('Angular')).toBeInTheDocument();
        expect(await screen.findByText('Grails')).toBeInTheDocument();
        expect(await screen.findByText('Postgres')).toBeInTheDocument();
        expect(await screen.findByText('Subversion')).toBeInTheDocument();
  
        expect(screen.queryByText('React')).not.toBeInTheDocument();
        expect(screen.queryByText('Node')).not.toBeInTheDocument();
        expect(screen.queryByText('Mongo')).not.toBeInTheDocument();
        expect(screen.queryByText('Git')).not.toBeInTheDocument();
      });
    });
  });
});
