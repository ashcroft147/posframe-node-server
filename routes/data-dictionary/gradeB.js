var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', (req, res, next) => {
  res.send({
    responseMessage: 'gradeB success',
    requestMethod: 'POST'

  });
});

router.put('/', (req, res, next) => {
  res.send({
    responseMessage: 'gradeB success',
    requestMethod: 'PUT'
  });
})

module.exports = router;
