// REST와 라우팅

// REST는 REpresentational State Transfer의 줄임말이다.
// 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다.

// 단순히 주소의 이름만으로 무슨 동작을 행하라는 것인지 알기 어려우므로
// REST에서는 주소외에도 HTTP 요청 메서드라는 것을 사용한다.
// 폼 데이터를 전송할 때 사용해 봤던 GET과 POST가 바로 요청 메서드이다.
// 또한 PUT, PATCH, DELETE, POTIONS 등의 메서드도 자주 사용된다.

// GET : 서버 자원을 가져오고자 할 때 사용. 요청의 본문에 데이터를 넣지 않는다. 데이터를 서버로 보내야 한다면 querystring을 사용한다.
// POST : 서버에 자원을 새로 등록하고자 할 때 사용. 요청의 본문에 새로 등록할 데이터를 넣어 보낸다.
// PUT : 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용. 요청의 본문에 치환할 데이터를 넣어 보낸다.
// PATCH : 서버 자원의 일부만 수정하고자 할 때 사용. 요청의 본문에 일부 수정할 데이터를 넣어 보낸다.
// DELETE : 서버의 자원을 삭제하고자 할 때 사용. 요청의 본문에 데이터를 넣지 않는다.
// OPTIONS : 요청을 하기 전에 통신 옵션을 설명하기 위해 사용.

// REST를 사용한 주소 체계로 RESTful한 웹 서버를 만들어보겠다.
// REST를 따르는 서버를 'RESTful하다'고 표현한다.

const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./04_restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile('./04_about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201);
          res.end('등록 성공');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end(err);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });

// restServer.js가 핵심이다.
// 코드를 보면 req.method로 HTTP 요청 메서드를 구분하고 있다.
// 메서드가 GET이면 다시 req.url로 요청 주소를 구분한다.
// 주소가 /일 때는 restFront.html을 제공하고,
// 주소가 /about이면 about.html 파일을 제공한다.
// 이외의 경우에는 주소에 적힌 파일을 제공한다.
// 만약 존재하지 않는 파일을 요청했거나 GET 메서드 요청이 아닌 경우라면 404 NOT FOUND 에러가 응답으로 전송된다.
// 응답 과정 중에 예기치 못한 에러가 발생한 경우에는 500 에러가 응답으로 전송된다.
// (실무에서 500을 전송하는 경우는 드물다.)

// Note!!
// res.end 앞에 return은 왜 붙이는가?
// 노드도 일반적인 js 문법을 따르므로 return을 붙이지 않는 한 함수가 종료되지 않는다.
// 따라서 다음에 코드가 이어지는 경우에는 return을 써서 명시적으로 함수를 종료했다.
// return을 붙이지 않아서 res.end 같은 메서드가 여러 번 실행된다면 Error가 발생한다.