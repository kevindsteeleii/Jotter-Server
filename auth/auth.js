const router = require('express').Router();
const { User }= require('../models');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';
router
  .route('/login')
  .post((req, res, next) => {
    User.findOne({
      where: {
        username: req.body.user.username
      }
    })
    .then(user => {
      if (!user){
        res.status(401).send('User not found.')
      } else {
        if (! user.validPass(req.body.user.password)) {
          res.status(401).send('Password invalid.');
        } else {
          jwt.sign({user}, SECRET, /* {expiresIn: '2h'}, */ (err, token) => {
            if(token) {
              res.json({token, user: {username: user.username, id: user.id}});
            } else {
              res.status(403).json({err});
            }
          })
        }
      }
    })
  })

router
  .route('/signup')
  .post((req, res, next) => {
    User.create({...req.body.user })
    .then(user =>  {
      const { username, id } = user;
      jwt.sign({user}, SECRET, /* {expiresIn: '2h'},  */(err, token) => {
        if(token){
          res.json({token, user: {username, id}});
        }
      })
      
    })
  })

router
  .post('/logout', (req, res) => {
    // logout logic here
  })

// Used for the middleware that sends
// router.use()
module.exports = router;