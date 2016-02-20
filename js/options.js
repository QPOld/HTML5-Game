/*
	SubFi - 2016
	Michael Parkinson

	User Options - User Selected Options
    Access to the option menu is controlled by style opacities.
    
*/
active.options = {
    /* 
        Any menu options related to drawing go here.
    */
    draw: {
        
        /* 
            editCircleOn()
    
            Turns on the object menu.
            Can edit the x and y position. This will be changed to flow better.
            Can edit the radius which changes the mass.
    
        */
        editCircleOn: function() {
            document.getElementById('InputMenu').style.opacity = 0.75
            document.getElementById('InputMenuText').style.opacity = 0.75
            document.getElementById('xVal').textContent = active.constant.object.information[active.constant.numbers.index][3]
            document.getElementById('yVal').textContent = active.constant.object.information[active.constant.numbers.index][4]
            document.getElementById('rad').textContent = active.constant.object.information[active.constant.numbers.index][2]
            active.userinfo.mouse.reset()
        },
        
        /* 
            editCircleOff()
    
            Turns off the object menu. This is done with a confirmation button.
            The objectInformation array is updated then the screen is redrawn.
    
        */
        editCircleOff: function() {
            document.getElementById('InputMenu').style.opacity = 0.0
            document.getElementById('InputMenuText').style.opacity = 0.0
            if(active.constant.object.information.length > 1) {
                active.constant.object.information[active.constant.numbers.index][3] = parseInt(document.getElementById('xPosition').value,10)
                active.constant.object.information[active.constant.numbers.index][4] = parseInt(document.getElementById('yPosition').value,10)
                active.constant.object.information[active.constant.numbers.index][2] = parseInt(document.getElementById('radius').value,10)  
            }
            active.render.draw.circle(active.constant.object.information)
            active.userinfo.mouse.reset()
        },
        
        /* 
            moveCircle() --> menu()
            
            Turns on the object menu.
            The name should change.
        */
        menu: function() {
            active.options.draw.editCircleOn()
            active.object.edit.list()
            active.userinfo.mouse.reset()
            return false
        },
        
        /* 
            turnOnMenu()
    
            Turns on the main menu. This contains the start, reset, stop, and begin buttons.
            To avoid unclickable buttons the location of the start button is moved to no mans land.
    
        */
        turnOnMenu: function() {
            document.getElementById('StartButton').style.opacity = 0; // Turn off the opacity for the start button.
            document.getElementById('StartButton').style.top = '-999px';
            document.getElementById('StartButton').style.left = '-999px';
            document.getElementById('ResetButton').style.opacity = 0.75;// Turn on the opacity for the reset button.
            document.getElementById('BeginButton').style.opacity = 0.75;// Turn on the opacity for the begin button.
            document.getElementById('StopButton').style.opacity = 0;// Turn off the opacity for the stop button.
        }
    },
    
    /* 
        Anything related to starting the simulation will go here.
    */
    run: {
        
        /* 
            startSimulation()
        
            Turns off the opacity for the start and begin button.
            Turns on the opacity for the reset and stop button.
        
        */
        startSimulation: function() {
            document.getElementById('StartButton').style.opacity = 0.0       // Turn off the opacity for the start button.
            document.getElementById('BeginButton').style.opacity = 0.0       // Turn on the opacity for the begin button.
            document.getElementById('ResetButton').style.opacity = 0.75      // Turn on the opacity for the reset button.
            document.getElementById('StopButton').style.opacity = 0.75       // Turn off the opacity for the stop button.
            active.options.draw.editCircleOff()
        }
    }   
}