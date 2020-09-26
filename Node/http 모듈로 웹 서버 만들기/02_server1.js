// 서버는 클라이언트가 있기에 동작한다.
// 클라이언트에서 서버로 요청(request)을 보내고,
// 서버에서는 요청의 내용을 읽고 처리한 뒤 클라이언트에게 응답(response)을 보낸다.
// 따라서 서버에는 요청을 받는 부분과 응답을 보내는 부분이 있어야 한다.
// 요청과 응답은 이벤트 방식이라고 생각하면 된다.
// 클라이언트로부터 요청이 왔을 때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해두어야 한다.

// 이벤트 리스너를 가진 노드 서버 만들기

// listen 메서드에 콜백 함수를 넣는 대신,
// 서버에 listening 이벤트 리스너를 붙여넣기

const http = require('http');

const server = http.createServer((req, res) => {
	//여기에 어떻게 응답할지 적어준다.
	
	res.write('<h1>Hello Node!</h1>'); // 클라이언트로 보낼 데이터
	res.end('<p>Hello Server!</p>'); // 클라이언트로 보내고 응답을 종료
});
server.listen(8080);

server.on('listening', () => {
	console.log('8080 포트에서 서버 대기 중입니다!');
});

// error 이벤트 리스너
server.on('error', (error) => {
	console.error(error);
});



