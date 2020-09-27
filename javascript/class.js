'use strinct';
// Object-oriendted programming
// class: template
// Object: instance of a class
// JavaScript classes
//	- introduced in ES6
//	- syntactical sugar over prototype-based inheritance
//	    문법만 제공하는

// 1. Class declarations
class Person {
	// constuctor
	constuctor(name, age) {
		//fields
		this.name = name;
		this.age = age;
	}

	//methods
	speak() {
		console.log(`${this.name}: hello!`);
	}
}

const ellie = new Person('ellie', 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();

// 2. Getter and setters
class User{
	constuctor(firstName, lastName, age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}

	get age() { // Getter 호출(반환)
		return this._age;
	}

	set age(value) { // setter 호출(설정)
		this._age = value < 0 ? 0 : value;
	}
}

const user1 = new User('Steve', 'job', -1);
console.log(user1.age);

// 3. Fields (public, private)
// Too soon!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
class Experiment {
	publicField = 2;
	#privateField = 0; // class 내부에서만 접근 가능하고, 읽을 수 있음
}

const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined, 외부에서는 볼 수 없음

// 4. Static properties and methods
// Too soon!
// static은 class 자체에 붙어있음.
// object에 상관없이 고정된 값으로 쓰일 때
class Article {
	static publisher = 'Dream Cooding';
	constuctor(articleNumber) {
		this.articleNumber = articleNumber;
	}

	static printPublisher() {
		console.log(Article.publisher);
	}
}

const article1 = new Article(1);
const article2 = new Article(2); 
console.log(article1.publisher); //undefined
Article.printPublisher(); // Dream Cooding

// 5. Inheritance(상속)
// a way for one class to extend another class.
class Shape {
	constuctor(width, height, color) {
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		console.log(`drawing ${this.color} color of`);
	}

	getArea() {
		return width * this.height;
	}
}

class Rectangle extends Shape {}
class Triangle extends Shape{
	draw() {
		super.draw(); // 부모의 정의된 것도 호출하며
		console.log('세모') // 새로 정의한 것도 호출
	}
	getArea() {
		return (this.width * this.height) / 2; // 필요한 부분만 재정의 가능
	}
	toString() {
		return `Triangle: color: ${this.color}`;
	}
}

const rectangle = new Rectangle(20,20,'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20,20,'red');
triangle.draw();
console.log(triangle.getArea());

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(triangle instanceof Shape); // true
console.log(triangle instanceof Object); // true object로 정의되기 때문에 js 내부의 함수들을 사용 가능.
