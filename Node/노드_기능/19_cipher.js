// crypto
// 다양한 방식의 암호화를 도와주는 모듈이다.
// 몇 가지 메서드는 익혀두면 실제 서비스에도 적용 할 수 있어 정말 유용하다.

// 2. 양방향 암호화
// 암호화된 문장을 복호화할 수 있다.
// 이때 암호화할 때 사용한 키와 같은 키가 사용된다.

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcedfghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456'; // iv는 16바이트여야 한다. 16개가 아니면 오류가 난다..

// crypto.createCipheriv(알고리즘, 키, iv) : 암호화할 때 사용
// 사용 가능한 알고리즘 목록은 crypto.getCiphers()를 호출하면 볼 수 있다.
const cipher = crypto.createCipheriv(algorithm, key, iv);

// cipher.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다.
// 보통 문자열은 utf8 인코딩을,
// 암호는 base64를 많이 사용한다.
let result = cipher.update('암호화할 문장', 'utf8', 'base64');

// cipher.final(출력 인코딩) : 출력 결과물의 인코딩을 넣으면 암호화가 완료된다.
result += cipher.final('base64');
console.log('암호화: ', result);

// crypto.createDecipheriv(알고리즘, 키, iv) : 복호화할 때 사용
const decipher = crypto.createDecipheriv(algorithm, key, iv);

// decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다.
let result2 = decipher.update(result, 'base64', 'utf8');

// decipher.final(출력 인코딩) : 복호화할 결과물의 인코딩을 넣는다.
result2 += decipher.final('utf8');
console.log('복호화: ', result2);












