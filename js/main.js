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
//Global Variables
var objectInformation = []// Creating an array of arrays to locally store object phase space as well as mass
var dotPosition = [] // array contain the user mouse position. allows for better visualization.
var numberOfObjects = 0
var rho = 0.001
var index = -1
var mousePosition = [0,0,0,0,0]; // global variable - gets used by all files
var defaultFPS = 1000 / 60 ;
var minimumRadius = 5;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
/* 
    initialize()
    
    Initializes the mouse, window, and object array.
    
    ../js/createwindow.js
        clearWindow() 
        MainWindow()
    
    ../js/userinfo.js
        resetMousePosition()
    
    ../js/object.js        
        resetObjectList() 
    
*/
function initialize(){
	clearWindow() 
	resetMousePosition() 
	resetObjectList(objectInformation)
	MainWindow()
}
 
/* 
    main(event)
    
    Main loop for the entire program. Runs the function at 60 fps.
    
    ../js/render.js
        checkDrawStatus()
        drawCircle()
    
    ../js/userinfo.js
        checkMouseStatus()
    
    ../js/object.js
        storeObjectInformation()
        checkClickableObject()
        updateObjectInformation()
        checkCollisionEvents()
    
    ../js/createWindow.js
        moveCircle()
        createBackground()
    
*/
var mainLoop = function main(event){
	var checkStatus = checkDrawStatus()
	if(checkStatus){ // draw mode
		mousePosition = checkMouseStatus(event) // Retrieves  mouse position.
		storeObjectInformation(mousePosition) // Store object position.
		isClickable = checkClickableObject(mousePosition,objectInformation) // If you click on an object go to the menu.
		if(isClickable[0]) {
			isClickable[0] = moveCircle(objectInformation,isClickable[1]) // Object menu. Change the function name.
		}
	} else { // Simulate mode. Work in progress.
		updateObjectInformation(objectInformation) 
		checkCollisionEvents(objectInformation)
		createBackground()
		drawCircle(objectInformation)
	}
	
}

setInterval( mainLoop, defaultFPS );