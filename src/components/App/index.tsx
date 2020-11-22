import React from 'react';
import { DevDiceApiResponse, DevTech } from '../../types';
import { ASTERISK, SPACE } from '../common';
import { getDieRoll } from '../ApiConnector';
import TechBuzzword from '../TechBuzzword';
import StaticFooter from '../StaticFooter';
import StaticIntro from '../StaticIntro';

type DevDiceAppProps = {};
type DevDiceAppState = DevDiceApiResponse & {
  isVcsChecked: boolean;
};

export default class App extends React.Component<DevDiceAppProps, DevDiceAppState> {
  constructor(props: DevDiceAppProps) {
    super(props);
    this.state = { isVcsChecked: false };
  }

  rollDice = async (devTech?: DevTech): Promise<void> => {
    const data = await getDieRoll(devTech);
    this.setState({ ...data });
  };

  componentDidMount(): void {
    this.rollDice();
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
              <TechBuzzword onClick={this.rollDice} devTech={DevTech.FRONT_END} techName={frontEnd} />
              {SPACE}on top of{SPACE}
              <TechBuzzword onClick={this.rollDice} devTech={DevTech.BACK_END} techName={backEnd} />
              {SPACE}with{SPACE}
              <TechBuzzword onClick={this.rollDice} devTech={DevTech.DATABASE} techName={db} />
              {SPACE}for persistence.
            {isVcsChecked &&
              <>
                {SPACE}As for version control, we're putting the whole thing into{SPACE}
                <TechBuzzword onClick={this.rollDice} devTech={DevTech.VERSION_CONTROL} techName={vcs} />.
              </>
            }
            </p>
          </div>

          <div className="controls">
            <span className="reroll" onClick={() => this.rollDice()}>Roll again!</span>
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
