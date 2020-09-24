// global.A를 참조
const A = require ('./05_globalA');

// global 객체에 속성명이 message인 값을 대입
global.message = '안녕하세요';

// globalA 모듈의 함수를 호출
console.log(A());