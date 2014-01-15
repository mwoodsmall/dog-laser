var five = require("../../../johnny-five/lib/johnny-five"),
	SocketIOHandler = require("./socketiohandler"),
	LaserPlatform = require("./laserPlatform"),
    board, servo, buzzing, piezo;


board = new five.Board({port:'/dev/tty.usbmodemfd121'});

board.on("ready", function() {
	var laserPlatform = new LaserPlatform(board, five);
	SocketIOHandler(laserPlatform);
	
});//end of board ready function