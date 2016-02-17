/*
	SubFi - 2016
	Michael Parkinson

	RENDER - File To Obtain Useful information such that a screen can be rendered.
	Anything that gets the mouse information belongs here.
	 downX downY upX upY radius
	  0    1      2   3     4	
*/

var mousePosition = [0,0,0,0,0]; // global variable - gets used by all files
// checkMouseStatus finds current mouse position and the distance between the downand up clicks
function checkMouseStatus(event){
	document.body.onmousedown = function(event) {
		mousePosition[0] = event.clientX;
		mousePosition[1] = event.clientY;
	}
	document.body.onmouseup = function(event) {
		mousePosition[2] = event.clientX;
		mousePosition[3] = event.clientY;
	}
	mousePosition[4] = Math.sqrt( Math.pow( mousePosition[0] - mousePosition[2] , 2 ) + Math.pow( mousePosition[1] - mousePosition[3] , 2 ) )
	return mousePosition
}
function checkDrawStatus() {
	checkOpacity = document.getElementById('BeginButton').style.opacity;
	if ( checkOpacity > 0 ) { return true } else { return false};
}
function resetMousePosition() {
	mousePosition.length = 0
	mousePosition = [0,0,0,0,0]
}
function updateTextInput(val,buttonName) {
  document.getElementById(buttonName).textContent=val; 
}