import axios from "axios";
import { DevDiceApiResponse, DevTech } from "../../types";

const getApiHost = (): string => {
  const { NODE_ENV } = process.env;
  const { protocol, hostname, origin } = window.location;

  if (NODE_ENV === 'development') {
    const { REACT_APP_SERVER_APP_PORT } = process.env;
    return `${protocol}//${hostname}:${REACT_APP_SERVER_APP_PORT}`;
  } else {
    return origin;
  }
};

const getDieRoll = async (devTech?: DevTech): Promise<DevDiceApiResponse | void> => {
  try {
    const { data } = await axios.get(`${getApiHost()}/api/roll${devTech ? `/${devTech}` : ''}`);
    return data;
  } catch (error) {
    console.log(error);
  }

  return;
};

const ApiConnector = { getDieRoll };

export default ApiConnector;
