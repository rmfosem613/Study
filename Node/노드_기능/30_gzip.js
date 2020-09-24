// 버퍼와 스트림 이해하기!
// 파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.

// 1. 버퍼를 이용하는 방식
// 2. 스트림을 이용하는 방식

// 파일을 읽은 후 gzip 방식으로 압축하는 코드이다.

// zlib : 노드에서 제공하는 파일을 압축하는 모듈 
const zlib = require('zlib');
const fs = require('fs');

// zlib의 createGzip()이라는 메서드가 스트림을 지원하여
// readStream과 writeStream 중간에서 파이필을 할 수 있다.
const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();

// 버퍼 데이터가 전달되다가 gzip 압축을 거친 후 파일로 쓰여진다.
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);

