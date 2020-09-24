// fs 모듈의 다른 메서드들

// 1. 동기 메서드와 비동기 메서드
// setTimeout 같은 타이머와 process.nextTick 외에도, 노드는 대부분의 메서드를 비동기 방식으로 처리한다.
// 하지만 몇몇 메서드는 동기 방식으로도 사용할 수 있다
// 특히 fs 모듈이 그러한 메서드를 많이 가지고 있다.
// 어떤 메서드가 동기 또는 비동기 방식으로 동작하며,
// 언제 어떤 메서드를 사용해야 하는지에 대해 알아보자.


// 비동기 방식으로 하되 순서를 유지하고 싶다면 아래와 같이 코딩한다.

const fs = require('fs');

console.log('시작');

// 이전 readFile()의 콜백에 다음 readFile()을 넣어준다.
// 콜백 지옥이 펼쳐지지만 적어도 순서가 어긋나는 일은 없다.
// 콜백 지옥은 Promise나 async/await로 어느 정도 해결할 수 있다.
fs.readFile('./readme2.txt', (err, data) => {
	if(err) {
		throw err;
	}
	console.log('1번', data.toString());
	fs.readFile('./readme2.txt', (err, data) => {
		if(err) {
			throw err;
		}
		console.log('2번', data.toString());
		fs.readFile('./readme2.txt', (err, data) => {
			if(err) {
				throw err;
			}
			console.log('3번', data.toString());
		});
	});
});
console.log('끝');


















