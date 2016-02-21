/*
	SubFi - 2016
	Michael Parkinson

	Anything related to drawing the objects.
    
*/

active.render = {
    
    /* 
        Anything related to drawing shapes should go here.
    */
    draw: {
        
        /* 
            active.render.draw.circle()
            
            Loops through the active.constant.object.information array and draws circles at all the x and y positions.
            Used to provide an animation.
            
        */
        circle: function() {
            active.create.background.clear()
            active.create.background.frame()
            active.constant.context.ctx().fillStyle = "#000000";
            active.constant.context.ctx().fill()
            for (var i = 1; i < active.constant.object.information.length; i++) { // the first element is the default position (
                active.constant.context.ctx().beginPath();
                active.constant.context.ctx().arc(active.constant.object.information[i][3],active.constant.object.information[i][4],active.constant.object.information[i][2],0,2*Math.PI);
                active.constant.context.ctx().stroke();
            }
            
        },
        
        /* 
            active.render.draw.dot()
    
            dot.position is a [0,0] 2d array containing the down click position of mouse.
    
            Draws a dot where the user did the initial down click.
            This can be changed to include the actual circle being drawn.
            
            The dot is for visibility.
    
        */
        dot: function() {
            if( active.constant.mouse.position[1] > 75 ) { // Make sure you are not clicking on a menu option.
                active.constant.context.ctx().fillStyle = "#4ad32c"
                active.constant.context.ctx().fill()
                active.constant.context.ctx().beginPath()
                active.constant.context.ctx().arc(active.constant.mouse.position[0],active.constant.mouse.position[1],10,0,2*Math.PI)
                active.constant.context.ctx().stroke()
            }
        },
        
        /* 
            active.render.draw.status()
    
            If the begin button is visible then the user is still in draw mode. 
            Once begin disappears the simulation will begin.
            
            Called by main(event)
    
        */
        status: function() {
            var checkOpacity = document.getElementById('BeginButton').style.opacity;
            if ( checkOpacity > 0 ) { return true } else { return false};
        },
        
        /* 
            active.render.draw.update(val,buttonName)
    
            val is the new value for the button named buttonName.
    
            Work in progress. 
            This will update the value shown in the menu options.
            Needs to flow better.
    
        */
        update(val,buttonName) {
            document.getElementById(buttonName).textContent=val; 
        }
    }
}
