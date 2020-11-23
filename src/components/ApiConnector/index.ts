import axios from "axios";
import { DevDiceApiResponse, DevTech } from "../../types";

const getApiHost = (): string => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    const {
      REACT_APP_PROTOCOL,
      REACT_APP_HOSTNAME,
      REACT_APP_SERVER_APP_PORT,
    } = process.env;
    return `${REACT_APP_PROTOCOL}//${REACT_APP_HOSTNAME}:${REACT_APP_SERVER_APP_PORT}`;
  } else {
    return window.location.origin;
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

export default { getDieRoll };
