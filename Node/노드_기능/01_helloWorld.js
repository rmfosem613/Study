function helloWorld(){
	console.log('helloWorld');
	helloNode();
}
function helloNode(){
	console.log('helloNode');
}
helloWorld();

// Note!!
// 파일/폴더 이름 제한
// 파일이나 폴더의 이름에 쓸 수 없는 문자들이 있다.
// /, \, |, <, >, :, ", ?, * 등이 있다.