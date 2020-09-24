// crypto
// 다양한 방식의 암호화를 도와주는 모듈이다.
// 몇 가지 메서드는 익혀두면 실제 서비스에도 적용 할 수 있어 정말 유용하다.

// 3. util
// util이라는 이름처럼 각종 편의 기능을 모아둔 모듈이다.
// 계속해서 API가 추가되고 있고, 가끔 deprecated되어 사라지는 경우도 있다.

// Note!!
// deprecated란?
// '중요도가 떨어져 더 이상 사용되지 않고 앞으로는 사라지게 될' 것이라는 뜻이다,
// 새로운 기능이 나와서 기존 기능보다 더 좋을 때, 기존 기능을 deprecated 처리하곤 한다.
// 이전 사용자를 위해 기능을 제거하지는 않지만 곧 없앨 예정이므로 더 이상 사용하지 말라는 의미이다.


const util = require('util');
const crypto = require('crypto');

// util.deprecate : 함수가 deprecated 처리되었음을 알려준다.
// 첫 번째 인자로 넣은 함수를 사용했을 때 경고 메시지가 출력된다.
// 두 번째 인자로 경고 메시지 내용을 넣으면 된다.
// 함수가 조만간 사라지거나 변경될 때 알려줄 수 있어 유용하다.
const dontUseMe = util.deprecate((x,y) => {
	console.log(x+y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');
dontUseMe(1,2);

// util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿔준다.
// 바꿀 함수를 인자로 제공하면 된다.
// 이렇게 바꾸어두면 async/await 패턴까지 사용할 수 있어 좋다.
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64).then((buf) => {
	console.log(buf.toString('base64'));
}).catch((error) => {
	console.log(error);
});












