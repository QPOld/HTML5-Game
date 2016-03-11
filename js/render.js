/*
SubFi - 2016
Michael Parkinson

Anything related to drawing the objects.

 */

active.render = {

	/*
	Anything related to drawing shapes should go here.
	 */
	draw : {

		/*
		active.render.draw.circle()

		Loops through the active.constant.object.information array and draws circles at all the x and y positions.
		Used to provide an animation.

		 */
		circle : function (i) {
            var self = this;
            // console.log(i,active.constant.object.information.length)
            if(i>=active.constant.object.information.length){
                return true
            }else {
                // console.log(i,active.constant.object.information[i])
                active.constant.context.ctx().beginPath();
				active.constant.context.ctx().arc(active.constant.object.information[i][3], active.constant.object.information[i][4], active.constant.object.information[i][2], 0, 2 * Math.PI);
				active.constant.context.ctx().stroke();
                i++
                self.circle(i)
            }
		},

		/*
		active.render.draw.dot()

		dot.position is a [0,0] 2d array containing the down click position of mouse.

		Draws a dot where the user did the initial down click.
		This can be changed to include the actual circle being drawn.

		The dot is for visibility.

		 */
		dot : function () {
			if (active.constant.mouse.position[1] > 75) { // Make sure you are not clicking on a menu option.
				active.constant.context.ctx().fillStyle = "#b3ffb3"
					active.constant.context.ctx().fill()
					active.constant.context.ctx().beginPath()
					active.constant.context.ctx().arc(active.constant.mouse.position[0], active.constant.mouse.position[1], active.constant.numbers.dotRadius, 0, 2 * Math.PI)
					active.constant.context.ctx().stroke()
			}
		},
        
        /* 
        active.render.draw.velocityVector()
        
        Draws the velocity vector for the object associated with active.constant.numbers.index.
        */
        velocityVector : function() {
            var x = active.constant.object.information[active.constant.numbers.index][3]
            var y = active.constant.object.information[active.constant.numbers.index][4]
            var vx = active.constant.object.information[active.constant.numbers.index][5]
            var vy = active.constant.object.information[active.constant.numbers.index][6]
            vx = vx/Math.hypot(vx,vy) // normalize
            vy = vy/Math.hypot(vx,vy)// normalize
            
            
            // ARROW METHOD
            
            var theta = Math.atan2(vy,vx)
            active.constant.context.ctx().beginPath();
            active.constant.context.ctx().fillStyle = "#000000"
            var tox = x+active.constant.numbers.vectorScale*vx
            var toy = y+active.constant.numbers.vectorScale*vy
            active.constant.context.ctx().moveTo(tox,toy);           
            active.constant.context.ctx().lineTo(tox-active.constant.numbers.triangleHeight*Math.cos(theta-Math.PI/7),toy-active.constant.numbers.triangleHeight*Math.sin(theta-Math.PI/7));
            active.constant.context.ctx().lineTo(tox-active.constant.numbers.triangleHeight*Math.cos(theta+Math.PI/7),toy-active.constant.numbers.triangleHeight*Math.sin(theta+Math.PI/7));
            active.constant.context.ctx().lineTo(tox, toy);
            active.constant.context.ctx().lineTo(tox-active.constant.numbers.triangleHeight*Math.cos(theta-Math.PI/7),toy-active.constant.numbers.triangleHeight*Math.sin(theta-Math.PI/7));
            active.constant.context.ctx().fill();

            
            active.constant.context.ctx().beginPath();
            active.constant.context.ctx().moveTo(x,y);
            active.constant.context.ctx().lineTo(x+active.constant.numbers.vectorScale*vx,y+active.constant.numbers.vectorScale*vy);
            active.constant.context.ctx().stroke();
            
            
        },

		/*
		active.render.draw.status()

		If the begin button is visible then the user is still in draw mode.
		Once begin disappears the simulation will begin.

		Called by main(event)

		 */
		status : function () {
			var checkBegin = document.getElementById('begin').style.opacity;
            var checkMenu = document.getElementById('menu').style.opacity;
			if (checkBegin > 0 && checkMenu > 0) { // drawing mode
                return "draw"
            } else if(checkBegin > 0 && checkMenu == 0){ // enter menu
                return "menu"
            } else { // simulate mode
                return "simulate"
            }
		},

		/*
		active.render.draw.update(val,buttonName)

		val is the new value for the button named buttonName.

		Work in progress.
		This will update the value shown in the menu options.
		Needs to flow better.

		 */
		update(val, buttonName) {
			document.getElementById(buttonName).textContent = val;
		},
        
        /* 
            active.render.draw.frame()
        */
        frame: function() {
            if (active.constant.numbers.updating == active.constant.numbers.maximumFrames) {
				active.create.background.clear()
				active.create.background.frame()
				active.render.draw.circle(1)
				active.constant.numbers.updating = 0
			}
			active.constant.numbers.updating++
        }
	} // end of draw
}
