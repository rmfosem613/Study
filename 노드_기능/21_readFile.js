// fs 모듈은 파일 시스템에 접근하는 모듈이다.
// 즉, 파일을 생성하거나 삭제하고, 읽거나 쓸 수 있다.
// 폴더도 만들었다 지웠다 할 수 있다.
// 웹 브라우저에서 js를 사용할 때는 파일 다운로드와 파일 시스템 접근이 금지되어 있으므로 노드의 fs 모듈이 낯설 것이다.

// readme.txt 파일을 만든다.
// '저를 읽어주세요.'라는 문장을 포함하고 있다.


const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
	if(err) {
		throw err;
	}
	console.log(data);
	console.log(data.toString());
});








