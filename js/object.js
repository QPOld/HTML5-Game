/*
	SubFi - 2016
	Michael Parkinson
	Anything related to storing object information.
    
*/
active.object = {
    
    /* 
        Anything that will edit the object information array will go in the edit section.
    */
    edit:{
                
        /* 
            list()
        
            Sets up the object menu values to the selected object.
    
        */
        list:function() {
            document.getElementById('xPosition').value = active.constant.object.information[active.constant.numbers.index][3]
            document.getElementById('yPosition').value = active.constant.object.information[active.constant.numbers.index][4]
            document.getElementById('radius').value = active.constant.object.information[active.constant.numbers.index][2]
        },
        
        /* 
            storeObjectInformation(active.constant.mouse.position)
    
            active.constant.mouse.position stores the mouse information.
            If the new object location does not exist nor overlay any objects in active.constant.object.information
            then the new object will be added
            else do nothing.
        */
        store: function() {
            // console.log(active.constant.object.information.length)
            var com = active.object.locate.centerofmass()
            var phaseSpace = active.options.run.initialConditions(com)
            var checkArray = false
            active.constant.numbers.index = active.constant.numbers.objects
            checkArray = active.object.locate.contains(active.constant.object.information, phaseSpace)
            if(checkArray){
                active.create.clear()
                active.create.background()
                active.render.draw.circle()
                active.constant.object.information.push(phaseSpace)
                active.constant.numbers.objects++
                active.userinfo.mouse.reset()
                active.create.clear()
                active.create.background()
                active.render.draw.circle()
                // console.log("drawing")
            }
            
        },
        
        /* 
            resetObjectList(active.constant.object.information)
    
            active.constant.object.information is the phase space array for all the objects.
            This function forceds the length to be zero, resetting the arrray to the initial state.
    
        */
        reset: function(objectInformation){
            objectInformation.length = 0
            active.constant.numbers.objects = 0
        },
        
        /* 
            update(active.constant.object.information)
    
            WORK IN PROGRESS
    
            Will eventually update the active.constant.object.information with information from the RK4 method.
               number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
                    0 		 1 	     2	   3   4    5    6    7    8 

        */
        update:function() {
            for(var i = 1; i < active.constant.object.information.length; i++) {
                for(var k = 0; k < active.RK4.Array.coefficent.length; k++){
                    var incX = active.RK4.Array.coefficent[k]*active.RK4.Array.krx[k]
                    var incY = active.RK4.Array.coefficent[k]*active.RK4.Array.kry[k]
                    for(var j = i + 1;j < active.constant.object.information.length; j++){
                        active.method.RK4.acc(active.constant.object.information,i,j,incX,incY)
                    }
                    active.method.RK4.slope(active.constant.object.information[i][7],active.constant.object.information[i][8],k,i)
                }
                active.method.RK4.update(i)
            }
        },
        
        /* 
            deleteObject()
            
            Deletes the selected object from the active.constant.object.information array then 
            redraws the screen and turns off the object menu.
    
        */
        remove: function() {
            active.constant.object.information.splice(active.constant.numbers.index,1)
            active.render.draw.circle()
            active.options.draw.editCircleOff()
            active.userinfo.mouse.reset()
        },
        
        /* 
            check max size
        */
        size:function(radius,inspect) {
            // console.log(radius > active.constant.windows.width/8 ,radius > active.constant.windows.height/8)
            
            if(radius > active.constant.windows.width/8 || radius > active.constant.windows.height/8) {
                var newXVal = active.constant.object.information[inspect][3] + 25
                var newYVal = active.constant.object.information[inspect][4] + 25
                for(var i=0;i<4;i++){
                    active.constant.mouse.position = [-newYVal,newXVal,0,0,radius/4]
                    active.object.edit.store()
                }
                active.constant.numbers.index = inspect
                active.object.edit.remove()
            }
        }
    },
    
    /* 
        Anything that uses the Object Information Array will go in the locate section.
    */
    locate:{
        
        /* 
            contains(object,testObject)
    
            Check if the testObject exists in object.
            object is the array for active.constant.object.information.
            testObject is a 2d array of just the testObject position.
    
        */
        contains:function(object, testObject) {
            for (var i = 0; i < object.length; i++) {
                if ( object[i][3] == testObject[3] && object[i][4] == testObject[4] ) { return false };
                if (testObject[1] == 0 || testObject[2 == 0]) { return false};
                var radius = Math.sqrt( Math.pow( object[i][3] - testObject[3] , 2 ) + Math.pow(object[i][4] - testObject[4] , 2 ) );
                if (radius <= object[i][2]+testObject[2]) { return false };
                if (testObject[4] < 50) {return false};
            }
            return true;
        },
        
        /* 
            checkClickableObject(active.constant.mouse.position,active.constant.object.information)
            
            active.constant.mouse.position stores the mouse information.
            active.constant.object.information stores the object information.
            
            Checks if the mouse click landed inside an object.
            This is useful for the object menu as well as main menu control.
    
        */
        clickable: function(){
            if( active.constant.mouse.position[1] < 75 ) {
                return [false,-1]
            }
            for(var i = 0; i < active.constant.object.information.length; i++) {
                var checkDistance = Math.sqrt( Math.pow(active.constant.object.information[i][3] - active.constant.mouse.position[0],2) + Math.pow(active.constant.object.information[i][4] - active.constant.mouse.position[1],2))
                if(checkDistance < active.constant.object.information[i][2]) {
                    active.userinfo.mouse.reset()
                    active.constant.numbers.index = i
                    return [true,i]
                    break
                }
            }
            return [false,-1]
        },
        
        /* 
            checkCollisionEvents(active.constant.object.information)
            
            Simple collision detection. If two objects hit then the larger mass eats the smaller.
            This is the beginning of a more advanced collision detection.
    
        */
        collision: function() {
            for(var i = 1; i < active.constant.object.information.length; i++) {
                for(var j = i + 1;j < active.constant.object.information.length; j++){
                    
                    var currentDistance = Math.sqrt( Math.pow(active.constant.object.information[i][3] - active.constant.object.information[j][3],2) + Math.pow(active.constant.object.information[i][4] - active.constant.object.information[j][4],2) )
                    var combinedRadius = active.constant.object.information[i][2] + active.constant.object.information[j][2]
                    if(currentDistance < combinedRadius) {
                        if(active.constant.object.information[i][1] > active.constant.object.information[j][1]) {
                            var prevMass = active.constant.object.information[i][1]
                            active.constant.object.information[i][1] += active.constant.object.information[j][1]
                            active.constant.object.information[i][2] = Math.sqrt( (active.constant.object.information[i][1] - prevMass)/(Math.PI*active.constant.numbers.rho) + Math.pow(active.constant.object.information[i][2],2) )
                            active.constant.object.information.splice(j,1)
                        } else {
                            var prevMass = active.constant.object.information[j][1]
                            active.constant.object.information[j][1] += active.constant.object.information[i][1]
                            active.constant.object.information[j][2] = Math.sqrt( (active.constant.object.information[j][1] - prevMass)/(Math.PI*active.constant.numbers.rho) + Math.pow(active.constant.object.information[j][2],2) )
                            active.constant.object.information.splice(i,1)
                        }
                    }
                }
            }
        },
        
        /* 
            check max size
        */
        size:function() {
            // console.log(radius > active.constant.windows.width/8 ,radius > active.constant.windows.height/8)
            for(var i = 1; i < active.constant.object.information.length; i++){
                if(active.constant.object.information[i][2] > active.constant.windows.width/8 || radius > active.constant.windows.height/8) {
                    var newXVal = active.constant.object.information[i][3] + 25
                    var newYVal = active.constant.object.information[i][4] + 25
                    for(var i=0;i<4;i++){
                        active.constant.mouse.position = [-newYVal,newXVal,0,0,radius/4]
                        active.object.edit.store()
                    }
                    active.constant.numbers.index = i
                    active.object.edit.remove()
                }
            }
            
        },
        
        /* 
            boundary conditions
        */
        boundaries: function() {
            for(var i = 1; i < active.constant.object.information.length; i++) {
                // console.log(active.constant.windows.width,i,active.constant.object.information[i][3] + active.constant.object.information[i][2],active.constant.object.information[i][3] - active.constant.object.information[i][2])
                if(active.constant.object.information[i][3] + active.constant.object.information[i][2] >= active.constant.windows.width) {
                    active.constant.object.information[i][3] -= active.constant.windows.width
                }else if(active.constant.object.information[i][4] + active.constant.object.information[i][2] >= active.constant.windows.height) {
                    active.constant.object.information[i][4] -= active.constant.windows.height
                }else if(active.constant.object.information[i][3] - active.constant.object.information[i][2] <= 0) {
                    active.constant.object.information[i][3] += active.constant.windows.width
                }else if(active.constant.object.information[i][4] - active.constant.object.information[i][2] <= 0) {
                    active.constant.object.information[i][4] += active.constant.windows.height
                }else {
                    continue
                }
            }
            
            // for(var i = 0; i < active.constant.windows.width; i++){
                // for()
            // }
        },
        
        /* 
            center of mass
        */
        centerofmass: function() {
            var xCOM = 0
            var yCOM = 0
            var mass = 0;
            for(var m = 1; m < active.constant.object.information.length; m++) {
                mass += active.constant.object.information[m][1]
            }
            active.constant.numbers.totalMass = mass
            for(var i = 1; i < active.constant.object.information.length; i++) {
                xCOM += active.constant.object.information[i][1]*active.constant.object.information[i][3]/mass
                yCOM += active.constant.object.information[i][1]*active.constant.object.information[i][4]/mass
            }
            return [xCOM,yCOM]
        }
    }
}


