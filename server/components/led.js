module.exports = function (arduino, ledpin) {
	var name = 'LED';
	var OUTPUT = 1;
	//Set pin to OUTPUT mode
	arduino.pinMode(ledpin, OUTPUT);
	var state = 0;
	var getState = function () {
		return state;
	};
	var switchState = function () {
		if (state === 0) {
			state = 1;
		} else {
			state = 0;
		}
		arduino.digitalWrite(ledpin, state);
		return state;
	};
	return {
		getName: function () {
			return name;
		},
		getState: getState,
		switchState: switchState
	};
};
