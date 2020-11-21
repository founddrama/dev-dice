require('dotenv').config();

const express    = require('express');
const logger     = require('express-logger');
const http       = require('http');
const cors       = require('cors');

const {
  db,
  backEnd,
  frontEnd,
  vcs
} = require('./dice-utils');

const DICE = { db, backEnd, frontEnd, vcs };

const app = express();

// all environments
const { PORT, REACT_APP_SERVER_APP_PORT } = process.env;
app.set('port', PORT || REACT_APP_SERVER_APP_PORT || 3000);
app.use(logger({path:`${__dirname}/server.log`}));

if (process.env.NODE_ENV) {
  app.use(cors());
}

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

app.use(express.static('./build'));
app.route('/').get((_req, res) => res.sendFile('./build/index.html', { root: __dirname }));
app.route('/api/roll').get(roll);
app.route('/api/roll/:dice').get(roll);

http.createServer(app).listen(app.get('port'), function() {
  console.log(`Express server listening on port ${app.get('port')}`);
});
