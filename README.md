Rarduino
------------
My home automation playground. 

Architecture
------------
I use my Raspberry Pi B+ for hosting a simple nodejs web server and a websocket server.
The Raspberry talks to an Arduino Uno via johny-five.

Installation
------------
```
$ git clone git@github.com:wildalmighty/rarduino.git
$ cd rarduino/server
$ npm install
```
Usage
-----
You will need a web server. The other things are started from wshttpd.js
```
$ cd rarduino/server
$ node http.js 
$ node wshttpd.js
```
TODO
-----
* Web server security
* Add more components to control
