// 노드에서 멀티 스레드 방식으로 작업하는 방법
// worker_threads 모듈로 가능하다.

const {
	Worker, isMainThread, parentPort,
} = require('worker_threads');

// 현재 스레드가 메인 스레드에서 실행되는지, 아니면 우리가 생성한 워커 스레드에서 실행되는지 구분해 볼 수 있다.
if(isMainThread) { // 부모일때
	
	// 메인 스레드에서 new Worker을 통해 현재 파일을 워커 스레드에서 실행시킨다.
	const worker = new Worker(__filename);

	// 부모는 worker.on('message')로 worker 메시지를 받는다.
	// 메시지를 한 번만 받고 싶다면 once를 사용하면 된다.
	worker.on('message', message => console.log('from worker', message));
	
	// 종료될 때 실행된다.
	worker.on('exit', () => console.log('Worker exit'));
	
	// 부모에서는 워커 생성 후 worker.postMessage로 워커에 데이터를 보낼 수 있다.
	worker.postMessage('ping');
} else { // 워커일 때

	// 워커는 parentPort.on('message') 이벤트 리스너로 부모로부터 메시지를 받는다.
	parentPort.on('message', (value) => {
		console.log('from parent', value);

		// parentPort.postMessage로 부모에게 메시지를 보낸다.
		parentPort.postMessage('pong');

		// parentPort.close를 하면 부모와의 연결이 종료된다.
		parentPort.close();
	});
}