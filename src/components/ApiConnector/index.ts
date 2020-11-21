import Axios from "axios";
import { DevDiceApiResponse, DevTech } from "../../types";

export default class ApiConnector {
  API_HOST: string;

  constructor() {
    this.API_HOST = this.generateApiHost();
  }

  generateApiHost = (): string => {
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
  }

  getDieRoll = async (devTech?: DevTech): Promise<DevDiceApiResponse | void> => {
    try {
      const { data } = await Axios.get(`${this.API_HOST}/api/roll${devTech ? `/${devTech}` : ''}`);
      return data;
    } catch (error) {
      console.log(error);
    }

    return;
  }
}
