const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./auth/auth');
const usersRouter = require('./api/users');
const notebookRouter = require('./api/notebooks');
const noteRouter = require('./api/notes');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/notebooks', notebookRouter);
app.use('/notes', noteRouter);

module.exports = app;
