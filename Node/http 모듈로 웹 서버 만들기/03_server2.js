const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

	// 요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽는다.
	// data 변수에 저장된 버퍼를 그래로 클라이언트에 보내주면 된다.
	// 이전에는 문자열을 보냈지만 아래와 같이 버퍼를 보낼 수도 있다.
	fs.readFile('./03_server2.html', (err, data) => {
		if(err) {
			throw err;
		}
		res.end(data);
	});
}).listen(8080, () => {
	console.log('8080번 포트에서 서버 대기 중입니다!');
});

// HTML 파일을 읽어와 클라이언트로 전송하는 데 성공했다.
// 하지만 현재 서버는 클라이언트가 누구인지 모른다.
// 그냥 요청이 올 때 모두에게 같은 응답을 보내고 있다.
// 다음에서 서버가 클라이언트가 누구인지 기억해서 클라이언트별로 다르게 응답하는 방법을 알아보자.