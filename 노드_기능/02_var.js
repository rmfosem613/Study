// 노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 js와는 다르다.
// 모듈 : 특정한 기능을 하는 함수나 변수들의 집합
// 모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용할 수 있다. js에서 코드를 재사용하기 위해 함수로 만드는 것과 비슷하다.
// 보통 파일 하나가 모듈 하나가 된다. 파일별로 코드를 모듈화할 수 있어 관리하기 편리하다.

// 변수 두 개를 선언
const odd = '홀수입니다.';
const even = '짝수입니다.';

// module.exports에 변수들을 담은 객체를 대입.
// 이제 이 파일은 모듈로서 기능한다.
// 변수들을 모아둔 모듈
// 다른 파일에서 이 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있다.


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