// REST API와 라우팅

// REST API는 REpresentational State Transfer의 약어이다.
// 네트워크 구조의 한 형식이다.
// 서버의 자원을 정의하고, 자원에 대한 주소를 지정하는 방법을 가리킨다.
// 주소는 의미를 명확히 전달하기 위해 명사로 구성된다.
// '/user'이면 사용자 정보에 관련된 자원을 요청하는 것이고,
// '/post'라면 게시글에 관련된 자원을 요청하는 것이라고 추측할 수 있다.

// REST API 주소 이외에도 HTTP 요청 메서드라는 것을 사용한다.
// 폼 데이터를 전송할 때 사용되는 GET 또는 POST가 요청 메서드이다.
// 거기에 PUT, PATCH, DELETE까지 총 다섯 개가 메서드로 많이 사용된다.

// GET : 서버 자원을 가져오고자 할 때 사용한다. 요청의 본문(body)에 데이터를 넣지 않는다. 데이터를 서버로 보내야 한다면 querystring을 사용한다.
// POST : 서버에 자원을 새로 등록하고자 할 때 사용한다. 요청의 본문에 새로 등록할 데이터를 넣어준다.
// PUT : 서버의 자원을 치환하고자 할 때 사용한다. 요청의 본문에 치환할 데이터를 보낸다.
// PATCH : 서버 자원의 일부만 수정하고자 할 때 사용한다. 요청의 본문에 일부 수정할 데이터를 넣어 보낸다.
// DELETE : 서버의 자원을 삭제하고자 할 때 사용한다.

// 주소 하나가 요청 메서드를 여러 개 가질 수 있다.
// GET 메서드의 /user 주소로 요청을 보내면 사용자 정보를 가져오는 요청이라는 것을 알 수 있고,
// POST 메서드의 /user 주소로 요청을 보내면 새로운 사용자를 등록하려 한다는 것을 알 수 있다.
// 이렇게 주소와 메서드만 보고 요청의 내용을 명확하게 알아볼 수 있다는 것이 장점이다.
// 또한, GET 메서드 같은 경우에는 브라우저에서 캐싱할 수도 있어서 같은 주소의 GET 요청을 할 때 서버에서 가져오는 것이 아니라 캐시에서 가져올 수도 있다.
// 이렇게 캐싱이 되면 성능이 좋아진다.

// 그리고 HTTP 프로토콜을 사용하면 클라이언트가 누구든 상관없이 서버와 소통할 수 있다.
// iOS, 안드로이드, 웹이 모두 같은 주소로 요청을 보낼 수 있다.
// 즉, 서버와 클라이언트가 분리되어 있다는 뜻이다.
// 이렇게 서버와 클라이언트를 분리하면 추후에 서버를 확장할 때 클라이언트에 구애되지 않아 좋다.

// 이제 REST API를 사용한 주소 체계로 RESTful한 웹 서버를 만들어보겠다.
// REST API를 따르는 서버를 RESTful하다고 표현한다.
// 코드를 작성하기 전에 대략적인 주소를 먼저 설계하는 것이 좋다.



async function getUser() { // 로딩 시 사용자 가져오는 함수
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const list = document.getElementById('list');
    list.innerHTML = '';
    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => { // 수정 버튼 클릭
        const name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.put('/user/' + key, { name });
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => { // 삭제 버튼 클릭
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  try {
    await axios.post('/user', { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
});