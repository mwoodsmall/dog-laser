function Platform(board, five) {
	var self = this;
	var range = [ 0, 170 ];
	self.servoPan = new five.Servo({
		pin: 9, 
		range: range
	});
	self.servoTilt = new five.Servo({
		pin: 10, 
		range: range
	});
	
	board.repl.inject({
		servo: self.servoPan,
		servo: self.servoTilt
	});
	
	self.servoPan.center();
	self.servoTilt.center();
}

Platform.prototype.pan = function( degrees ) {
	this.servoPan.move(degrees);
};

Platform.prototype.tilt = function( degrees ) {
  	this.servoTilt.move(degrees);
};

Platform.prototype.moveTo = function (coords){
	this.pan(coords.x);
	this.tilt(coords.y);
};

Platform.prototype.center = function (){
	this.servoPan.center();
	this.servoTilt.center();
};

module.exports = Platform;
