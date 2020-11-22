import React from 'react';
import { DevDiceApiResponse, DevTech } from '../../types';
import { ASTERISK, SPACE } from '../common';
import ApiConnector from '../ApiConnector';
import TechBuzzword from '../TechBuzzword';
import StaticFooter from '../StaticFooter';
import StaticIntro from '../StaticIntro';

type DevDiceAppProps = {};
type DevDiceAppState = DevDiceApiResponse & {
  isVcsChecked: boolean;
};

export default class App extends React.Component<DevDiceAppProps, DevDiceAppState> {
  apiConnector: ApiConnector;

  constructor(props: DevDiceAppProps) {
    super(props);
    this.apiConnector = new ApiConnector();
    this.state = { isVcsChecked: false };
  }

  getDieRoll = async (devTech?: DevTech): Promise<void> => {
    const data = await this.apiConnector.getDieRoll(devTech);
    this.setState({ ...data });
  };

  componentDidMount(): void {
    this.getDieRoll();
  }

  render(): JSX.Element {
    const {
      isVcsChecked,
      db,
      backEnd,
      frontEnd,
      vcs,
    } = this.state;

    return (
      <>
        <h1>Project Management Dev Dice</h1>
        <section>
          <StaticIntro />

          <div className="technology-statement">
            <p className="boss-quote">
              No problem, boss. We're going to use{SPACE}
              <TechBuzzword onClick={this.getDieRoll} devTech={DevTech.FRONT_END} techName={frontEnd} />
              {SPACE}on top of{SPACE}
              <TechBuzzword onClick={this.getDieRoll} devTech={DevTech.BACK_END} techName={backEnd} />
              {SPACE}with{SPACE}
              <TechBuzzword onClick={this.getDieRoll} devTech={DevTech.DATABASE} techName={db} />
              {SPACE}for persistence.
            {isVcsChecked &&
              <>
                {SPACE}As for version control, we're putting the whole thing into{SPACE}
                <TechBuzzword onClick={this.getDieRoll} devTech={DevTech.VERSION_CONTROL} techName={vcs} />.
              </>
            }
            </p>
          </div>

          <div className="controls">
            <a className="reroll" onClick={() => this.getDieRoll()} data-ng-click="reRoll()">Roll again!</a>
            <div className="VCS_checkbox--container">
              <label htmlFor="vcs">Greenfield Project? Need version control, too?</label>
              <input type="checkbox" name="vcs" id="vcs" onClick={() => this.setState({ isVcsChecked: !isVcsChecked })} />
            </div>
          </div>

          <div className="footnotes">
            {ASTERISK} Where by "us", we mean "chance".
          </div>
        </section>
        <StaticFooter />
      </>
    );
  }
}
