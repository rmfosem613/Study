// querystring 모듈
// WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때 search 부분을 사용하기 쉽게 객체로 만드는 모듈이다.

// 모듈 두 개를 함께 사용
// 실제 프로젝트에서도 이렇게 모듈 여러 개를 파일 하나에 불러올 수 있다.
const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
// querystring.parse(쿼리) : url의 query 부분을 자바스크립트 객체로 분해
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse(): ', query);

// querystring.stringify(객체) : 분해된 query 객체를 문자열로 다시 조립
console.log('querystring.stringify(): ', querystring.stringify(query));










