/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    api     = require('./routes/api'),
    http    = require('http'),
    path    = require('path'),

    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));

// development only
if (app.get('env') == 'development') {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/roll', api.roll);
app.get('/api/roll/:dice', api.roll);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
