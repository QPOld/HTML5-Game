/*
	SubFi - 2016
	Michael Parkinson

	(2-6-2016) 
		- update code with current comments
			-> halt on progression
		- fix the edit menu
			-> more fluid
		
		
		FUTURE
			* Add in RK4 Method
			* Add in BH Method (for large N)
			* Change collision detection
				> use current models
			* Allow for more user customization

	POSSIBLE
		> Change all global variables into a single variable(check google for it)
			
*/
function initialize(){
	clearWindow()
	resetMousePosition()
	resetObjectList(objectInformation)
	MainWindow()
	resetObjectList(objectInformation)
}
var mainLoop = function main(event){
	var checkStatus = checkDrawStatus()
	var isClickable = false
	if(checkStatus){
		mousePosition = checkMouseStatus(event)
		
		storeObjectInformation(mousePosition)
		isClickable = checkClickableObject(mousePosition,objectInformation)
		if(isClickable[0]) {
			isClickable[0] = moveCircle(objectInformation,isClickable[1])	
		}
	} else {
		updateObjectInformation(objectInformation)
		checkCollisionEvents(objectInformation)
		createBackground()
		drawCircle(objectInformation)
	}
	
}
var ONE_FRAME_TIME = 1000 / 60 ;
setInterval( mainLoop, ONE_FRAME_TIME );