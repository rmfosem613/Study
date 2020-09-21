// process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다.
// process.env, process.nextTick, process.exit() 중요!

// 1. process.env
// 출력되는 정보들은 시스템의 환경 변수
// 서비스의 중요한 키를 저장하는 공간으로도 사용
// 서버나 데이터베이스의 비밀번호와 각종 API 키를 코드에 직접 입력하는 것은 위험하다.
// 혹여 서비스가 해킹당해 코드가 유출되었을 때 비밀번호가 코드에 남아 있어 추가 피해가 발생할 수 있다.
// 중요한 비밀번호는 다음과 같이 process.env의 속성으로 대체
// const.secretId = process.env.SECRET_ID;
// const.secretCode = process.env.SECRET_CODE;
// 한번에 모든 운영체제에 동일하게 넣는 방법 : dotenv


// 2. process.nextTick(콜백)
// 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 만든다.
// process.nextTick은 setImmediate나 setTimeout보다 먼저 실행된다.

setImmediate(() => {
	console.log('immediate');
});
process.nextTick(() => { // setImmediate, setTimeout보다 우선시됨.
	console.log('nextTick');
});
setTimeout(() => {
	console.log('timeout');
}, 0);

// promise도 nextTick처럼 다른 콜백들보다 우선시됨.
Promise.resolve().then(() => console.log('promise'));
