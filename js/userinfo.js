/*
	SubFi - 2016
	Michael Parkinson
	Anything that gets the mouse information belongs here.
	 	
*/
active.userinfo = {
    
    /* 
        Anything related to getting the mouse information.
    */
    mouse: {
        
        /*
            active.userinfo.mouse.reset()
            
            Resets the mouse to the default position.
        */
        reset: function() {
            active.constant.mouse.position = [0,0,0,0,0]
        },
        
        /* 
            active.userinfo.mouse.status(event)
            
            The event is the mouse click.
            
            mouse.position
            downX downY upX upY distance
              0    1      2   3     4
            
            
            Finds current mouse position and the distance between the down and up clicks.
            Think click and drag.
    
        */
        status: function (event){
            document.body.onclick = function() {
                
                active.constant.mouse.isClickable = [false,-1]
                document.body.onmousedown = function(event) {
                    active.constant.mouse.isClickable = [false,-1]
                    active.constant.mouse.position[0] = event.clientX;
                    active.constant.mouse.position[1] = event.clientY;
                    active.userinfo.dot.position()
                    if (active.object.locate.contains(active.constant.object.information, active.constant.dot.position) !== false){
                        active.userinfo.dot.reset(active.userinfo.dot.position)
                    } 
                }
                document.body.onmouseup = function(event) {
                    active.constant.mouse.position[2] = event.clientX;
                    active.constant.mouse.position[3] = event.clientY;
                    active.userinfo.dot.reset(active.constant.dot.position)
                    // active.create.background.clear()
                    // active.create.background.frame()
                    active.render.draw.circle(1)
                    if(active.constant.mouse.position[0] != 0 || active.constant.mouse.position[1] != 0){
                        active.constant.mouse.position[4] = Math.sqrt( Math.pow( active.constant.mouse.position[0] - active.constant.mouse.position[2] , 2 ) + Math.pow( active.constant.mouse.position[1] - active.constant.mouse.position[3] , 2 ) )
                    }
                }
            }
            active.render.draw.dot()
        }
    },
    
    /* 
        Anything related to the dot for visibility should go here.
    */
    dot:{
        
        /* 
            active.userinfo.dot.position()
        
            Uses the down click mouse position as the location for the draw dot.
            The draw dot is here for visibility.
            
            This will be expanded upon in the future.
        
        */
        position: function() {
            active.constant.dot.position = [active.constant.mouse.position[0],active.constant.mouse.position[1]]
        },
        
        /* 
            active.userinfo.dot.reset()
    
            Resets the draw dot position.
            
            Empty array instead of zero array. Trying out both.
    
        */
        reset:function() {
            active.constant.dot.position = []
        }
    }
}