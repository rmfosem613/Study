// cluster 모듈은 기본적으로 싱글 프로세스로 동작하는 노드가 CPU 모어를 모두 사용할 수 있게 해주는 모듈이다.
// 포트를 공유하는 노드 프로세스를 여러 개 둘 수도 있으므로,
// 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할 수 있다.
// 서버에 무리가 덜 가도록 한다.

// 예를 들어 코어가 여덞개인 서버가 있을 때,
// 노드는 보통 코어를 하나만 활용한다.
// 하지만 cluster 모듈을 설정하여 코어 하나당 노드 프로세스 하나가 돌아가게 할 수 있다.
// 성능이 꼭 여덟 배가 되는 것은 아니지만 코어를 하나만 사용할 때에 비해 성능이 개선된다.
// 하지만, 메모리를 공유하지 못하는 등의 단점도 있다.
// 세션을 메모리에 저장하는 경우 문제가 될 수 있다.
// 이는 레디스 등의 서버를 도입하여 해결할 수 있다.

// 02_sever1.js 를 클러스터링해보겠다.

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
	console.log(`마스터 프로세스 아니디: ${process.pid}`);
	// CPU 개수만큼 워커를 생산
	for(let i = 0; i < numCPUs; i += 1) {
		cluster.fork();
	}
	// 워커가 종료되었을 때
	cluster.on('exit', (worker, code, signal) => {
		console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
		console.log('code', code, 'signal', signal);
	});
} else {
	// 워커들이 포트에서 대기
	http.createServer((req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		res.write('<h1>Hello Node!</h1>');
		res.end('<p>Hello Cluster!</p>');
		setTimeout(()=>{ // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
			// 코어가 8개이므로 8번 새로고침하면 모든 워커가 종료되어 서버가 응답하지 않는다.
			process.exit(1);
		}, 1000);
	}).listen(8086);
	// console.log('8086번 포트에서 대기 중입니다.');
	console.log(`${process.pid}번 워커 실행`);
}


// worker_threads의 예제와 모양이 비슷하다.
// 다만 스레드가 아니라 프로세스이다.
// 클러스터에는 마스터 프로세스와 워커 프로세스가 있다.
// 마스터 프로세스는 CPU 개수만큼 워커 프로세스를 만들고,
// 8086번 포트에서 대기한다.
// 요청이 들어오면 만들어진 워커 프로세스에 요청을 분배한다.


// 직접 cluster 모듈로 클러스터링을 구현할 수도 있지만,
// 실무에서는 pm2 등의 모듈로 cluster 기능을 사용하고 한다.
// 파일이나 자원의 수가 늘어나면 그에 따라 주소의 종류도 많아져야 한다.
// if, 쿠키, 세션 등을 추가하게 되면 더욱 코드가 길어지고 복잡해질 수 밖에 없다.
// 이를 편리하게 만들어지는 모듈이 바로 Express 모듈이다.
