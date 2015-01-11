var components = [];

/**
 * Sends the current state of all components via the connection
 * @param {Object} connection WebSocket connection
 * @returns {undefined}
 */
var sendCurrentState = function (connection) {
	//Send the current state of all components
	for (var componentIndex = 0; componentIndex < components.length; componentIndex++) {
		var json = JSON.stringify({
			index: componentIndex,
			type: 'switch',
			state: components[componentIndex].getState()
		});
		connection.sendUTF(json);
	}
};

/**
 * Sends all components that are initialized
 * @param {Object} connection WebSocket connection
 * @returns {undefined}
 */
var sendComponents = function (connection) {
	var componentsDetails = [];
	for (var componentIndex = 0; componentIndex < components.length; componentIndex++) {
		componentsDetails.push({
			index: componentIndex,
			name: components[componentIndex].getName()
		});
	}
	connection.sendUTF(JSON.stringify({
		type: 'components',
		components: componentsDetails
	}));
};

/**
 * Switches the state of the component ON/OFF
 * @param {Integer} index
 * @returns {Boolean}|{Integer}
 */
var switchState = function (index) {
	if (typeof components[index] !== 'undefined') {
		components[index].switchState();
	} else {
		return false;
	}
};

module.exports = {
	getComponents: function () {
		return components;
	},
	push: function (component) {
		return components.push(component);
	},
	sendCurrentState: sendCurrentState,
	sendComponents: sendComponents,
	switchState: switchState
};
