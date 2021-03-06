//installed 3rd party packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//modules for authentication
let session = require ('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


//Database Setup
let mongoose = require('mongoose');
let DB = require('./db');


//Connect to Database
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'Connection Error: '));
mongodb.once('open', ()=>{
  console.log('Connected to MongoDB...');
});


var indexRouter = require('../routes/index');
var aboutRouter = require('../routes/about');
var projectsRouter = require('../routes/projects');
var contactRouter = require('../routes/contact');
var servicesRouter = require('../routes/services');
var businessRouter = require('../routes/business');
var usersRouter  = require('../routes/users');
const { Passport } = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//setup expression session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

//initialize flash
app.use(flash());  //maintain error message

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactRouter);
app.use('/services', servicesRouter);
app.use('/business', businessRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
