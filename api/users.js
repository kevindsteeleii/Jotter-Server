const router = require('express').Router();
const { User, Deck } = require('../models');
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
  .route('/')
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    User.findAll({
      attributes: ['id', 'email']
    }).then(users => res.json(users))
  })
  .post((req, res) => {
    console.log('\n',req.body);
    // debugger
    const { username, email, password } = req.body.user;
    return User.create({ username, email, password })
    .then(user => res.json(user))
  })
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
