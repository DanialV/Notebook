global.init = require('./config.json');
global.init.version = require('./package.json').version;
global.init.db_name = '118';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'Client/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'Client/public/fonts', 'favicon.ico')));
//app.use(logger('dev'));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Client/public')));
app.use(session({
    name: 'sadjad118_session',
    secret: 'kytddkhovoqyfjgfhch'
}));
app.use(csrf({
    cookie: true,
    key : '_CSURF_TOKEN'
}));
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});
require('./Server/utils/modules');
require('./Server/routes/root')(app);
module.exports = app;
