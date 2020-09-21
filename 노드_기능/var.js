const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports = { // 한 번에 대입
	odd,
	even,
};

/*
exports.odd = '홀수입니다.'; // 각각의 변수를 exports 객체에 하나씩 넣음
exports.even = '짝수입니다.';
*/

// module.exports와 exports가 같은 객체를 참조하기 때문에 동일하게 동작.
// console.log(module.exports === exports); // true