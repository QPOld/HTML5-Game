/*
	SubFi - 2016
	Michael Parkinson

	Anything related to drawing the objects.
    
*/

/* 
    checkDrawStatus()
    
    If the begin button is visible then the user is still in draw mode. 
    Once begin disappears the simulation will begin.
    
    Called by main(event)
    
 */
function checkDrawStatus() {
	var checkOpacity = document.getElementById('BeginButton').style.opacity;
	if ( checkOpacity > 0 ) { return true } else { return false};
}

/* 
    updateTextInput(val,buttonName)
    
    val is the new value for the button named buttonName.
    
    Work in progress. 
    This will update the value shown in the menu options.
    Needs to flow better.
    
 */
function updateTextInput(val,buttonName) {
  document.getElementById(buttonName).textContent=val; 
}

/* 
    drawDot(dotPosition)
    
    dotPosition is a [0,0] 2d array containing the down click position of mouse.
    
    Draws a dot where the user did the initial down click.
    This can be changed to include the actual circle being drawn.
    
 */
function drawDot(dotPosition) {
	if( dotPosition[1] > 75 ) { // Make sure you are not clicking on a menu option.
		ctx.fillStyle = "#4ad32c";
		ctx.fill()
		ctx.beginPath();
		ctx.arc(dotPosition[0],dotPosition[1],10,0,2*Math.PI);
		ctx.stroke();
	}
	
}
/* 
    createCircle(mousePosition)
    
    mousePosition is a [0,0,0,0,0] array that store the initial and final position plus the radius.
    
    If the user has performed a full mouse click then a circle will be drawn at the 
    mouse down position with a radius defined by the distance between the initial and 
    final mouse position.
    
 */
function createCircle(mousePosition) {
	var checkFullMouseClick = mousePosition[2] + mousePosition[3]
	if( checkFullMouseClick != 0) { // Check the mouse to make sure you make a full down and up click. 
		if(mousePosition[4] > minimumRadius){ // Minimum radius allowed.
			ctx.beginPath();
			ctx.arc(mousePosition[0],mousePosition[1],mousePosition[4],0,2*Math.PI);
			ctx.stroke();
		}
	}
	resetMousePosition()
}

/* 
    drawCircle(objectInformation)
    
    objectInformation is an array storing the phase space for an object plus additional information.
    number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
	    0 		  1 	  2	    3   4    5    6    7    8
        
    Loops through the objectInformation array and draws circles at all the x and y positions.
    Used to provide an animation type simulation.
    
 */
function drawCircle(objectInformation) {
	clearWindow()
	createBackground()
	for (var i = 1; i < objectInformation.length; i++) { // the first element is the default position (
		ctx.beginPath();
        ctx.fillStyle = "#000000";
		ctx.fill()
		ctx.arc(objectInformation[i][3],objectInformation[i][4],objectInformation[i][2],0,2*Math.PI);
		ctx.stroke();
	}
    
}

/* 
    editCircleOn()
    
    Turns on the object menu.
    Can edit the x and y position. This will be changed to flow better.
    Can edit the radius which changes the mass.
    
 */
function editCircleOn(){
	document.getElementById('InputMenu').style.opacity = 0.75
	document.getElementById('InputMenuText').style.opacity = 0.75
	document.getElementById('xVal').textContent = objectInformation[index][3]
	document.getElementById('yVal').textContent = objectInformation[index][4]
	document.getElementById('rad').textContent = objectInformation[index][2]
    resetMousePosition()
}

/* 
    editCircleOff()
    
    Turns off the object menu. This is done with a confirmation button.
    The objectInformation array is updated then the screen is redrawn.
    
 */
function editCircleOff(){
	document.getElementById('InputMenu').style.opacity = 0.0
	document.getElementById('InputMenuText').style.opacity = 0.0
	objectInformation[index][3] = parseInt(document.getElementById('xPosition').value,10)
	objectInformation[index][4] = parseInt(document.getElementById('yPosition').value,10)
	objectInformation[index][2] = parseInt(document.getElementById('radius').value,10)
	drawCircle(objectInformation)
    resetMousePosition()
}

/* 
    turnOnMenu()
    
    Turns on the main menu. This contains the start, reset, stop, and begin buttons.
    To avoid unclickable buttons the location of the start button is moved to no mans land.
    
 */
function turnOnMenu(){
	document.getElementById('StartButton').style.opacity = 0; // Turn off the opacity for the start button.
	document.getElementById('StartButton').style.top = '-999px';
	document.getElementById('StartButton').style.left = '-999px';
	document.getElementById('ResetButton').style.opacity = 0.75;// Turn on the opacity for the reset button.
	document.getElementById('BeginButton').style.opacity = 0.75;// Turn on the opacity for the begin button.
	document.getElementById('StopButton').style.opacity = 0;// Turn off the opacity for the stop button.
}