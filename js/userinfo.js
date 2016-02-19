/*
	SubFi - 2016
	Michael Parkinson
	Anything that gets the mouse information belongs here.
	 	
*/

/* 
    checkMouseStatus(event)
    
    event is the mouse click.
    mousePosition
    downX downY upX upY radius
	  0    1      2   3     4
    
    Finds current mouse position and the distance between the down and up clicks.
    
*/
function checkMouseStatus(event){
	document.body.onmousedown = function(event) {
        console.log(objectInformation[objectInformation.length - 1]);
		console.log(objectInformation)
		mousePosition[0] = event.clientX;
		mousePosition[1] = event.clientY;
		getDotPosition(mousePosition)
		if (contains(objectInformation, dotPosition) !== false){
			resetDotPosition(dotPosition)
		} 
	}
	document.body.onmouseup = function(event) {
		mousePosition[2] = event.clientX;
		mousePosition[3] = event.clientY;
		resetDotPosition(dotPosition)
		drawCircle(objectInformation)
	}
	drawDot(dotPosition)
	mousePosition[4] = Math.sqrt( Math.pow( mousePosition[0] - mousePosition[2] , 2 ) + Math.pow( mousePosition[1] - mousePosition[3] , 2 ) )
	return mousePosition
}

/* 
    resetMousePosition()
    
    Reset the length to zero then sets the mouse to the zero array.
    
*/
function resetMousePosition() {
	mousePosition.length = 0
	mousePosition = [0,0,0,0,0]
}

/* 
        getDotPosition(mousePosition)
        
        Uses the down click mouse position as the location for the draw dot.
        The draw dot is here for visibility.
        
*/
function getDotPosition(mousePosition) {
	dotPosition = [mousePosition[0],mousePosition[1]]
}

/* 
    resetDotPosition(dotPosition)
    
    Resets the draw dot position.
    
*/
function resetDotPosition(dotPosition) {
    dotPosition = []
}