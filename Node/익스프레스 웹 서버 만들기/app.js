// express 모듈을 app 변수에 할당한다.
// 익스프레스 내부에 http 모듈이 내장되어 잇으므로 서버의 역할을 할 수 있다.
const express = require('express');
const path = require('path');

const app = express();

// 기본값으로 300번 포트를 이용하도록 되어있다.
// app.set(키, 값)을 사용해서 데이터를 저장할 수 있다.
// 나중에 데이터를 app.get(키)로 가져올 수 있다.
app.set('port', process.env.PORT || 3000);

// app.get(주소, 라우터)는 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분이다.
// 매개변수 req는 요청에 관한 정보가 들어있는 객체이고, res는 응답에 관한 정보가 들어있는 객체이다.
// 현재 GET / 요청 시 응답으로 Hello, Express를 전송한다.
// 익스프레스에서는 res.write나 res.end 대신 res.send를 사용한다.
// GET 요청 외에서 POST, PUT, PATCH, DELETE, OPTIONS에 대한 라우터를 위한
//  app.post, app.put, app.patch, app.delete, app.options 메서드가 존재한다.
app.get('/', (req, res) => {
	//res.send('Hello, Express');
	// html 파일을 열기
	res.sendFile(path.join(__dirname, './index.html'));
});

// listen을 하는 부분은 http 웹 서버와 동일하다.
// 포트는 app.get('port')로 가져왔다.
app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});