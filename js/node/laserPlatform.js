function LaserPlatform(board, five) {
	var self = this;
	var range = [ 0, 170 ];
	var laserOn = false;
	self.servoPan = new five.Servo({
		pin: 9, 
		range: range
	});
	self.servoTilt = new five.Servo({
		pin: 10, 
		range: range
	});
	self.laser = new five.Led(12);
	
	board.repl.inject({
		servo: self.servoPan,
		servo: self.servoTilt,
		laser: self.laser
	});
	
	self.servoPan.center();
	self.servoTilt.center();
}

LaserPlatform.prototype.pan = function( degrees, duration, callback ) {
	this.servoPan.move(degrees);
};


LaserPlatform.prototype.tilt = function( degrees, duration, callback ) {
  	this.servoTilt.move(degrees);
};

LaserPlatform.prototype.moveTo = function (coords){
	this.pan(coords.x);
	this.tilt(coords.y);
};

LaserPlatform.prototype.center = function (){
	this.servoPan.center();
	this.servoTilt.center();
};

LaserPlatform.prototype.laserOn = function (){
	this.laser.on();
	laserOn = true;
};

LaserPlatform.prototype.laserOff = function (){
	this.laser.off();
	laserOn = false;
};

LaserPlatform.prototype.laserStrobe = function (){
	//this.laser.off();
};

LaserPlatform.prototype.panLoop = function (){
	//this.center();
};

LaserPlatform.prototype.laserToggle = function (){
	if(laserOn){
		laser.off();
	} else {
		laser.on();
	}
};


module.exports = LaserPlatform;
