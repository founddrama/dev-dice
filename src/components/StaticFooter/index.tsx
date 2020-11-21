import React from "react";
import { SPACE } from "../common";

export default class StaticFooter extends React.Component {
  render(): JSX.Element {
    return (
      <footer>
        Created by <a href="https://twitter.com/founddrama">@founddrama</a>{SPACE}
        (<a href="https://github.com/founddrama/dev-dice">source on Github</a>){SPACE}
        and shared here with the caution that you probably don't want to use this{SPACE}
        for your real work.
      </footer>
    );
  }
}
