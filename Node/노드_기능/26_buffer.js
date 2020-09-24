// readFile()과 readFileSync()에서 받아온 data를
// data.toString()으로 변환하는 이유를 알아볼 차례이다.
// toString 메서드를 사용하는 이유는 data가 버퍼이기 때문이다.

// 버퍼와 스트림 이해하기!
// 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

// 1. 버퍼를 이용하는 방식
// 2. 스트림을 이용하는 방식

// 버퍼링과 스트리밍
// 영상을 로딩 중일 때는 버퍼링한다고 하고, 영상을 실시간으로 송출할 때는 스트리밍한다고 한다.
// 버퍼링은 영상을 재생할 수 있을 때까지 데이터를 모으는 동작이고,
// 스트리밍은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작이다.
// 스트리밍하는 과정에서 버퍼링을 할 수도 있다.
// 전송이 너무 느리면 화면을 내보내기까지 최소한의 데이터를 모아야 하고,
// 영상 데이터가 재생 속도보다 빨리 전송되어도 미리 전송받은 데이터를 저장할 공간이 필요하기 때문이다.

// 노드의 버퍼와 스트림도 비슷한 개념이다.
// 앞에서 readFile 메서드를 사용할 때 읽었던 파일이 버퍼 형식으로 출력되었다.
// 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며,
// 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 해준다.
// 메모리에 저장된 데이터가 바로 버퍼이다.


// Buffer : 버퍼를 직접 다룰 수 있는 클래스

const buffer = Buffer.from('저를 버퍼로 바꿔보세요');

// from(문자열) : 문자열을 버퍼로 바꿀 수 있다.
console.log('from(): ',buffer);

// length 속성은 버퍼의 크기를 알려준다.
console.log('length: ', buffer.length);
// toString(버퍼) : 버퍼를 다시 문자열로 바꿀 수 있다.
// 이때 base64나 hex를 인자로 넣으면 해당 인코딩으로도 변환할 수 있다.
console.log('toString(): ', buffer.toString());


const array = [Buffer.from('뛰엄 '),Buffer.from('뛰엄 '), Buffer.from('띄어쓰기')];

// concat(배열) : 배열 안에 든 버퍼들을 하나로 합친다.
const buffer2 = Buffer.concat(array);
console.log('concat(): ', buffer2.toString());

// alloc(바이트) : 빈 버퍼를 생성한다.
// 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성된다.
const buffer3 = Buffer.alloc(5);
console.log('alloc(): ', buffer3)
