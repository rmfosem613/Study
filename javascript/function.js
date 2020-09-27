'use strict'
// Function
// - fundamental building block in the program
// - subprogram can be used multiple times 재사용 가능
// - performs a task or calculates a value 한 가지 과제 혹은 값 계산에 사용


// 1. Function declaration 함수 선언
// function name(param1, parAm2) {body ... return;}
// one function === one thing 하나의 함수는 한 가지의 일만 하도록 만들어야함
// naming : doSomething, command, verb 명사보다는 동사, 설명 형태로 지정하는 것을 추천
// e.g. createCardAndPoing -> createCard, createPoint 함수를 나눌수 있다면 나누어 깨끗하게 만들어라
// function is object in JS 함수를 변수에 할당할 수 있음

function printHello() {
    console.log('Hello');
}
printHello();

function log(message) {
    console.log(message);
}
log('Hello!');
log(1234);

// 2. Parameters
// premitive parameters : passed by value
// object parameters : passed by reference
// object는 메모리에 reference가 저장됨. 그래서 reference가 전달이 됨.
// 전달된 reference에 name을 coder로 변경하는 코드
// 함수 안에서 obj의 값을 변경하게되면 변경된 값이 적용됨.

function changeName(obj) {
    obj.name = 'coder';
}
const ellie = { name: 'ellie'};
changeName(ellie);
console.log(ellie);


// 3. Default parameters (added in ES6)
function showMessage(message, from = 'unknown') {
    console.log(`${message} by ${from}`);
}
showMessage('Hi!');


// 4. Rest parameters (added in ES6)
function printAll(...args) {
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
    }

    for (const arg of args) {
        console.log(arg);
    }
    args.forEach((arg) => console.log(arg));
}
printAll('dream', 'coding', 'ellie');

// 5. Local scope
let globalMessage = 'global'; // global variavle
function printMessage() {
    let message = 'hello';
    console.log(message); // local variable
    console.log(globalMessage);
    function printAnother() {
        console.log(message);
        // let childMesage = 'hello'; //error
    }
    // console.log(childMesage);
    // return undefined;
}
printMessage();


// 6. Return a value
function sum(a, b) {
    return a + b;
}
const result = sum(1,2); //3
console.log(`sum: ${sum(1,2)}`);


// 7. Early return, early exit
// bad
function upgradeUser(user) {
    if (user.point > 10) {
        // long upgrade logic...
    }
}

//good
function upgradeUser(user) {
    if (user.point <= 10) {
        return;
    }
    // long upgrade logic...
}


// First-class function
// functions are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other functions/
// can be returned by another function

// 1. Function expression
// a function declaration can be called earlier than it is defiend. (hosted)
// a function expression is created when the execution reaches it.
const print = function() { // anonymous function(이름없는 함수). 함수를 선언함과 동시에 변수에 넣음.
    console.log('print');
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1,3));

// 2. Callback fuunction using function expressing
function randomQuiz(answer, printYes, printNo) {
    if(answer === 'love you') {
        printYes();
    } else {
        printNo();
    }
}
// anonymous function
const printYes = function() {
    console.log('yes!');
}

// named function
// better debugging in debugger's stack traces
// recursions
const printNo = function print() {
    console.log('no!');
    //print(); // 함수안에서 함수를 부를 때 함수 이름 필요
}
randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);


// Arrow function
// always anonymous
const simplePrint = function() {
    console.log('simplePrint!');
};

const simplePrint = () => console.log('simplePrint');
const add = (a,b) => a+b;
const simpleMultiply = (a,b) => {
    // do something more
    return a*b;
};

// 함수 계산기
// function calculate(command, a, b)
// command : add, substract, divide, multiply, remainder
function calculate(command, a, b) {
    if(command === 'add') {
        printAdd(a,b);
    }
    else if(command === 'substract')  {
        printSubstract(a,b);
    }
    else if(command === 'divide')  {
        printDivide(a,b);
    }
    else if(command === 'multiply')  {
        printMultiply(a,b);
    }
    else if(command === 'remainder')  {
        printRemainder(a,b);
    }
}

const printAdd = function (a,b) {
    console.log(a+b);
}
const printSubstract = function (a,b) {
    console.log(a-b);
}
const printDivide = function (a,b) {
    console.log(a/b);
}
const printMultiply = function (a,b) {
    console.log(a*b);
}
const printRemainder = function (a,b) {
    console.log(a%b);
}

calculate('add', 1, 2);
calculate('substract', 1, 2);
calculate('divide', 5, 2);
calculate('multiply', 1, 2);
calculate('multiply', 5, 2);










