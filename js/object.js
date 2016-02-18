/*
	SubFi - 2016
	Michael Parkinson
	Anything related to storing object information
*/
// Creating an array of arrays to locally store object phase space as well as mass
var objectInformation = []
var dotPosition = [] // array contain the user mouse position. allows for better visualization.
var numberOfObjects = 0
var rho = 0.001
var index = -1
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
function deleteObject() {
	objectInformation.splice(index,1)
	drawCircle(objectInformation)
	editCircleOff()
	resetMousePosition()
}
function resetObjectList(objectInformation){
	objectInformation.length = 0
	numberOfObjects = 0
}
function editObjectList() {
	document.getElementById('xPosition').value = objectInformation[index][3]
	document.getElementById('yPosition').value = objectInformation[index][4]
	document.getElementById('radius').value = objectInformation[index][2]
	
	
}
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
function storeObjectInformation(mousePosition) {
	
	// number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
	// 0 			1  		2	   3   4    5   6     7    8
	var phaseSpace = [numberOfObjects,Math.PI*rho*Math.pow( mousePosition[4] , 2 ),mousePosition[4],mousePosition[0],mousePosition[1],0,0,0,0]
	var checkArray = contains(objectInformation, phaseSpace)
	if(checkArray){
		createCircle(mousePosition)
		objectInformation.push(phaseSpace)
		numberOfObjects++
		// console.log(objectInformation[objectInformation.length - 1]);
		// console.log(objectInformation)
	}
}

function updateObjectInformation(objectInformation) {
	for(var i = 1; i < objectInformation.length; i++) {
		objectInformation[i][2] += 1;
	}
}
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


