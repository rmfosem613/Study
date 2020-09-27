// 워커 스레드를 사용하지 않고 소수의 개수를 구하는 작업 방법

// 2부터 1000만까지의 숫자 중에 소수가 모두 몇 개 있는지를 알아내는 코드
const min = 2;
const max = 10000000;
const primes = [];

function generatePrimes(start, range) {
	let isPrime = true;
	const end = start + range;
	for (let i = start; i < end; i++) {
		for ( let j = min; j < Math.sqrt(end); j++) {
			if ( i !== j && i % j === 0) {
				isPrime = false;
				break;
			}
		}
		if (isPrime) {
			primes.push(i);
		}
		isPrime = true;
	}
}

// 시간이 오래 걸린다.
console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);