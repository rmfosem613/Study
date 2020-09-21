const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
	outside: {
		inside: {
			key:'value',
			name:'학생',
			class:1,
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
console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요.');

console.dir(obj, { colors:false, depth: 2});
console.dir(obj, { colors:true, depth: 3});

console.time('시간 측정');
for (let i=0; i < 100000; i++){
	continue;
}
console.timeEnd('시간 측정');

function b() {
	console.trace('에러 위치 추적');
}
function a() {
	b();
}
a();

console.timeEnd('전체 시간');


