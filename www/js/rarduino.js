/* 
 * This is the frontend api for rarduino
 */
var Rarduino = (function (connection) {
	if ((connection instanceof WebSocket) === false) {
		throw 'Rarduino ERROR: the parameter passed to Rarduino is not an instance of WebSocket';
	}
	var componentSwitch = function (index) {
		connection.send(JSON.stringify({
			type: "switch",
			index: index
		}));
	};
	return {
		componentSwitch: componentSwitch
	};
});
