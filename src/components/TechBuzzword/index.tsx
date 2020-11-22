import React from 'react';
import { DevTech } from '../../types';
import { DEVTECH_DEFAULTS } from './constants';

type TechBuzzwordProps = {
  devTech: DevTech;
  techName?: string;
  onClick: (devTech: DevTech) => void;
};

export default class TechBuzzword extends React.Component<TechBuzzwordProps> {
  techNameOrDefault = (): string => {
    const { techName, devTech } = this.props;
    return techName || DEVTECH_DEFAULTS[devTech];
  }

  render(): JSX.Element {
    const { devTech, onClick } = this.props;

    return (
      <span className="tech" onClick={() => onClick(devTech)}>
        {this.techNameOrDefault()}
      </span>
    );
  }
}
