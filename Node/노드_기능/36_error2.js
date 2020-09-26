// 이번에는 노드 자체에서 잡아주는 에러에 대해 알아보자

const fs = require('fs');

setInterval(() => {

	// fs.unlink()로 없는 파일을 지우고 있다.
	fs.unlink('./abcdefg.js', (err) => {

		// 에러가 발생하지만 다행히 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다.
		// 에러 로그를 기록해두고 나중에 원인을 찾아 수정하면 된다.
		if (err) {
			console.error(err);
		}
	});
}, 1000);

// 에러가 발생했을 때 throw를 사용했었다.
// 그런데 throw를 하면 노드 프로세스가 멈춰버린다.
// 따라서 throw를 하는 경우에는 반드시 try catch문으로 throw한 에러를 잡아주어야 한다.