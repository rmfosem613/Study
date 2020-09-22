// crypto
// 다양한 방식의 암호화를 도와주는 모듈이다.
// 몇 가지 메서드는 익혀두면 실제 서비스에도 적용 할 수 있어 정말 유용하다.

// 1. 단방향 암호화
// 복호화할 수 없는 암호화 방식을 의미한다.
// 복호화는 암호화된 문자열을 원래 문자열로 되돌려 놓는 것을 의미한다.
// 즉, 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없다.
// 비밀번호는 보통 단방향 암호화 알고리즘을 사용해 암호화한다.
// 단방향 암호화 알고리즘은 주로 해시 기법을 사용한다.
// 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식이다.


const crypto = require('crypto');

console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64: ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));









