var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session')
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser= require('body-parser')
var app = express();

const isAuthenticated = (req,res,next)=>{
  if(req.session.userId){
    req.user=req.session.userId;
    next()
  }else{
    res.redirect('/')
  }
}
app.use(
  session({
    key:'abhi',
    secret:'thisiskey',
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:600000
    }
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);

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
  res.render('error');
});

mongoose
  .connect(
    'mongodb://localhost:27017/news'
  )
  .then(result => {
   
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
module.exports = app;
