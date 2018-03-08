const express = require('express');
const router = express.Router();
const ppas = require('../ppas/index');

 /* 
  * A급 항목
  *  
  * JNDI 를 사용해 광양 NRTP PPAS DB에 접속
  * - 각 RTP 서버의 JNDI 정보 관리
  */
router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body, undefined, 2));
  console.log(req.body.std_item_snum);
  ppas.log();
  res.send({
    responseMessage: 'gradeA success', 
    requestMethod: 'POST'
  });
});

router.put('/', function(req, res, next) {
  res.send({
    responseMessage: 'gradeA success', 
    requestMethod: 'PUT'
  });
});

module.exports = router;
