// 기타 fs 메서드
// fs는 파일 시스템을 조작하는 다양한 메서드를 제공한다.
// 지금까지는 단순히 파일 읽기/쓰기를 했지만,
// 파일을 생성하고 삭제할 수도 있고, 폴더를 생성하고 삭제할 수도 있다.

// 폴더 내용을 확인 및 삭제와 관련된 메소드들이다.

const fs = require('fs').promises;

// fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인할 수 있다.
// 배열 안에 내부 파일과 폴더명이 나온다.
fs.readdir('./folder').then((dir) => {
	console.log('폴더 내용을 확인', dir);
	return fs.unlink('./folder/newFile.js');
}).then(() => {
	console.log('파일 삭제 성공');
	return fs.rmdir('./folder');
}).then(() => {
	console.log('폴더 삭제 성공');
}).catch((err) => {
	console.error(err);
});













