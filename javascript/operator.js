// 1. String concatenation
console.log('my' + 'cat');
console.log('1' + 2);
console.log(`string literals: 1 + 2 = ${1 + 2}`); //$ 변수 값을 계산

// 2. Numeric operators
console.log(1 + 1); // add
console.log(1 - 1); // substract
console.log(1 / 1); // divide
console.log(1 * 1); // multiply
console.log(1 % 1); // remainder
console.log(1 ** 1); // exponentiation

// 3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
// counter = counter +1; //1더해진 값을 할당후 출력
// preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const preDecrement = --counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postDecrement = counter--;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);


// 4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y;
x *= y;
x /= y;

// 5. Comparison operators
console.log(10 < 6); // less than
console.log(10 <= 6); // less than of equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than of equal

// 6. Logical operators: || (or), && (and), ! (not)
const value1 = false;
const value2 = 4 < 2;

// || (or)
console.log(`or: ${value1 || value2 || check()}`);

// && (and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`);

// often used to compress long if-statement
// nullableObject && nullableObject.something

if (nullableObject !== null) {
	nullableObject.something; // nullableObject가 null이 아닐때만 값을 받아옴
}

function check() {
	for (let i = 0; i<10; i++) {
		//wasting time
		console.log('진행중');
	}
	return true;
}

// ! (not)
console.log(!value1);

// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

// === strict equality, no type conversion
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);

// Object equality by reference
const ellie1 = {name: 'ellie'};
const ellie2 = {name: 'ellie'};
const ellie3 = ellie1;
console.log(ellie1 == ellie2);
console.log(ellie1 === ellie2); // 서로 다른 주소를 가리킴
console.log(ellie1 === ellie3);

// equality - puzzler
console.log(0 == false); // true
console.log(0 === false); // false
console.log('' == false); // true
console.log('' === false); // false
console.log(null == undefined); // true
console.log(null === undefined); // false

// 8. Conditional operators: if
// if, else if, else
const name = 'ellie';
if(name === 'ellie') {
	console.log('Welcome,Ellie!');
} else if(name === 'coder') {
	console.log('You are amazing coder');
} else {
	console.log('unkwon')
}

// 9. Ternary operator: ?
// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes':'no'); // 간단할 때

// 10. Switch statement
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser) {
	case 'IE':
		console.log('go away!');
		break;
	case 'Chrome':
	case 'Firefox':
		console.log('love you!');
		break;
	default:
		console.log('same all!');
		break;
}

// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
let i = 3;
while (i>0) {
	console.log(`while: ${i}`);
	i--;
}

// do while loop, body code is executed first,
// then check the condition.
do {
	console.log(`do while: ${i}`);
	i--;
} while(i>0);

// for loop, for(begin; condition; step)
for (i = 3; i > 0; i--) {
	console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i - 2) { // 지역변수 i
	// inline variable declaration
	console.log(`inline variable for: ${i}`);
}

// nested loops
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
		console.log(`i: ${i}, j: ${j}`);
	}
}
