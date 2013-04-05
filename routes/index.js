var dice     = require('../dice/dice-utils'),
    db       = new dice.Die(dice.db),
    backEnd  = new dice.Die(dice.backEnd),
    frontEnd = new dice.Die(dice.frontEnd);


/**
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    title: 'Dev Dice',
    db: db.roll(),
    backEnd: backEnd.roll(),
    frontEnd: frontEnd.roll()
  });
};