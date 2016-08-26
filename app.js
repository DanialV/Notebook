global.init = require('./config.json');
global.init.version = require('./package.json').version;


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');


var routes = require('./Server/routes/index');
var users = require('./Server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Client/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client/public')));
app.use(session({
    name: 'scoreboard_session',
    secret: 'kytddkhovoqyfjgfhch'
}));
app.use(csrf({
    cookie: true,
    key : '_CSURF_TOKEN'
}));
require('./Server/utils/modules');
require('./Server/routes/root')(app);
module.exports = app;
