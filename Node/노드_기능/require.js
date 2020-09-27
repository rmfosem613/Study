// require
// 모듈을 불러오는 함수이다.
// 함수는 객체로서 몇 가지 속성을 갖고 있다.

console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('./02_var.js')

// require.cache : 한 번 require한 파일은 require.cache에 저장되므로 다음 법에 require할 때는 불러오지 않고 사용가능하다.
console.log('requqire.cache입니다.');
console.log(require.cache);

// require.main : 노드 실행 시 첫 모듈을 가리킨다.
// 현재 node require로 실행했으므로 require.js가 require.main이 된다.
console.log('requqire.main입니다.');
console.log(require.main === module); // true, 02_var.js에서 해보면 false가 뜸.
console.log(require.main.filename); // 첫 모듈의 이름을 알아볼 때
