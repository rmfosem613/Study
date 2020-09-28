// 미들웨어는 익스프레스의 핵심이다.
// 요청과 응답의 중간에 위치하여 미들웨어라고 부른다.
// 뒤에 나오는 라우터와 에러 핸들러 또한 미들웨어의 일종으로 미들웨어가 익스프레스의 전부라고 해도 과언이 아니다.
// 미들웨어는 요청과 응답을 조작하여 기능을 추가하고, 나쁜 요청을 걸러내기도 한다.

// 미들웨어는 app.use와 함께 사용된다.
// app.use(미들웨어) : 모든 요청에서 미들웨어 실행
// app.use('./abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
// app.post('./abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
	console.log('모든 요청에 다 실행됩니다.');
	// next를 호출해야 다음 미들웨어로 넘어갈 수 있다.
	next();
});

app.get('/', (req, res, next) => {
	console.log('GET / 요청에서만 실행됩니다.');
	next();
}, (req, res) => {
	throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 대기 중');
});