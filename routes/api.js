var utils    = require('../dice/dice-utils'),
    DICE     = {
      db      : new utils.Die(utils.db),
      backEnd : new utils.Die(utils.backEnd),
      frontEnd: new utils.Die(utils.frontEnd),
      vcs     : new utils.Die(utils.vcs)
    };

/**
 * Optional on {@code req.params}: a {@code +} delimited list of which dice to roll.
 *
 * @param req Request
 * @param res Response
 */
function roll(req, res) {
  var data = {},
      diceFromParams,
      d;

  if (req.params.dice !== undefined) {
    diceFromParams = req.params.dice.split('+');
    diceFromParams.forEach(function(el, i, arr) {
      if (el in DICE) {
        data[el] = DICE[el].roll()
      }
    });
  } else {
    for (d in DICE) {
      data[d] = DICE[d].roll();
    }
  }

  res.json(data);
}

exports.roll = roll;