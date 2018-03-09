const express = require('express');
const router = express.Router();
const ppasdb = require('../ppasDB');
const parseString = require('xml2js').parseString;;	
const fs = require('fs');
var HashMap = require('hashmap');
var sqlMap = new HashMap();
var util = require('util');

 /* 
  * A급 항목
  *  
  * JNDI 를 사용해 광양 NRTP PPAS DB에 접속
  * - 각 RTP 서버의 JNDI 정보 관리
  */
router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body, undefined, 2));
  
    // 1. load xml file parsing 
    var mapperDir = __dirname + '/mapper/';
    var mapperFiles = fs.readdirSync(mapperDir);

    mapperFiles.forEach((file, i) => {
      var data = fs.readFileSync(mapperDir+file);

      parseString(data, function(err, result) {
        var queries = result.query;
        var keys = Object.keys(queries);
        
        // 2. Queries set to HashMap
        keys.forEach((key, i) => {
          console.log(key);
          if(sqlMap.has(key)) {
            console.error('(XML) == 이미 등록된 Key가 있습니다.', file, key);
          }
          sqlMap.set(key, queries[key][0]);
        });
    });
  });


  // 3. get query string
  var sqlStr = sqlMap.get('insert-standard-if');

  console.log(sqlStr);

  // ppasDB로부터 connect method 호출
  ppasdb.connect((err, client, done) => {
    // done();
  });

  ppasdb.query(sqlStr, [], (err, result) => {
    if (err) {
      console.log('error ::' + err.stack)
    } else {
      console.log('res ::' + JSON.stringify(result.rows[0], undefined, 2));
    }
    
    // res.status(200).send(result.rows);
  });

});

router.put('/:snum', function(req, res, next) {
  res.send({
    responseMessage: 'gradeA success', 
    requestMethod: 'PUT'
  });
});

module.exports = router;
