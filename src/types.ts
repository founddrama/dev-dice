export enum DevTech {
  FRONT_END = 'frontEnd',
  BACK_END = 'backEnd',
  DATABASE = 'db',
  VERSION_CONTROL = 'vcs',
};

export type DevDiceApiResponse = {
  db?: string;
  backEnd?: string;
  frontEnd?: string;
  vcs?: string;
};
