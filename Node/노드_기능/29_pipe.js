// 버퍼와 스트림 이해하기!
// 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

// 1. 버퍼를 이용하는 방식
// 2. 스트림을 이용하는 방식

// createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수도 있다.
// 파일 복사와 비슷하다.
// 스트림끼리 연결하는 것을 '파이핑한다'고 표현한다.
// 액체가 흐르는 관(파이프. pipe)처럼 데이터가 흐른다고 해서 지어진 이름이다.

// 파이프 메서드를 사용해 파일을 읽고, 써보자
// readme4.txt 파일을 만들고, '저를 writeme3.txt로 보내주세요.'라는 문장을 포함한다.

const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');

// readme4.txt와 똑같은 내용의 writeme3.txt가 생성된다.
readStream.pipe(writeStream);

// 미리 읽기 스트림과 쓰기 스트림을 만들어둔 후 두 개의 스트림 사이를 pipe 메서드로 연결해준것이다.
// 따로 on('data')나 writeStream.write()를 하지 않아도 알아서 전달되므로 편리하다.



