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

// 주소가 /login과 /로 시작하는 것까지 두개이기 때문에 주소별로 분기 처리를 했다.

// 1. 주소가 /login으로 시작할 경우에는 url과 querystring 모듈로 각각 주소와 주소에 딸려오는 query를 분석한다.
// 그리고 쿠키의 만료 시간도 지금으로부터 5분 뒤로 설정하였다.
// 이제 302 응답 코드, 리다이렉트 주소와 함께 쿠키를 헤더에 넣는다.
// 브라우저는 이 응답 코드를 보고 페이지를 해당 주소로 리다이렉트한다.
// 헤더에는 한글을 설정할 수 없으므로 name 변수를 encodeURIComponent 메서드로 인코딩했다.

// 2. 그 외의 경우 (/로 접송했을 때 등),
// 먼저 쿠키가 있는지 없는지를 확인한다.
// 쿠키가 없다면 로그인할 수 있는 페이지를 보낸다.
// 처음 방문한 경우엔 쿠키가 없으므로 server4.html이 전송된다.
// 쿠키가 있다면 로그인한 상태로 간주하여 인사말을 보낸다,
// res.end 메서드에 한글이 들어가면 인코딩 문제가 발생하므로
// res.writeHead에 Content-Type을 text/html; charset=utf-8로 설정해 인코딩을 명시하였다.

http.createServer((req, res) => {
	const cookies = parseCookies(req.headers.cookie);
	if(req.url.startsWith('/login')) {
		const {query} = url.parse(req.url);
		const {name} = qs.parse(query);
		const expires = new Date();
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
			'Set-Cookie' : `name=${encodeURIComponent(name)};
			Expires=${expires.toGMTString()};
			HttpOnly;
			Path=/`,
		});
		res.end();
	} else if(cookies.name) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
		res.end(`${cookies.name}님 안녕하세요`);
	} else {
		fs.readFile('./05_server4.html', (err, data) => {
			if (err) {
				throw err;
			}
			res.end(data);
		});
	}
}).listen(8083, () => {
	console.log('8083번 포트에서 서버 대기 중입니다!');
});