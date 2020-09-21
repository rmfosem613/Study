// url : 인터넷 주소를 쉽게 조작하도록 도와주는 모듈이다.

const url = require('url');

const URL = url.URL; // url 모듈 안에 URL 생성자가 있다.

// WHATWG의 url 구분 방법
// 생성자 안에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다.
// WHATWG에만 있는 useranme, password, origin, searchParams 속성이 존재한다.
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL(): ',myURL);

// WHATWG 방식의 url과 기존 노드의 url 모두 사용 가능
// 분해되었던 url 객체를 다시 원래 상태로 조립한다.
console.log('url.format(): ', url.format(myURL));

console.log('---------------------------');

const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

// url.parse(주소) : 주소를 분해한다. 
// WHATWG 방식과 비교하면 username과 password 대신 quth 속성이 있고, searchParams 대신 query가 있다.
console.log('url.parse(): ', parsedUrl);
console.log('url.format(): ', url.format(parsedUrl));









