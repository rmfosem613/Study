// 이벤트 이해하기
// 스트림을 배울 때 on('data', 콜백) 또는 on('end', 콜백)을 사용했었다.
// 바로 data라는 이벤트와 end라는 이벤트가 발생하 ㄹ대 콜백 함수를 호출하도록 이벤츠를 등록한 것이다.
// createReadStream()같은 경우에는 내부적으로 알아서 data와 end 이벤트를 호출하지만,
// 우리가 직접 이벤트를 만들 수도 잇다.

// 이벤트를 만들고, 호출하고, 삭제하는 코드이다.

const EventEmitter = require('events');

// myEvent 객체는 이벤트 관리를 위한 메서드를 가지고 있다.
const myEvent = new EventEmitter();

// addListener(이벤트명, 콜백) : 이벤트 이름과 이벤트 발생 시의 콜백을 연결해준다.
// 이렇게 연결하는 동작을 이벤트 리스너라고 부른다.
myEvent.addListener('event1', () => {
	console.log('이벤트 1');
});

// on(이벤트명, 콜백) : addListener과 기능이 같다.
myEvent.on('event2', () => {
	console.log('이벤트 2');
});

// 하나의 이벤트에 여러개를 달아줄 수도 있다.
myEvent.on('event2', () => {
	console.log('이벤트 2 추가');
});

// emit(이벤트명) : 이벤트를 호출하는 메서드이다.
// 이벤트 이름을 인자로 넣어주면 미리 들록해뒀던 이벤트 콜백이 실행된다.
myEvent.emit('event1');
myEvent.emit('event2');

// once(이벤트명, 콜백) : 한 번만 실행되는 이벤트이다.
// myEvent.emit('even3'을 두 번 연속 호출했지만 콜백이 한 번만 실행된다.)
myEvent.once('event3', () => {
	console.log('이벤트 3');
});

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
	console.log('이벤트 4');
});

// removeAllListeners(이벤트명) : 이벤트에 연결된 모든 이벤트 리스너를 제거한다.
// event4가 호출되기 전에 리스너를 제거했으므로 event4의 콜백은 호출되지 않는다.
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
	console.log('이벤트 5');
};

myEvent.on('event5', listener);

// removeListener(이벤트명, 리스너) : 이벤트에 연결된 리스너를 하나씩 제거한다.
// event5의 콜백도 호출되지 않는다. 
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

// listenerCount(이벤트명) : 현재 리스너가 몇 개 연결되어 있는지 확인한다.
console.log(myEvent.listenerCount('event2'));

// off(이벤트명, 콜백) : 노드 10 버저넹서 추가된 메서드로, removeListener와 기능이 같다.


// 이제는 스트림에서 보았던 on('data')와 on('end')도 어느 정도 감이 올 것이다.
// 겉으로 이 이벤트를 호출하는 코드는 없지만, 내부적으로는 chunk를 전달할 때만다 data 이벤트를 emit하고 있다.
// 완료되었을 경우에는 end 이벤트를 emit한 것이다.