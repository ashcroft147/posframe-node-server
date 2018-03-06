## Routing

express에서 Routing이란 client 로부터 요청받은 URL을 View와 매칭시키는 작업을 의미한다. 

## Method

~~~
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
~~~

get 함수는 GET 방식으로 등러오는 경로를 연결하여, 이에 대응하는 동작을 콜백함수로 정의한다. req는 Request Object이고, res는 Response Object 이다. req는 client에서 보낸 정보가 담겨 있고, res는 client에 응답할때 사용하는 객체인데, 위 코드에서는 index.ejs 파일을 rendering 하는 작업을 수행한다. 
