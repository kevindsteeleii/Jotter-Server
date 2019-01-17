var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/test', function(req, res, next) {
  res.json(200, 'This is working')
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
