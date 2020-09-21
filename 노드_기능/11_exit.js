let i = 1;
setInterval(() => {
	if (i=== 5) {
		console.log('종료!');
		process.exit(); // 실행중인 노드 프로세스를 종료
		// 서버에 사용하면 서버가 멈춤, 서버 외에 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용됨
	}
	console.log(i);
	i += 1;
}, 1000);






