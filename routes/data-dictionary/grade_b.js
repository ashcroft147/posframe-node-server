var express = require('express');
var router = express.Router();
const ppasdb = require('../ppasDB');

/* GET home page. */
router.post('/', (req, res, next) => {
  res.send({
    responseMessage: 'gradeB success',
    requestMethod: 'POST'

  });
});

router.put('/:snum', (req, res, next) => {
  res.send({
    responseMessage: 'gradeB success',
    requestMethod: 'PUT'
  });
})

module.exports = router;
