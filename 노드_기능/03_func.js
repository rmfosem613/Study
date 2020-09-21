const { odd, even } = require('./var');
function chekOddOrEven(num) {
	if(num % 2) {
		return odd;
	}
	return even;
}

module. exports = chekOddOrEven;