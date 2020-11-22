import { DevDiceApiResponse, DevTech } from "../../../types";

const response: DevDiceApiResponse = {
  db: 'Mongo',
  backEnd: 'Node',
  frontEnd: 'React',
  vcs: 'Git',
};

export const getDieRoll = async (devTech?: DevTech): Promise<DevDiceApiResponse> => {
  if (devTech) {
    return Promise.resolve({ [devTech]: response[devTech] });
  } else {
    return Promise.resolve(response);
  }
};
