// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var expressHbs   = require('express-handlebars');

var viewRoutes   = require('./routes/viewRoutes');

var Instance = require('./models/instance');

let instancesRouter = require('./routes/instances'),
    authRoutes = require('./routes/auth'),
    homeRoutes = require('./routes/home'),
    userRoutes = require('./routes/user'),
    categoryRoutes = require('./routes/category'),
    goalRoutes = require('./routes/goal'),
    apiRoutes = require('./routes/api'),
    optionRoutes = require('./routes/option'),
    industryRoutes = require('./routes/industry'),
    sickRoutes = require('./routes/sick'),
    occupationRoutes = require('./routes/occupation'),
    assessRiskRoutes = require('./routes/assessRisk'),
    homePageRoutes = require('./routes/homePage'),
    accomplishmentRoutes = require('./routes/accomplishment'),
    futureGoalRoutes = require('./routes/futureGoal'),
    siteUserRoutes = require('./routes/siteUser'),
    siteUserSignUpRoutes = require('./routes/siteUserSignUp'),
    myPlanRoutes = require('./routes/myPlan'),
    defaultInstanceRoutes = require('./routes/defaultInstance'),
    cardRoutes = require('./routes/card'),
    cardButtonRoutes = require('./routes/cardButton'),
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

var hbs = expressHbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function () { return 'FOO!'; },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if( lvalue!=rvalue ) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
});

app.engine('.hbs', expressHbs({
    helpers: {
        foo: function () { return 'FOO!'; },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if( lvalue!=rvalue ) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    },
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
app.use(flash());

app.use(function (req, res, next) {
    Instance.findOne({isHome: true}, (err, defaultInstance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.locals.login = req.isAuthenticated();
            res.locals.defaultInstance = defaultInstance;
            // res.locals.messages = require('express-messages')(req, res);
            res.locals.userInfo = req.user;
            next();
        }
    });
});

app.use('/view', viewRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/defaultSite', defaultSiteRouter);
app.use('/instances', instancesRouter);
app.use('/category', categoryRoutes);
app.use('/goal', goalRoutes);
app.use('/option', optionRoutes);
app.use('/api', apiRoutes);
app.use('/industry', industryRoutes);
app.use('/occupation', occupationRoutes);
app.use('/sick', sickRoutes);
app.use('/assessRisk', assessRiskRoutes);
app.use('/homePage', homePageRoutes);
app.use('/futureGoal', futureGoalRoutes);
app.use('/siteUser', siteUserRoutes);
app.use('/siteUserSignUp', siteUserSignUpRoutes);
app.use('/accomplishment', accomplishmentRoutes);
app.use('/myPlan', myPlanRoutes);
app.use('/card', cardRoutes);
app.use('/cardButton', cardButtonRoutes);
app.use('/defaultInstance', defaultInstanceRoutes);
app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
