/*
	SubFi - 2016
	Michael Parkinson

	Creates a canvas with a width and height given by the current window/document width and height minus the edge thickness.

*/

/* 
    createBackground()
    
    Create a canvas element that is the width and height of the screen/window.
    Then fills the circle with the background color.
    
*/
function createBackground(){
	document.getElementById('xPosition').min = '0'
	document.getElementById('xPosition').max = width.toString()
	document.getElementById('yPosition').min = '0'
	document.getElementById('yPosition').max = height.toString()
	windowEdgeThickness = 25;
	canvas.width = width - windowEdgeThickness;
	canvas.height = height - windowEdgeThickness;
	ctx.fillStyle = "#faffcb";
    ctx.fill()
	ctx.fillRect(0,0,width,height);
}

/* 
    MainWindow()
    
    Turns on the main menu and creates the background.
    The canvas is then appended to the body.
    
*/
function MainWindow() {
	turnOnMenu()
	createBackground()
	document.body.appendChild(canvas);
	
}

/* 
    clearWindow()
    
    Places a clear rectangle with size of the window height and width.
    
*/
function clearWindow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* 
    moveCircle()
    
    Turns on the object menu.
    The name should change.
*/
function moveCircle() {
	editCircleOn()
	editObjectList()
	resetMousePosition()
	return false
}