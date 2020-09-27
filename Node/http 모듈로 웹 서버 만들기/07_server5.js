// 다음과 같이 코드를 변경해 사용자 정보를 관리하도록 한다.

// 05_server4와는 살짝 달라진 부분이 있다.

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
	cookie.split(';')
		.map(v => v.split('='))
		.map(([k, ...vs]) => [k, vs.join('=')])
		.reduce((acc, [k,v]) => {
			acc[k.trim()] = decodeURIComponent(v);
			return acc;
		}, {});

// session 객체 만들기
const session = {};

http.createServer((req, res) => {
	const cookies = parseCookies(req.headers.cookie);
	if(req.url.startsWith('/login')) {
		const {query} = url.parse(req.url);
		const {name} = qs.parse(query);
		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + 5);

		const randomInt = Date.now();
		// 사용자의 이름과 만료 시간은 session이라는 객체에 대신 저장한다.
		session[randomInt] = {
			name,
			expires,
		};

		res.writeHead(302, {
			Location: '/',
			// 쿠키에 이름을 담아 보내는 대신, randomInt라는 임의의 숫자를 보냈다.
			'Set-Cookie' : `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
		});
		res.end();
		// 이제 cookie.session이 있고 만료 기한을 넘기지 않았다면 session변수에서 사용자 정보를 가져와서 사용한다.
	} else if(cookies.session && session[cookies.session].expires > new Date()) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
		res.end(`${session[cookies.session].name}님 안녕하세요`);
	} else {
		fs.readFile('./05_server4.html', (err, data) => {
			if (err) {
				throw err;
			}
			res.end(data);
		});
	}
}).listen(8084, () => {
	console.log('8084번 포트에서 서버 대기 중입니다!');
});

// 이 방식이 세션이다.
// 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통한다.
// 세션 아이디는 꼭 쿠키를 사용해서 주고 받지 않아도 된다.
// 하지만 많은 웹 사이트가 쿠키를 사용한다.
// 쿠키를 사용하는 방법이 제일 간단하기 때문이다.

// 물론 실제 배포용 서버에서는 세션을 위와 같이 변수에 저장하지 않는다.
// 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되기 때문이다.
// 그래서 보통은 데이터베이스에 넣어둔다.

// 서비스를 새로 만들 때마다 쿠키와 세션을 직접 구현할 수는 없다.
// 게다가 지금 코드로는 쿠키를 악용한 여러 가지 위협을 방어하지도 못한다.
// 위의 방식 역시 세션 아이디 값이 공개되어 있어 누출되면 다른 사람이 사용할 수 있다.
// 따라서 절대 위의 코드를 실제 서비스에 사용해서는 안된다.
// 위의 코드는 개념을 설명하기 위한 코드이며, 보안상 매우 취약하다.
// 다른 사람의 코드(모듈)를 사용하는 것이 좋다.