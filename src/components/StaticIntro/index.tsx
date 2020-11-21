import React from "react";
import { ASTERISK } from "../common";

export default class StaticIntro extends React.Component {
  render(): JSX.Element {
    return (
      <div className="intro">
        Are you pressed for time? Do you need to make a technology selection
        before the close of business but feel overwhelmed by the myriad choices?
        Are you neither interested in doing nor qualified to perform a cost/benefit
        analysis? Do you just need to get the ball rolling and make a
        recommendation to your stakeholders? Then put your trust in our patented
        "Project Management Dev Dice" and leave the technology selection to
        us! {ASTERISK}
      </div>
    );
  }
}
