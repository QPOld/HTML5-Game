/*
	SubFi - 2016
	Michael Parkinson

	Creates a canvas with a width and height given by the current window/document width and height minus the edge thickness.
	
	
*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
function createBackground(){
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	document.getElementById('xPosition').min = '0'
	document.getElementById('xPosition').max = width.toString()
	document.getElementById('yPosition').min = '0'
	document.getElementById('yPosition').max = height.toString()
	windowEdgeThickness = 25;
	canvas.width = width - windowEdgeThickness;
	canvas.height = height - windowEdgeThickness;
	ctx.fillStyle = "#faffcb";
	ctx.fillRect(0,0,width,height);
	
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
function MainWindow() {
	turnOnMenu()
	createBackground()
	document.body.appendChild(canvas);
	
}
function clearWindow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function createCircle(mousePosition) {
	var checkFullMouseClick = mousePosition[2] + mousePosition[3]
	var minimumRadius = 5;
	if( checkFullMouseClick != 0) { // check to make sure you make a full down and up click 
		if(mousePosition[4] > minimumRadius){ // minimum radius
			ctx.fillStyle = "#000000";
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
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		// console.log(objectInformation[i][3],objectInformation[i][4],objectInformation[i][2],0,2*Math.PI)
		ctx.arc(objectInformation[i][3],objectInformation[i][4],objectInformation[i][2],0,2*Math.PI);
		ctx.stroke();
	}
	// resetMousePosition()
}

function moveCircle() {
	editCircleOn()
	editObjectList()
	resetMousePosition()
	return false
	
}