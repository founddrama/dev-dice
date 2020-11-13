const {
  db,
  backEnd,
  frontEnd,
  vcs
} = require('../dice/dice-utils');

const DICE = { db, backEnd, frontEnd, vcs };

/**
 * Optional on {@code req.params}: a {@code +} delimited list of which dice to roll.
 *
 * @param req Request
 * @param res Response
 */
const roll = (req, res) => {
  const { dice } = req.params;
  let diceToRoll;

  if (dice !== undefined) {
    diceToRoll = dice.split('+');
  } else {
    diceToRoll = Object.keys(DICE);
  }

  res.json(diceToRoll.reduce((accumulator, die) => {
    return { ...accumulator, [die]: DICE[die].roll() };
  }, {}));
}

exports.roll = roll;
