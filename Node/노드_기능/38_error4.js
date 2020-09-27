// 프로미스의 에러는 catch하지 않아도 알아서 처리된다.

const fs = require('fs').promises;

setInterval(() => {
	fs.unlink('./abcedfg.js');
}, 1000);