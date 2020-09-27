// fs 모듈은 파일 시스템에 접근하는 모듈이다.
// 즉, 파일을 생성하거나 삭제하고, 읽거나 쓸 수 있다.
// 폴더도 만들었다 지웠다 할 수 있다.
// 웹 브라우저에서 js를 사용할 때는 파일 다운로드와 파일 시스템 접근이 금지되어 있으므로 노드의 fs 모듈이 낯설 것이다.


// 파일을 만들어보는 코드이다.

const fs = require('fs').promises;


// writeFile() 메서드에 생성될 파일의 경로와 내용을 입력해준다.
// 도중에 에러가 발생하지 않았다면 같은 폴더 내에 writeme.txt가 생성되었을 것이다.
// 직접 열어봐도 되고, readFile을 통해 파일을 읽어볼 수도 있다.
fs.writeFile('./writeme.txt', '글이 입력됩니다.').then(() => {
	return fs.readFile('./writeme.txt');
}).then((data) => {
	console.log(data.toString());
}).catch((err) => {
	console.error(err);
});








