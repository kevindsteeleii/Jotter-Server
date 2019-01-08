const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./api/index');
const usersRouter = require('./api/users');
const notebookRouter = require('./api/notebooks');
const noteRouter = require('./api/notes');
const app = express();

app.use(logger('dev'));
/* app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()) */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notebooks', notebookRouter);
app.use('/notes', noteRouter);

module.exports = app;
