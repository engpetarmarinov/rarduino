"use strict";
/**
 * Configs
 */
var HTTP_PORT = 8080;
var WWW_RELATIVE_PATH = '/../www';
var INDEX = 'index.html';

var http = require("http"),
		path = require("path"),
		url = require("url"),
		fs = require("fs");

var contentTypesByExtension = {
	'.html': "text/html",
	'.css': "text/css",
	'.js': "text/javascript"
};

var server = http.createServer(function (request, response) {
	// process HTTP request
	console.log((new Date()) + ' HTTP server. URL ' + request.url + ' requested.');

	var myPath = url.parse(request.url).pathname;
	var requestedFile = myPath;
	if (requestedFile.toString().substr(-1) === '/') {
		requestedFile += INDEX;
	}
	var fullPath = path.join(process.cwd() + WWW_RELATIVE_PATH, requestedFile);
	fs.exists(fullPath, function (exists) {
		if (!exists) {
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
		}
		else {
			//TODO: add security
			fs.readFile(fullPath, "binary", function (err, file) {
				if (err) {
					response.writeHeader(500, {"Content-Type": "text/plain"});
					response.write(err + "\n");
					response.end();

				}
				else {
					var headers = {};
					var contentType = contentTypesByExtension[path.extname(fullPath)];
					if (contentType) {
						headers["Content-Type"] = contentType;
					}
					response.writeHeader(200, headers);
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}).listen(HTTP_PORT, function () {
	console.log((new Date()) + " Server is listening on port " + HTTP_PORT);
});
