const {URL} = require('url');

// URL 생성자를 통해 myURL이라는 주소 객체를 만들었다.
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

// myURL 안에는 searchParams 객체가 있다.
// 이 객체는 search 부분을 조작하는 다양한 메서드를 지원한다.
console.log('searchParams: ', myURL.searchParams);

// getAll(키) : 키에 해당하는 모든 값들을 가져온다.
// category 키에는 두 가지 값. 즉 nodejs와 javascript의 값이 들어 있다.
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('category'));
// get(키) : 키에 해당하는 첫 번째 값만 가져온다.
console.log('searchParams.get(): ', myURL.searchParams.get('limit'));
// has(키) : 해당 키가 있는지 없는지 검사한다.
console.log('searchParams.has(): ', myURL.searchParams.has('page'));

// searchParams의 모든 키를 반복기를 객체로 가져온다.
console.log('searchParams.keys(): ', myURL.searchParams.keys());
// searchParams의 모든 값를 반복기를 객체로 가져온다.
console.log('searchParams.values(): ', myURL.searchParams.values());

// append(키, 값) : 해당 키를 추가한다. 같은 키의 값이 있다면 유지하고 하나 더 추가한다.
myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

// set(키, 값) : append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가한다.
myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

// delete(키) : 해당 키를 제거한다.
myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

// toSting() : 조작한 searchParams 객체를 다시 문자열로 만든다.
console.log('searchParams.toString(): ', myURL.searchParams.toString());
// 이 문자열을 search에 대입하면 주소 객체에 반영된다.
myURL.search = myURL.searchParams.toString();






