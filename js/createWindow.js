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
function MainWindow() {
	turnOnMenu()
	createBackground()
	document.body.appendChild(canvas);
	
}
function clearWindow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveCircle() {
	editCircleOn()
	editObjectList()
	resetMousePosition()
	return false
	
}