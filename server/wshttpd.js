"use strict";
var WebSocketServer = require('websocket').server,
		http = require('http'),
		components = require("./components");

var rarduino = require("./rarduino")(components);

var wsServer = (function () {
	//Port of the server
	var HTTP_PORT = 8888;
	//List of currently connected clients
	var clients = [];

	var server = http.createServer(function (request, response) {
		//Process HTTP request. Since we're writing just WebSockets server
		//We don't have to implement anything.
	}).listen(HTTP_PORT, function () {
		console.log((new Date()) + " Server is listening on port " + HTTP_PORT);
	});

	//Create the server
	var wsServer = new WebSocketServer({
		httpServer: server
	});

	//WebSocket server
	wsServer.on('request', function (request) {
		//TODO: add security
		var connection = request.accept(null, request.origin);
		var clientIndex = clients.push(connection) - 1;

		//Send all components
		components.sendComponents(connection);
		//send the current state of all components
		components.sendCurrentState(connection);

		/**
		 * Handle all messages
		 */
		connection.on('message', function (message) {
			if (message.type === 'utf8') { // accept only text				
				try {
					var json = JSON.parse(message.utf8Data);
				} catch (e) {
					console.log('This doesn\'t look like a valid JSON: ', message.utf8Data);
					return;
				}
				if (json.type === 'switch' && typeof json.index !== 'undefined') {
					components.switchState(json.index);
					// broadcast message to all connected clients				
					for (var i = 0; i < clients.length; i++) {
						components.sendCurrentState(clients[i]);
					}
				}
			}
		});

		connection.on('close', function (connection) {
			//Close user connection
			clients.splice(clientIndex, 1);
		});
	});
})();
