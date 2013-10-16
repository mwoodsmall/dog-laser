$(document).ready(
function(){
                var degreesX = 90,
                        degreesY = 90,
                        laserOn = false,
                        socket="";

                var center = function (){
                        socket.emit("center", {degrees : degreesX});
                }

                socket= io.connect('http://localhost:8181');
                socket.on("connected",function(data){
                        $("#serverConnect").html(data.message)
                });
                socket.on("message",function(data){
                        $("#serverMessages").html($("#serverMessages").html()+"<h2>"+data.message+"</h2>");
                });

                center();

                $('#aimBox').click(function(e){
                        var multiplier = $(this).height() / 180;
                        var position = {
                                x: (e.layerX || e.offsetX),
                                y: (e.layerY || e.offsetY)
                        };

                        position.x = position.x / multiplier;
                        position.y = position.y / multiplier;

                        console.log(position);
                        socket.emit('moveTo', { coords: position });
                });

                $('#joystick').draggable(
                        {
                             containment: 'parent',
                             drag: function() {
                                     var multiplier = $('#joystick').parent().height() / 170;
                                     var childPos = $('#joystick').offset();
                                     var parentPos = $('#joystick').parent().offset();
                                     var coords = {
                                         y: (childPos.top - parentPos.top) / multiplier,
                                         x: (childPos.left - parentPos.left) / multiplier
                                     }
                             socket.emit('moveTo', { coords: coords});
                         }
                     });



		
		
		
		$(window).keydown(function(event){
			var key = event.which;
			if(key === 37 || key === 38 || key === 39 || key === 40){
				if(key === 37 &&  degreesX > 0){
					console.log(degreesX-=10);
					socket.emit("pan", {degrees : degreesX});
				} else if(key === 39 && degreesX < 170){
					console.log(degreesX+=10);
					socket.emit("pan", {degrees : degreesX});
				} else if(key === 38 && degreesY > 0){
					console.log(degreesY-=10);
					socket.emit("tilt", {degrees : degreesY});
				} else if(key === 40 && degreesY < 170){
					console.log(degreesY+=10);
					socket.emit("tilt", {degrees : degreesY});
				}
			} else if (key === 32){
				if(!laserOn){
					laserOn = true;
					socket.emit("laser", { on: true});
				} else {
					laserOn = false;
					socket.emit("laser", { on: false});
				}
			} 
		});
		
		/*$(window).keyup(function (event){
			var key = event.which;
			if(key === 32){
				socket.emit("buzz", { isOn: false})
			}
		});*/
	}
);
