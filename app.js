var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const request = require('request');

var gradeA = require('./routes/data-dictionary/grade_a');
var gradeB = require('./routes/data-dictionary/grade_b');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // __dirname is the path to the project directory

/*  
 * Receive Restful API from TC
 * - http methods to be implemented : post(new), put(new or update), delete
 * - put or post : https://1ambda.github.io/javascripts/rest-api-put-vs-post/
 *  . put 과 post 는 idempotent 의 성질에 따른 사용성의 차이가 있다. 
 *  . 구현대상이 되는 기능은 post를 사용해서 insert를 하는게 맞고, put을 써서 update를 구현
 */
app.use('/data-dictionary/grade/a', gradeA);
app.use('/data-dictionary/grade/b', gradeB);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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






 /*  
 * RESTful API를 사용하여 http request 전송
 * - 각 RTP 서버 정보 관리
 * - request 모듈을 사용한 request method 작성
 * 
 */
/*
request({  
  url : 'https://jsonplaceholder.typicode.com/posts',
  json : true
}, (error, res, body) => {
  // console.log(JSON.stringify(body, undefined, 2));
});*/

module.exports = app;