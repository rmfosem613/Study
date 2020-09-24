// 기타 fs 메서드
// fs는 파일 시스템을 조작하는 다양한 메서드를 제공한다.
// 지금까지는 단순히 파일 읽기/쓰기를 했지만,
// 파일을 생성하고 삭제할 수도 있고, 폴더를 생성하고 삭제할 수도 있다.

// 폴더 내용을 확인 및 삭제와 관련된 메소드들이다.

const fs = require('fs');

// fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인할 수 있다.
// 배열 안에 내부 파일과 폴더명이 나온다.
fs.readdir('./folder', (err, dir) => {
	if(err) {
		throw err;
	}
	console.log('폴더 내용을 확인', dir);

	// fs.unlink(경로, 콜백) : 파일을 지울 수 있다.
	// 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 확인해야 한다.
	fs.unlink('./folder/newFile.js', (err) =>{
		if(err) {
			throw err;
		}
		console.log('파일 삭제 성공');
		
		// fs.rmdir(경로, 콜백) : 폴더를 지울 수 있다.
		// 폴더 안에 파일이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 한다.
		fs.rmdir('./folder', (err) =>{
			if(err) {
				throw err;
			}
			console.log('폴더 삭제 성공');
		});
	});
});













