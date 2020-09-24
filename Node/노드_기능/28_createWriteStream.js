// 버퍼와 스트림 이해하기!
// 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

// 1. 버퍼를 이용하는 방식
// 2. 스트림을 이용하는 방식

// 스트림을 이용해 파일을 만드는 코드이다.

const fs = require('fs');

// createWriteStream()으로 쓰기 스트림을 만들어준다.
// 첫 번째 인자로는 출력 파일명을 입력한다.
// 두 번째 인자는 옵션인데, 여기서는 사용하지 않는다.
const writeStream = fs.createWriteStream('./writeme2.txt');

// finish 이벤트 리스너도 붙여주었다.
// 파일 쓰기가 종료되면 콜백 함수가 호출된다.
writeStream.on('finish', () =>{
	console.log('파일 쓰기 완료');
});

// writeStream에서 제공하는 write() 메서드로 데이터를 넣는다.
writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');

// 데이터를 다 썻다면 end() 메서드로 종료를 알려준다.
// 이 때 finish 이벤트가 발생한다.
writeStream.end();
