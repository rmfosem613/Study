// 노드 내장 객체 알아보기
// 2. console

// console : 디버깅을 위해 사용
// 개발 중 변수에 값이 제대로 들어와 있는 확인, 에러 표시, 코드 실행 시간 확인 등.

const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
	outside: {
		depth : 1,
		inside: {
			key:'value',
			name:'학생',
			class:1,
			depth : 2,
		},
		school: '도평초',
		num: 15,
		inside2: {
			message: 'hi',
			depth: 2,
			inside3: {
				depth: 3,
			}
		}
	},
};


// console.time(레이블) : console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정.
console.time('전체 시간');

// console.log(내용, 내용, ...)처럼 여러 내용을 동시에 표시할 수도 있다.
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');

// console.error(에러 내용) : 에러를 콘솔에 표시
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요.');

// console.dir(객체, 옵션) : 객체를 콘솔에 표시할 때 사용
// 첫 번째 인자 = 표시할 객체,
// 두 번째 인자 = 옵션 {colors:boolean, depth:기본 2}
console.dir(obj, { colors:false, depth: 2});
console.dir(obj, { colors:true, depth: 3});

console.time('시간 측정');
for (let i=0; i < 100000; i++){
	continue;
}


// '시간 측정'이라는 동일한 레이블을 가진 함수간의 시간 측정
console.timeEnd('시간 측정');

function b() {
	// console.trace(레이블) : 에러가 어디서 발생했는지 추적.
	// 에러 발생 시 에러 위치를 알려주므로 자주 사용하지는 않지만, 위치가 나오지 않는다면 사용할만하다.
	console.trace('에러 위치 추적');
}
function a() {
	b();
}
a();

// '전체 시간'이라는 동일한 레이블을 가진 함수간의 시간 측정
console.timeEnd('전체 시간');


