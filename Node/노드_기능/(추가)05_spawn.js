// child_process
// 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈이다.
// 이 모듈을 통해 다른 언어의 코드(ex python..)를 실행하고 결과값을 받을 수 있다.
// 이름이 child_process인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고,
// 노드 프로세스에 결과를 알려주기 때문이다.

// test.py 파일을 실행하는 코드

const spawn = require('child_process').spawn;

const process = spawn('python', ['test.py']);

process.stdout.on('data', function(data) {
	console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
 	console.error(data.toString());
}); // 실행 에러

// 에러가 나는데 이유를 잘 모르겠음
// 포트를 사용중이라서 라는데 사용중이나른 포트번호가 뜨지 않음ㅠㅜ