// 노드 내장 모듈
// 노드는 운영체제 정보에도 접근할 수 있고, 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있다.

// 2. path 모듈
// 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
// path 모듈이 필요한 이유 중 하나는 os별로 경로 구분자가 다르기 때문이다.
// Windows : \로 구분
// POSIX(macOS, 리눅스) : /로 구분

const path = require('path');

const string = __filename; //현재 파일 경로

console.log('path.sep: ', path.sep); // 경로의 구분자, windows는 \
console.log('path.delimiter: ', path.delimiter); // 환경 변수의 구분자, windows는 ;(세미콜론)
console.log('----------------------------------');
console.log('path.dirname(): ', path.dirname(string)); // 파일이 위치한 경로
console.log('path.extname(): ', path.extname(string)); // 파일의 확장자
console.log('path.basename(): ', path.basename(string)); // 파일의 이름(확장자 포함)
console.log('path.basename(): ', path.basename(string, path.extname(string))); // 두번째 인자로 파일의 확장자를 넣었기 대문에 파일의 이름만 표시
console.log('----------------------------------');
console.log('path.parse(): ', path.parse(string)); // 파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format(): ', path.format({ // path.parse()한 객체를 파일 경로로 합침.
	dir: 'C:\\users\\rmfos',
	name: 'path',
	ext: '.js',
}));
console.log('path.normalize(): ', path.normalize('C:\Users\\\rmfos\\Desktop\\node\\3장\path.js')); // '\'sk '/'를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환해줌
console.log('----------------------------------');
console.log('path.isAbsolute(): ', path.isAbsolute('C:\\')); // 파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줌
console.log('path.isAbsolute(): ', path.isAbsolute('./home'));
console.log('----------------------------------');
console.log('path.relative(): ', path.relative('C:\Users\rmfos\Desktop\node\3장\path.js', 'C:\\')); // 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줌
console.log('path.join(): ', path.join(__dirname, '..', 'users', '.', '/rmfos')); // 여러 인자를 넣으면 하나의 경로로 합침
console.log('path.resolve: ', path.resolve(__dirname, '..', 'users', '.', '/rmfos')); // path.join()과 비슷하지만 차이가 있음.

/*
join과 resolve의 차이
: path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다르다. 
path.resolve는 /를 만나면 절대 경로로 인식해서 앞의 경로를 무시하고,
path.join은 상대경로로 처리한다. 코드로 보면 이해하기 쉽다.

path.join('/a', '/b', 'c') // 결과 : /a/b/c
path.resolve('/a', '/b', 'c') // 결과 : /b/c
*/

/*
어떤 때 \\를 사용하고 어떤 때 \를 사용하나?
콘솔 결과를 보면 어떤 때는 \\를 사용하고, 어떤 때는 그냥 \를 사용하여 windows 경로를 표시한다.
기본적으로 경로는 \ 하나를 사용해서 표시한다. 하지만 자바스크립트 문자열에서는 \가 특수문자이므로 \를 두 개 붙여 경로를 표시해야한다.
예를 들어 \n은 자바스크립트 문자열에서 줄바꿈을 뜻한다. 따라서 주소를 그대로 사용하면 의도하지 않은 오류가 발생한다.
path 모듈은 위와 같은 경우에 발생하는 문제를 알아서 처리해준다. windows에서 path 모듈이 꼭 필요한 이유이기도 하다.
*/

/*
상대경로와 절대경로
절대경로는 루트 폴더나 노드 프로세스가 실행되는 위치가 기준이 된다.
상대경로는 현재 파일이 기준이 된다. 현재 파일과 같은 경로만 점 하나를, 현재 파일보다 한 단꼐 상위 경로면 점 두 개를 사용해 표현한다.
*/




















