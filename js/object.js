/*
	SubFi - 2016
	Michael Parkinson
	Anything related to storing object information.
    
*/

/* 
    contains(object,testObject)
    
    Check if the testObject exists in object.
    object is the array for objectInformation.
    testObject is a 2d array of just the testObject position.
    
 */
function contains(object, testObject) {
    for (var i = 0; i < object.length; i++) {
		if ( object[i][3] == testObject[3] && object[i][4] == testObject[4] ) { return false }
		if (testObject[1] == 0 || testObject[2 == 0]) { return false}
		var radius = Math.sqrt( Math.pow( object[i][3] - testObject[3] , 2 ) + Math.pow(object[i][4] - testObject[4] , 2 ) )
		if (radius <= object[i][2]+testObject[2]) { return false }
		if (testObject[4] < 50) {return false}
	}
    return true;
}

/* 
    deleteObject()
    
    Deletes the selected object from the objectInformation array then 
    redraws the screen and turns off the object menu.
    
 */
function deleteObject() {
	objectInformation.splice(index,1)
	drawCircle(objectInformation)
	editCircleOff()
	resetMousePosition()
}

/* 
    resetObjectList(objectInformation)
    
    objectInformation is the phase space array for all the objects.
    This function forceds the length to be zero, resetting the arrray to the initial state.
    
 */
function resetObjectList(objectInformation){
	objectInformation.length = 0
	numberOfObjects = 0
}

/* 
    editObjectList()
    
    Sets up the object menu values to the selected object.
    
 */
function editObjectList() {
	document.getElementById('xPosition').value = objectInformation[index][3]
	document.getElementById('yPosition').value = objectInformation[index][4]
	document.getElementById('radius').value = objectInformation[index][2]
}

/* 
    checkClickableObject(mousePosition,objectInformation)
    
    mousePosition stores the mouse information.
    objectInformation stores the object information.
    
    Checks if the mouse click landed inside an object.
    This is useful for the object menu as well as main menu control.
    
 */
function checkClickableObject(mousePosition,objectInformation){
	if( mousePosition[1] < 75 ) {
		return [false,-1]
	}
	for(var i = 0; i < objectInformation.length; i++) {
		var checkDistance = Math.sqrt( Math.pow(objectInformation[i][3] - mousePosition[0],2) + Math.pow(objectInformation[i][4] - mousePosition[1],2))
		if(checkDistance < objectInformation[i][2]) {
			resetMousePosition()
			index = i
			return [true,i]
			break
		}
	}
	return [false,-1]
}

/* 
    storeObjectInformation(mousePosition)
    
    mousePosition stores the mouse information.
    If the new object location does not exist nor overlay any objects in objectInformation
    then the new object will be added
    else do nothing.
 */
function storeObjectInformation(mousePosition) {
	var phaseSpace = [numberOfObjects,Math.PI*rho*Math.pow( mousePosition[4] , 2 ),mousePosition[4],mousePosition[0],mousePosition[1],0,0,0,0]
	var checkArray = contains(objectInformation, phaseSpace)
	if(checkArray){
		createCircle(mousePosition)
		objectInformation.push(phaseSpace)
		numberOfObjects++
	}
}

/* 
    updateObjectInformation(objectInformation)
    
    WORK IN PROGRESS
    
    Will eventually update the objectInformation with information from the RK4 method.
    
 */
function updateObjectInformation(objectInformation) {
	for(var i = 1; i < objectInformation.length; i++) {
		objectInformation[i][2] += 1;
	}
}

/* 
    checkCollisionEvents(objectInformation)
    
    Simple collision detection. If two objects hit then the larger mass eats the smaller.
    This is the beginning of a more advanced collision detection.
    
*/
function checkCollisionEvents(objectInformation) {
	for(var i = 1; i < objectInformation.length; i++) {
		for(var j = i + 1;j < objectInformation.length; j++){
			var currentDistance = Math.sqrt( Math.pow(objectInformation[i][3] - objectInformation[j][3],2) + Math.pow(objectInformation[i][4] - objectInformation[j][4],2) )
			var combinedRadius = objectInformation[i][2] + objectInformation[j][2]
			if(currentDistance < combinedRadius) {
				if(objectInformation[i][1] > objectInformation[j][1]) {
					var prevMass = objectInformation[i][1]
					objectInformation[i][1] += objectInformation[j][1]
					objectInformation[i][2] = Math.sqrt( (objectInformation[i][1] - prevMass)/(Math.PI*rho) + Math.pow(objectInformation[i][2],2) )
					objectInformation.splice(j,1)
				} else {
					var prevMass = objectInformation[j][1]
					objectInformation[j][1] += objectInformation[i][1]
					objectInformation[j][2] = Math.sqrt( (objectInformation[j][1] - prevMass)/(Math.PI*rho) + Math.pow(objectInformation[j][2],2) )
					objectInformation.splice(i,1)
				}
			}
		}
	}
}


