import mockAxios from 'axios';
import ApiConnector from '.';
import { DevDiceApiResponse, DevTech } from '../../types';

jest.mock('axios');

describe('ApiConnector.getDieRoll', () => {
  const testHost = 'http://localhost';
  const mockResponse: DevDiceApiResponse = {
    frontEnd: 'React',
    backEnd: 'Node',
    db: 'Mongo',
    vcs: 'Git',
  };

  let response: unknown;

  describe('called with no params', () => {
    beforeEach(async () => {
      (mockAxios.get as jest.Mock).mockResolvedValue({ data: mockResponse });
      response = await ApiConnector.getDieRoll();
    });
    
    it('should call /api/roll when no param is supplied', async () => {
      expect(mockAxios.get).toHaveBeenCalledWith(`${testHost}/api/roll`);
    });

    it('should return the full DevDiceApiResponse', async () => {
      expect(response).toEqual(mockResponse);
    });
  });

  describe('called with a DevTech param', () => {
    let { frontEnd } = mockResponse;
    beforeEach(async () => {
      (mockAxios.get as jest.Mock).mockResolvedValue({ data: { frontEnd } });
      response = await ApiConnector.getDieRoll(DevTech.FRONT_END);
    });
    
    it('should call /api/roll when no param is supplied', async () => {
      expect(mockAxios.get).toHaveBeenCalledWith(`${testHost}/api/roll/${DevTech.FRONT_END}`);
    });

    it('should return the full DevDiceApiResponse', async () => {
      expect(response).toEqual({ frontEnd });
    });
  });
});
