// crypto
// 다양한 방식의 암호화를 도와주는 모듈이다.
// 몇 가지 메서드는 익혀두면 실제 서비스에도 적용 할 수 있어 정말 유용하다.

// 2. 양방향 암호화
// 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야 한다.

const crypto = require('crypto');

// crypo.createCipher(알고리즘, 키) : 암호화 알고리즘은 aes-256-cbc를 사용했다.
// 사용 가능한 알고리즘 목록은 crypto.getCiphers()를 하면 볼 수 있다.
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');

// cipher.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣어준다.
// 보통 문자열은 utf8 인코딩을,
//  암호는 base64를 많이 사용한다.
let result = cipher.update('암호화할 문장', 'utf8', 'base64');

// crypto.final(출력 인코딩) : 출력 결과물의 인코딩을 넣어주면 암호화가 완료된다.
result += cipher.final('base64');
console.log('암호화: ', result);

// crypto.createDecipher(알고리즘, 키) : 복호화할 때 사용한다.
// 암호화할 때 사용했던 알고리즘과 키를 그대로 넣어주어야 한다.
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');

// decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣어준다.
// createDecipher의 update()에서는 base64, utf8 순으로 넣으면 된다.
let result2 = decipher.update(result, 'base64', 'utf8');

// decipher.final(출력 인코딩) : 복호화 결과물의 인코딩을 넣어준다.
result2 +=decipher.final('utf8');
console.log('복호화: ', result2);


// 왜 error가 났는지 모르겠다.
// [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.
// 안 졸릴 때 해결해야겠다.










