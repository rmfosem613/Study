// 버퍼와 스트림 이해하기!
// 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

// 1. 버퍼를 이용하는 방식
// 2. 스트림을 이용하는 방식

// readFile() 방식의 버퍼가 편리하기는 하지만 문제점도 있다.
// 만약 용량이 100MB인 파일이 있으면 읽을 때 메모리에 100MB 버퍼를 만들어야 한다.
// 이 작업을 동시에 열 개만 해도 1GB에 달하는 메모리가 사용된다.
// 특히 서버 같이 몇 명이 이용할지 모르는 환경에서는 메모리 문제가 발생할 수 있다.

// 또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로 
// 파일 읽기, 압출, 파일 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다.

// 그래서 버퍼의 크기를 작게 만들어서 여러 번에 나눠서 보내는 방식이 등장했다.
// 예를 들면 버퍼 1MB를 만든 후 100MB 파일을 백 번에 걸쳐 보내는 것이다.
// 메모리 1MB로 100MB  파일을 전송할 수 있다.
// 이를 편리하게 만드는 것이 스트림이다.


// 파일을 읽는 스트림 메서드로는 createReadStream이 있다.

// readme3.txt 파일을 만들어주고,
// '저는 조금씩 조금씩 나눠서 전달됩니다. 나줘진 조각을 chunk라고 부릅니다.'라는 문장을 추가한다.

const fs = require('fs');

// createReadStream()으로 읽기 스트림을 만들어 준다.
// 첫 번째 인자로 읽을 파일 경로를 넣는다.
// 두 번째 인자로 옵션 객체인데, highWaterMark라는 옵션이 버퍼의 크기(바이트 단위)를 정할 수 있는 옵션이다.
// 기본값은 64KB이지만 여러 번 나눠서 보내는 모습을 보여주기 위해 16B로 낮췄다.
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});

// 미리 데이터를 만들었다.
const data = [];

readStream.on('data', (chunk) => {
	// chunk들을 하나씩 push한 뒤
	data.push(chunk);
	console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () =>{
	// 마지막에 Buffer.concat()으로 합쳐서 다시 문자열로 만든다.
	console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
	console.log('error: ', err);
});

// readStream은 이벤트 리스너를 붙여서 사용한다.
// 보통 data, end, error 이벤트를 사용한다.
// readStream.on('data') 같이 이벤트 리스너를 붙이면 된다.
// 파일을 읽는 도중 에러가 발생하면 error 이벤트가 호출되고, 파일 읽기가 시작되면 data 이벤트가 발생한다.
// 16B씩 읽도록 설정했으므로 파일의 크기가 16B보다 크다면 여러 번 발생할 수도 있다.
// 파일을 다 읽으면 end 이벤트가 발생한다.

