var j5 = require("johnny-five"),
	LED = require("./components/led.js");
/**
 * Initialize arduino with johnny-five and add components
 * @param {object} components Components
 * @returns {undefined}
 */
module.exports = function (components) {	
	var board = new j5.Board();
	board.on("ready", function () {
		var arduino = this;
		/**
		 * Add components here
		 */
		components.push(new LED(arduino, 12));
		components.push(new LED(arduino, 13));
	});
};
