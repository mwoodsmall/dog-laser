var events = require('events');
function SocketIOHandler(laserPlatform) {
	//turn into singleton
	var io = require('socket.io').listen(8181);
	var lastComm = new Date();
	io.sockets.on('connection', function (socket) {
		socket.on('pan', function(data){
			var degrees = data.degrees;
			lastComm = new Date().getTime();
			console.log(degrees);
			laserPlatform.pan(degrees);
		});
		
		socket.on('tilt', function(data){
			var degrees = data.degrees;
			lastComm = new Date().getTime();
			console.log(degrees);
			laserPlatform.tilt(degrees);
		});
		
		socket.on('moveTo', function(data){
			var coords = data.coords;
			lastComm = new Date().getTime();
			console.log(coords);
			laserPlatform.moveTo(coords);
		});
		
		socket.on('center', function(){
			//emit event
			lastComm = new Date().getTime();
			laserPlatform.center();
		});
		
		socket.on('laser', function(data){
			if(data.on){
				laserPlatform.laserOn();
				console.log('laser on');
			} else {
				laserPlatform.laserOff();
				console.log('laser off');
			}
		});
	
		socket.on('close', function (){
			socket.emit("userLeave", { });
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
		
	    socket.emit("connected",{ message: "Successfully connected to socket.io" });
    
	    socket.emit("userJoin",{ });
	
	});


}
module.exports = SocketIOHandler;


