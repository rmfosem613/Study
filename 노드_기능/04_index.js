// var.js와 func.js를 모두 참조한다.
// 모듈 하나가 여러 개의 모듈에 사용될 수 있다.
const { odd, even } = require('./var');

// 모듈로부터 값을 불러올 때 변수 이름을 다르게 지정할 수도 있다.
// func.js의 checkOddOrEven이 checkNumber라는 이름으로 사용되고 있다.
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
	if(str.length % 2) {
		return odd;
	}
	return even;
}

// func.js의 모듈인 checkOddOrEven함수에 11을 대입했을 때의 값이 반환
console.log(checkNumber(11));

// 함수에 'Hello'라는 문자열을 대입했을 대의 값이 반환
console.log(checkStringOddOrEven('Hello'));