// require 함수 안에 불러올 모듈의 경로를 적어준다.
// js나 json 같은 확장자를 생략 가능
// const {odd, even}은 es2015+ 문법이다.
// var.js의 module.exports에 담겨 있던 객체를 불러와 func.js에서 사용하는 모습이다.
const { odd, even } = require('./var');

// var.js에서 변수를 불러온 뒤, 숫자의 홀짝을 판별하는 함수를 선언
function chekOddOrEven(num) {
	if(num % 2) {
		return odd;
	}
	return even;
}

// module.exports에 함수를 대입
// 객체만 대입해야 하는 것이 아니라 함수나 변수를 대입해도 됨.
module. exports = chekOddOrEven;