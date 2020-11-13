require('dotenv').config();

const express    = require('express');
const logger     = require('express-logger');
const routes     = require('./routes');
const api        = require('./routes/api');
const http       = require('http');
const path       = require('path');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(logger({path:`${__dirname}/server.log`}));
app.use(express.static(path.join(__dirname, 'static')));

app.route('/').get(routes.index);
app.route('/api/roll').get(api.roll);
app.route('/api/roll/:dice').get(api.roll);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
