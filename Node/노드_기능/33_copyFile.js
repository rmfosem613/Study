// 노드 8.5 버전에서는 파일 복사 방법도 새로 추가되었다.
// 더이상 createReadStream과 createWriteStream을 pipe하지 않아도 된다.

const fs = require('fs'). promises;

// 첫번째 인자로 복사할 파일을,
// 두번째 인자로 복사된 경로를,
// 세번째 인자로 복사 후 실행될 콜백 함수를 넣는다.
fs.copyFile('readme4.txt', 'write4.txt').then(() => {
	console.log('복사 완료');
}).catch((error) => {
	console.error(error);
});


// Note!!
// fs 프로미스
// 노드 10 버전에 fs 모듈을 프로미스 형식으로 사용하는 방법이 추가되었다.
// 다음과 같이 fs 모듈로부터 promises 객체를 불러와 사용한다.

// const fsPromises = require('fs').promises;