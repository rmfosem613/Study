const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 쿠키는 mycookie=test같은 문자열이다.
// 이 함수를 거치면 {mycookie: 'test'}가 된다.
// parseCookies 함수가 문자열을 개개체로 바꿔준다.
const parseCookies = (cookie = '') => 
	cookie.split(';')
		.map(v => v.split('='))
		.reduce((acc, [k,v]) => {
			acc[k.trim()] = decodeURIComponent(v);
			return acc;
		}, {});

// 주소가 /login과 /로 시작하는 것까지 두개이기 때문에 주소별로 분기 처리를 했다.

http.createServer(async (req, res) => {
	const cookies = parseCookies(req.headers.cookie);

	// 1. 주소가 /login으로 시작하는 경우
	// url과 querystring 모듈로 각각 주소와 주소에 딸려 오는 query를 분석한다.
	// 302 응답 코드, 리다이렉트 주소와 함꼐 쿠키를 헤더에 넣는다.
	// 헤더에는 한글을 설정할 수 없으므로 name 변수를 encodeURIComponent 메서드로 인코딩했다.
	if(req.url.startsWith('/login')) {
		const {query} = url.parse(req.url);
		const {name} = qs.parse(query);
		const expires = new Date();
		// 쿠키 유효 시간을 현재 시간 + 5 분으로 설정
		expires.setMinutes(expires.getMinutes() + 5);

		// 쿠키를 설정할 때 만료 기간(Expires)과 HttpOnly, Path 같은 옵션을 부여했다.
		// 쿠키는 설정할 때 각종 옵션들을 넣을 수 있다.
		// 옵션 간에는 세미콜론(;)으로 구분하면 된다.
		// 쿠키명 = 쿠키값 : 기본적인 쿠기의 값이다.
		// Expires = 날짜 : 만료기한이다. 이 기한이 지나면 쿠키가 제거된다. 기본값은 클라이언트가 종료될 때까지이다.
		// Max-age=초 : Expires와 비슷하지만 날짜 대신 초를 입력할 수 있다. 해당 초가 지나면 쿠키가 제거된다. expires보다 우선시한다.
		// Domain=도메인명 : 쿠키가 전송될 도메인을 특정할 수 있다. 기본값은 현재 도메인이다.
		// Path=URL : 쿠키가 전송될 URL을 특정할 수 있다. 기본값은 '/'이고 이 경우 모든 URL에서 쿠키를 전송할 수 있다.
		// Secure : HTTPS일 경우에만 쿠키가 전송된다.
		// HttpOnly : 설정 시 js에서 쿠키에 접근할 수 없다. 쿠키 조작을 방지하기 위해 설정하는 것이 좋다.

		res.writeHead(302, {
			Location: '/',
			'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
		});
		res.end();

		// name이라는 쿠키가 있는 경우
		// 그 외의 경우(/로 접속했을 때 등), 먼저 쿠키가 있는지 없는지를 확인한다.
		// 쿠키가 없다면 로그인할 수 있는 페이지를 보낸다.
		// 처음 방문한 경우에는 쿠키가 없으므로 06_cookie2.html이 전송된다.
		// 쿠키가 있다면 로그인한 상태로 간주하여 인사말을 보낸다.
	} else if(cookies.name) {
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
		res.end(`${cookies.name}님 안녕하세요`);
	} else {
		try {
			const data = await fs.readFile('./06_cookie2.html');
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
			res.end(data);
		} catch (err) {
			res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
			res.end(err.message);
		}
	}
}).listen(8084, () => {
	console.log('8084번 포트에서 서버 대기 중입니다!');
});

// 원하는 대로 동작하기는 하지만 이 방식은 상당히 위험하다.
// 현재 Application 탭에서 보이는 것처럼 쿠키가 노출되어 있다.
// 또한, 쿠키가 조작될 위험도 있다.
// 따라서 민간한 개인정보를 쿠키에 넣어두는 것은 적절하지 못하다.