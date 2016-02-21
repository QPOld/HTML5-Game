/*
	SubFi - 2016
	Michael Parkinson
	Anything related to storing object information.
    
    number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
        0 		 1 	     2	   3   4    5    6    7    8 
    
*/
active.object = {
    
    /* 
        Anything that will edit the object information array will go in the edit section.
    */
    edit:{
                
        /* 
            active.object.edit.list()
        
            Sets up the object menu values to the selected object.
            This will be expanded upon in the future with a simple menu and advance menu.
    
        */
        list:function() {
            document.getElementById('xPosition').value = active.constant.object.information[active.constant.numbers.index][3]
            document.getElementById('yPosition').value = active.constant.object.information[active.constant.numbers.index][4]
            document.getElementById('radius').value = active.constant.object.information[active.constant.numbers.index][2]
        },
        
        /* 
            active.object.edit.store()
    
            If the new object location does not exist nor overlay any objects 
            in the active.constant.object.information array
            then the new object will be added
            else do nothing.
        */
        store: function() {
            // console.log(active.constant.object.information.length)
            var phaseSpace = [active.constant.numbers.objects,Math.PI*active.constant.numbers.rho*Math.pow( active.constant.mouse.position[4] , 2 ),active.constant.mouse.position[4],active.constant.mouse.position[2],active.constant.mouse.position[3],0,0,0,0,0,0]
            var checkArray = false
            checkArray = active.object.locate.contains(active.constant.object.information, phaseSpace)
            if(checkArray){
                active.constant.object.information.push(phaseSpace)
                active.constant.numbers.objects++
                active.userinfo.mouse.reset()
                active.create.background.clear()
                active.create.background.frame()
                active.render.draw.circle()
            }
            
        },
        
        /* 
            active.object.edit.reset()
    
            This function forces the length to be zero, reseting the arrray to the initial state.
    
        */
        reset: function(objectInformation){
            objectInformation.length = 0
            active.constant.numbers.objects = 0
        },
        
        /* 
            active.object.edit.update()
    
            Updates the active.constant.object.information with information from the RK4 method.
               number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
                    0 		 1 	     2	   3   4    5    6    7    8 
                    
            Still testing the method.

        */
        update:function() {
            for(var i = 1; i < active.constant.object.information.length; i++) {
                for(var k = 0; k < active.constant.RK4.kcoefficent().length; k++){
                    var incX = active.constant.RK4.kcoefficent()[k]*active.constant.RK4.krx[k]
                    var incY = active.constant.RK4.kcoefficent()[k]*active.constant.RK4.kry[k]
                    for(var j = i + 1;j < active.constant.object.information.length; j++){
                        active.method.RK4.acc(active.constant.object.information,i,j,incX,incY)
                    }
                    active.method.RK4.slope(active.constant.object.information[i][7],active.constant.object.information[i][8],k,i)
                }
                active.method.RK4.update(i)
            }
        },
        
        /* 
            active.object.edit.remove()
            
            The element at active.constant.numbers.index will be removed from the array.
            Deletes the selected object from the active.constant.object.information array then 
            redraws the screen and turns off the object menu.
    
        */
        remove: function() {
            active.constant.object.information.splice(active.constant.numbers.index,1)
            active.render.draw.circle()
            active.options.draw.editOff()
            active.userinfo.mouse.reset()
        },
        
        /* 
        
            active.object.edit.size()
            
            Work in progress
            
            
            This function will control the max size of an object.
            This is to prevent objects greater than the screen size.
            It also splits the object up into N objects (ctive.constant.numbers.splitting).
            This may be moved into a seperate function later on.
        */
        size:function() {
            var radius = active.constant.object.information[active.constant.numbers.index][2]
            if(radius > active.constant.windows.width/8 || radius > active.constant.windows.height/8) {
                var newXVal = active.constant.object.information[active.constant.numbers.index][3] + 25
                var newYVal = active.constant.object.information[active.constant.numbers.index][4] + 25
                for(var i=0;i<active.constant.numbers.splitting;i++){
                    active.constant.mouse.position = [-newYVal,newXVal,0,0,radius/4]
                    active.object.edit.store()
                }
                active.object.edit.remove()
            }
        }
    }, // end of active.object.edit
    
    /* 
        Anything that uses the Object Information Array will go in the locate section.
    */
    locate:{
        
        /* 
            active.object.locate.contains(object,testObject)
    
            Check if the testObject exists in object.
            object is the array for active.constant.object.information.
            testObject is an array of just the position.
            
            Search object and check if testObject exists in object.
    
        */
        contains:function(object, testObject) {
            for (var i = 0; i < object.length; i++) {
                if ( object[i][3] == testObject[3] && object[i][4] == testObject[4] ) { return false }; // same object
                if (testObject[1] == 0 || testObject[2 == 0]) { return false}; // null case
                var radius = Math.sqrt( Math.pow( object[i][3] - testObject[3] , 2 ) + Math.pow(object[i][4] - testObject[4] , 2 ) );
                if (radius <= object[i][2]+testObject[2]) { return false }; // exist within the circle
                if (testObject[4] < active.constant.numbers.menuThickness) {return false} // dont place on menu > This might change in the future.
            }
            return true;
        },
        
        /* 
            active.object.locate.clickable()
            
            Checks if the mouse click landed inside an object.
            This is useful for the object menu as well as main menu control.
            
            Check if mouse position is inside of an object.
            
    
        */
        clickable: function(){
            if( active.constant.mouse.position[1] < active.constant.numbers.menuThickness ) {
                return [false,-1] // Redirects main menu control to different functions.
            }
            for(var i = 0; i < active.constant.object.information.length; i++) {
                var xObject = active.constant.object.information[i][3]
                var yObject = active.constant.object.information[i][4]
                var xMouse = active.constant.mouse.position[0]
                var yMouse = active.constant.mouse.position[1]
                var checkDistance = Math.sqrt( Math.pow(xObject - xMouse,2) + Math.pow(yObject - yMouse,2))
                if(checkDistance < active.constant.object.information[i][2]) {
                    active.userinfo.mouse.reset()
                    active.constant.numbers.index = i
                    return [true,i]
                }
            }
            return [false,-1]
        },
        
        /* 
            active.object.locate.collision()
            
            Simple collision detection. If two objects hit then the larger mass eats the smaller.
            This is the beginning of a more advanced collision detection.
            
            This function may be coupled into the RK4 algorithm at a later stage. 
    
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
        
            active.object.locate.boundaries()
            
            Checks if an object has crossed the boundary of the screen.
            It creates a flickering effect due to the rendering process.
            It "renders" the object in two places but really its only in one place.
            Every frame it changes the position where it will be rendered.
                > removing the effect causes visually bad boundary conditions
                    and little flickering.
                > keeping the effect causes visually good boundary conditions
                    and bad flickering.
        */
        boundaries: function() {
            for(var i = 1; i < active.constant.object.information.length; i++) {
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
        },
        
        /*
            active.object.locate.centerofmass()
            
            Work in Progress
            Calculates the center of mass of the system.
            
            The coordinates need to be changed before this is called.
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
            active.constant.object.centerofmass = [xCOM,yCOM]
        }
    }// end of active.object.locate
}


