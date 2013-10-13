var five = require("../../../johnny-five/lib/johnny-five"),
	io = require("socket.io"),
	Platform = require("./platform"),
    board, servo, buzzing, piezo;


board = new five.Board();

board.on("ready", function() {
	//console.log(plat);
	var platform = new Platform(board, five);
	var laser = new five.Led(12);
	
	board.repl.inject({
    	laser: laser
  	});

	//in board ready function, set up and start the socket server.  have server handle angle events from socket clients.
	io = require("socket.io").listen(8080);//when the board is ready we'll start the server
	io.sockets.on('connection', function (socket) {

		socket.on('pan', function(data){
			var degrees = data.degrees;
			console.log(degrees);
			platform.pan(degrees);
		});
		
		socket.on('tilt', function(data){
			var degrees = data.degrees;
			console.log(degrees);
			platform.tilt(degrees);
		});
		
		socket.on('moveTo', function(data){
			var coords = data.coords;
			console.log(coords);
			platform.moveTo(coords);
		});
		
		socket.on('center', function(){
			platform.center();
		});
		
		socket.on('laser', function(data){
			if(data.on){
				laser.on();
				console.log('laser on');
			} else {
				laser.off();
				console.log('laser off');
			}
		});
	
		/*socket.on("buzz", function (data){
			if(data.isOn && !buzzing){
				//buzz
				var tone = Math.floor((Math.random()*2000)+1);
				console.log(tone);
				piezo.tone(tone, 100);
			} else if(!data.isOn && buzzing) {
				//stop buzz
			}
		}); */ 
		
	    socket.emit("connected",{ message: "hi there this is from the node server" });
     
	    console.log("connnnnection!");
	    socket.broadcast.emit("message",{message:"someone else connected"});
	});
});//end of board ready function