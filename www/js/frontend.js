$(function () {
	"use strict";
	
	var domain = window.location.hostname;
	var connection = new WebSocket('ws://' + domain + ':8888');
	try {
		var myRarduino = new Rarduino(connection);
	} catch (e) {
		$("#status").text('An error occured while trying to connect.');
	}
	
	connection.onopen = function () {
		// connection is opened and ready to use
		$("#status").text('Connected!');
	};

	connection.onerror = function (error) {
		console.log('An error occured while trying to connect.',error);
		$("#status").text('An error occured while trying to connect.');
	};

	connection.onmessage = function (message) {
		// try to decode json
		try {
			var json = JSON.parse(message.data);
		} catch (e) {
			console.log('This doesn\'t look like a valid JSON: ', message.data);
			return;
		}
		// handle incoming message
		// init components
		if (json.type === 'components') {
			frontendComponents.initComponents(json.components);
		}
		// switch component
		if (json.type === 'switch') {
			frontendComponents.componentSwitchState(json.index,json.state);
		}
	};
	
	//component switch handler
	$(document).on("click","#componentsList li", function () {
		var index = $(this).data('index');
		myRarduino.componentSwitch(index);
	});
});

var frontendComponents = (function () {
	return {
		initComponents: function (components) {
			components.forEach(function (component) {
				var el = $('<li></li>').text(component.name).data('index',component.index).attr('id','component-'+component.index);
				$('#componentsList').append(el);
			});	
		},
		componentSwitchState: function (index, state) {
			if (state === 1) {
				$('#component-'+index).removeClass('off').addClass('on');
			} else {
				$('#component-'+index).removeClass('on').addClass('off');
			}
		}
	};
})();
