// fs 모듈의 다른 메서드들

// 1. 동기 메서드와 비동기 메서드
// setTimeout 같은 타이머와 process.nextTick 외에도, 노드는 대부분의 메서드를 비동기 방식으로 처리한다.
// 하지만 몇몇 메서드는 동기 방식으로도 사용할 수 있다
// 특히 fs 모듈이 그러한 메서드를 많이 가지고 있다.
// 어떤 메서드가 동기 또는 비동기 방식으로 동작하며,
// 언제 어떤 메서드를 사용해야 하는지에 대해 알아보자.


// 순서대로 파일을 출력할 때 Sync 메서드를 사용한다.

const fs = require('fs');

console.log('시작');

// readFile() 대신 readFileSync()라는 메서드를 사용했다.
// 그런데 콜백 함수를 넣는 대신 직접 return 값을 받아온다.
// 그 값은 바로 다음 줄부터 바로 사용할 수 있다.
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());

data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());

console.log('끝');


// 코드는 훨씬 더 이해하기 쉽지만 치명적인 단점이 있다.
// readFileSync 메서드를 사용하면 요청이 수백 개 이상 들어왔을 때 성능에 문제가 생긴다.
// Sync 메서드를 사용할 때는 이전 작업이 완료되어야 다음 작업을 진행할 수 있다.
// 즉, 백그라운드가 작업하는 동안 메인 스레드는 아무것도 못하고 대기하고 있어야 하는 것이다.
// 메인 스레드가 일을 하지 않고 노는 시간이 생기기 때문에 비효율적이다.
// 비동기 메서드는 백그라운드가 작업을 하는 와중에도 다음 작업을 처리할 수 있다.


// 동기 메서드들은 이름 위에 Sync가 붙어 있어 구분하기 쉽다.
// writeFileSync도 있다.
// 하지만 동기 메서드를 사용해야 하는 경우는 극히 드물다.
// 비동기 메서드가 훨씬 더 효율적이다.














