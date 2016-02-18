/*
	SubFi - 2016
	Michael Parkinson

	RENDER - screen can be rendered.
	Anything related to drawing the objects.
*/


function checkDrawStatus() {
	checkOpacity = document.getElementById('BeginButton').style.opacity;
	if ( checkOpacity > 0 ) { return true } else { return false};
}

function updateTextInput(val,buttonName) {
  document.getElementById(buttonName).textContent=val; 
}
function drawDot(dotPosition) {
	if( dotPosition[1] > 75 ) {
		ctx.fillStyle = "#000000";
		ctx.fill()
		ctx.beginPath();
		ctx.arc(dotPosition[0],dotPosition[1],10,0,2*Math.PI);
		ctx.stroke();
	}
	
}
function createCircle(mousePosition) {
	var checkFullMouseClick = mousePosition[2] + mousePosition[3]
	var minimumRadius = 5;
	if( checkFullMouseClick != 0) { // check to make sure you make a full down and up click 
		if(mousePosition[4] > minimumRadius){ // minimum radius
			// ctx.fillStyle = "#000000";
			ctx.beginPath();
			ctx.arc(mousePosition[0],mousePosition[1],mousePosition[4],0,2*Math.PI);
			ctx.stroke();
		}
	}
	resetMousePosition()
}

function drawCircle(objectInformation) {
	clearWindow()
	createBackground()
	for (var i = 1; i < objectInformation.length; i++) {
		// ctx.fillStyle = "#000000";
		ctx.beginPath();
		// console.log(objectInformation[i][3],objectInformation[i][4],objectInformation[i][2],0,2*Math.PI)
		ctx.arc(objectInformation[i][3],objectInformation[i][4],objectInformation[i][2],0,2*Math.PI);
		ctx.stroke();
	}
	// resetMousePosition()
}
function editCircleOn(){
	document.getElementById('InputMenu').style.opacity = 0.75
	document.getElementById('InputMenuText').style.opacity = 0.75
	document.getElementById('xVal').textContent = objectInformation[index][3]
	document.getElementById('yVal').textContent = objectInformation[index][4]
	document.getElementById('rad').textContent = objectInformation[index][2]
}
function editCircleOff(){
	document.getElementById('InputMenu').style.opacity = 0.0
	document.getElementById('InputMenuText').style.opacity = 0.0
	objectInformation[index][3] = document.getElementById('xPosition').value
	objectInformation[index][4] = document.getElementById('yPosition').value
	objectInformation[index][2] = document.getElementById('radius').value
	drawCircle(objectInformation)
	resetMousePosition()
}
function turnOnMenu(){
	document.getElementById('StartButton').style.opacity = 0; // Turn off the opacity for the start button.
	document.getElementById('StartButton').style.top = '-999px';
	document.getElementById('StartButton').style.left = '-999px';
	document.getElementById('ResetButton').style.opacity = 0.75;// Turn on the opacity for the reset button.
	document.getElementById('BeginButton').style.opacity = 0.75;// Turn on the opacity for the begin button.
	document.getElementById('StopButton').style.opacity = 0;// Turn off the opacity for the stop button.
}