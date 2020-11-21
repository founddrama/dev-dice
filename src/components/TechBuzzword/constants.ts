import { DevTech } from '../../types';

export const DEVTECH_DEFAULTS: { [key in DevTech]: string } = {
  [DevTech.BACK_END]: 'some janky Python scripts',
  [DevTech.DATABASE]: 'stub JSON files',
  [DevTech.FRONT_END]: 'jQuery spaghetti',
  [DevTech.VERSION_CONTROL]: 'zip files with the version numbers on the end',
};
