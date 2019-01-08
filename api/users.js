const router = require('express').Router();
const { User, Notebook } = require('../models');
const {verifyToken} = require('../auth/authHelp');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

/* GET users listing. */

router
  .route('/:id/notebooks')
  .get((req, res) => {
    Notebook.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(notebooks => res.json(notebooks))
  })
  .post(verifyToken, (req, res) => {
    jwt.verify(req.token, SECRET, (err, authData) => {
      if (err) {
        res.status(403)
      } else {
        Notebook.create({...req.body.notebook, UserId: req.params.id})
        .then(notebook => res.json(notebook))}
    })
  })

router
  .route('/')
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    User.findAll({
      attributes: ['id', 'username','email']
    }).then(users => res.json(users))
  })

module.exports = router;
