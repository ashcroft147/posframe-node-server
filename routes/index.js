var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', method: 'GET' });
});

router.post('/', (req, res, next) => {
  res.send({
    title: 'success'
  });
})

module.exports = router;
