// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var expressHbs   = require('express-handlebars');

var viewRoutes   = require('./routes/viewRoutes');

let instancesRouter = require('./routes/instances'),
    authRoutes = require('./routes/auth'),
    homeRoutes = require('./routes/home'),
    userRoutes = require('./routes/user'),
    categoryRoutes = require('./routes/category'),
    goalRoutes = require('./routes/goal'),
    defaultSiteRouter = require('./routes/defaultSite');

var configDB     = require('./config/database');

//for angular static files =====================================================
app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

//Enable cors supports ==========================================================
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// required for passport
app.use(session({
    secret: 'mySecret', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

app.use('/view', viewRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/defaultSite', defaultSiteRouter);
app.use('/instances', instancesRouter);
app.use('/category', categoryRoutes);
app.use('/goal', goalRoutes);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
