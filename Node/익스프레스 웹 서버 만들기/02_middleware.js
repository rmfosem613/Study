// npm i morgan cookie-parser express-session dotenv

// dotenv를 제외한 다른 패키지는 미들웨어이다.
// dotenv는 process.env를 관리하기 위해 설치했다.

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// morgan 미들웨어
// 인수로 dev, combined, common, short, tiny 등을 넣을 수 있다.
// 주로 개발 환경에서는 dev,
// 배포 환경에서는 combined를 사용한다.
// dev 모드 기준
// GET / 500.7.409 ms - 50
// [HTTP 메서드][주소][HTTP 상태 코드][응답속도]-[응답 바이트]를 의미한다.
app.use(morgan('dev'));

// static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다.
// app.use('요청 경로', express.static('실제 경로'))
app.use('/', express.static(path.join(__dirname, 'public')));

// body-parser
// 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어이다.
// 보통 폼 데이터나 AJAX 요청의 데이터를 처리한다.
// 단 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못한다.
// 그 경우에는 multer모듈을 사용하면 된다.
// bldy-parser은 익스프레스에 내장되어 있다.
app.use(express.json());
// false면 노드의 querystring 모듈을 사용하여 쿼스스트링을 해석하고, true면 qs 모듈을 사용해 쿼리스트링을 해석한다.
// qs 모듈은 내장 모듈이 아니라 npm 패키지이며, querystring 모듈의 기능을 좀 더 확장한 모듈이다.
app.use(express.urlencoded({extended: false}));

// cookie-parser은 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.
// parseCookies 함수와 기능이 비슷하다.
// app.use(cookieParser(비밀키));
// 해석된 쿠키들은 req.cookies 객체에 들어간다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// express-sessing
// 세션 관리용 미들웨어이다.
// 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.
// 세션은 사용자별로 req.session 객체안에 유지된다.
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET,
	cookie: {
		httpOnly: true,
		secure: false,
	},
	name: 'session-cookie',
}));

// 미들웨어는 req, res, next를 매개변수로 가지는 함수로서
// app.use나 app.get, app.post 등으로 장착한다.
// 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
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