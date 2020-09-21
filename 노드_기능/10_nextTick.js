setImmediate(() => {
	console.log('immediate');
});
process.nextTick(() => { // setImmediate, setTimeout보다 우선시됨.
	console.log('nextTick');
});
setTimeout(() => {
	console.log('timeout');
}, 0);
// promise도 nextTick처럼 다른 콜백들보다 우선시됨.
Promise.resolve().then(() => console.log('promise'));