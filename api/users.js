const router = require('express').Router();
const { User, Notebook } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/* GET users listing. */
router
  .route('/login')
  .post((req, res, next) => {
    User.findOne({
      username: req.body.user.username
    })
    .then(user => {
      if (!user){
        return res.status(401).send('Invalid Username')
      } else {
        if (! user.validPass(req.body.user.password)) {
          return res.status(401).send('Invalid Password')
        } else {
          res.json({user: {username: user.username, id: user.id}})
        }
      }
    })
  })

router
  .route('/:id/notebooks')  
  .get((req, res, next) => {
    Notebook.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(notebooks => res.json(notebooks))
  })
  .post((req, res, next) => {
    Notebook.create({...req.body.notebook, UserId: req.params.id})
    .then(notebook => res.json(notebook))
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
  .post((req, res) => {
    const { username, email, password } = req.body.user;
    User.create({ username, email, password })
    .then(user => res.json({user: { username: user.username, id: user.id, email: user.email}}))
  })

module.exports = router;
