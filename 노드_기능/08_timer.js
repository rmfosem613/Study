// 노드 내장 객체 알아보기
// 3. timer

// setTimeout(콜백함수, 밀리초) : 주어진 밀리초 이후에 콜백 함수를 실행한다.
const timeout = setTimeout(()=> {
	console.log('1.5초 후 실행');
}, 1500);

// setInterval(콜백함수, 밀리초) : 주어진 밀리초마다 콜백 함수를 반복 실행한다.
const interval = setInterval(()=> {
	console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
	console.log('실행되지 않습니다.');
}, 3000);


// 아이디를 사용해 타이머를 취소함.
// clearTimeout(아이디)
// clearInterval(아이디)
// clearImmediate(아이디)
setTimeout(()=> {
	clearTimeout(timeout2);  // 2.5초후에 아이디를 가진 타이머를 삭제함
	clearInterval(interval);
}, 2500);

// setImmediate(콜백함수) : 콜백 함수를 즉시 실행한다.
const immediate = setImmediate(()=> {
	console.log('즉시 실행');
});

const immediate2 = setImmediate(()=> {
	console.log('실행되지 않습니다.');

// immediate2는 즉시 취소했기 때문에 실행되지 않음.
clearImmediate(immediate2);


// 실행 순서
// 0초 => immediate(즉시실행), immediate2(즉시취소)
// 1초 => interval(1초마다 실행)
// 1.5초 => timeout(1.5초마다 실행)
// 2초 => interval(1초마다 실행)
// 2.5cj => timeout(취소), interval(취소)



// Note!!
// setImmediate(콜백)과 setTimeout(콜백, 0)에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행된다.
// 특수한 경우에 setImmediate는 setTimeout(콜백, 0)보다 먼저 실행된다.
// 파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우이다.
// 하지만 setImmediate가 항상 setTimeout(콜백, 0)보다 먼저 호출되는 것은 아니다.
// 헷갈리지 않도록 setTimeout(콜백, 0)은 사용하지 않는 것을 권장한다.