// 기타 fs 메서드
// fs는 파일 시스템을 조작하는 다양한 메서드를 제공한다.
// 지금까지는 단순히 파일 읽기/쓰기를 했지만,
// 파일을 생성하고 삭제할 수도 있고, 폴더를 생성하고 삭제할 수도 있다.


const fs = require('fs');

// 모두 비동기 메서드이므로 한 메서드의 콜백에서 다른 메서드를 호출한다.

// fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지를 체크한다.
// 두 번째 인자로 상수들을 넣었다.
// F_OK : 파일 존재 여부
// R_OK : 읽기 권한 여부
// W_OK : 쓰기 권한 여부
// 를 체크하는 것이다.
// 파일/폴더나 권한이 없다면 에러가 발생하는데,
// 파일/폴더가 없을 때의 에러 코드는 ENOENT이다.
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
 	if(err) {
 		if(err.code === 'ENOENT') {
 			console.log('폴더 없음');

 			// fs.mkdir(경로, 콜백) : 폴더를 만드는 메서드
 			// 이미 폴더가 있다면 에러가 발생하므로
 			// 먼저 access() 메서드를 호출해서 확인하는 것이 중요하다.
 			fs.mkdir('./folder', (err) => {
 				if(err) {
 					throw err;
 				}
 				console.log('폴더 만들기 성공');

 				//fs.open(경로, 옵션, 콜백) : 파일의 아이디(fs 변수)를 가져오는 메서드
 				// 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져온다.
 				// 가져온 아이디를 사용해 fs.read()나 fs.write()로 읽거나 쓸 수 있다.
 				// 두 번째 인자로 어떤 동작을 할 것인지 설정할 수 있다.
 				// 쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a이다.
 				// w는 파일이 없을 때 새로 만들 수 있다.
 				// r이면 에러가 뜬다.
 				fs.open('./folder/file.js', 'w', (err,fd) => {
 					if(err) {
 						throw err;
 					}
 					console.log('빈 파일 만들기 성공', fd);
 					
 					// fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드이다.
 					// 기존 파일 위치와 새로운 파일 위치를 적어주면 된다.
 					// 반드시 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능을 할 수도 있다.
 					fs.rename('./folder/file.js', './folder/newfile.js', (err) =>{
 						if(err) {
 							throw err;
 						}
 						console.log('이름 바꾸기 성공');
 					});
 				});
 			});
 		} else {
 			throw err;
 		}
 	} else {
 		console.log('이미 폴더 있음');
 	}
 });

