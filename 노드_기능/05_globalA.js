// 노드 내장 객체 알아보기
// 1. global

// 전역 객체이므로 모든 파일에서 접근할 수 있다.
// global 생략 가능
// ex) global.require, global.console

// globalA 모듈의 함수는 global.message 값을 반환한다.
module.exports = () => global.message;

// global.message 값을 globalA에서도 접근할 수 있음

// global 객체의 속성에 값을 대입하여 파일 간에 데이터를 공유할 수 있지만, 남요해서는 안된다.
// 프로그램의 규모가 커질수록 어떤 파일에서 global 객체에 값을 대입했는지 찾기 힘들어 유지보수에 어려움을 겪게 되기 때문이다.
// 다른 파일의 값을 사용하고 싶다면 모듈 형식으로 만들어서 명시적으로 값을 불러와 사용하는 것이 좋다.