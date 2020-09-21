/*setTimeout(콜백함수, 밀리초) : 주어진 밀리초 이후에 콜백 함수를 실행한다.*/

const timeout = setTimeout(()=> {
	console.log('1.5초 후 실행');
}, 1500);

/*setInterval(콜백함수, 밀리초) : 주어진 밀리토마다 콜백 함수를 반복 실행한다.*/
const interval = setInterval(()=> {
	console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
	console.log('실행되지 않습니다.');
}, 3000);

/*clearTimeout(아이디), clearInterval(아이디), clearImmediate(아이디) 
 : 아이디를 사용해 타이머를 취소함.*/
setTimeout(()=> {
	clearTimeout(timeout2);  // 2.5초후에 아이디를 가진 타이머를 삭제함
	clearInterval(interval);
}, 2500);

/*setImmediate(콜백함수) : 콜백 함수를 즉시 실행한다.*/
const immediate = setImmediate(()=> {
	console.log('즉시 실행');
});

const immediate2 = setImmediate(()=> {
	console.log('실행되지 않습니다.');
});  // clearImmediate를 이용해 삭제하였기 때문에 실행되지 않음.

clearImmediate(immediate2);



