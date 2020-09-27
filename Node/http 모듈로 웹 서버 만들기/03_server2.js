const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
	try{
		const data = await fs.readFile('./03_server2.html');
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
		res.end(data);
	} catch(err) {
		console.error(err);
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
		res.end(err.message);
	}
}).listen(8081, () => {
		console.log('8081번 포트에서 서버 대기 중입니다!');
	});

// 요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽는다.
// data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 된다.
// 이전 예제에서는 문자열을 보냈지만 위와 같이 버퍼를 보낼 수도 있다.
// 에러 메시지는 일반 문자열이므로 text/plain을 사용했다.

// Note!!
// HTTP 상태 코드
//	- 2XX : 성골을 알리는 상태 코드. 대표적으로 200(성공), 201(작성됨)이 많이 사용됨.
//	- 3XX : 리다이렉션(다른 페이지로 이동)을 알리는 상태 코드. 대표적으로 301(영구 이동), 302(임시이동)이 있음
//	- 4XX : 요청 오류를 나타냄. 대표적으로 400(잘못된 요청), 401(권한 없음), 403(찾을 수 없음)이 많이 사용됨.
//	- 5XX : 서버 오류를 나타냄. 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생한다.
//          대표적으로 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)이 자주 사용된다.
