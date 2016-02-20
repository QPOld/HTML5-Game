/*
	SubFi - 2016
	Michael Parkinson

	(2-19-2016) 
		
		FUTURE
			* Add in RK4 Method
			* Add in BH Method (for large N)
			* Change collision detection
				> use current models
			* Allow for more user customization
            * Improve user flow
            * create a max size splits the bigger objects into little objects
            * fix draw methods
                > draw.dot
                > split draw.circles <- make just for splitting
			
*/
/* 
    main(event)

    Main loop for the entire program. Runs the function at 60 fps.
*/
function main(){
    var checkStatus = active.render.draw.status()
    if(checkStatus){ // draw mode
        active.constant.mouse.position = active.userinfo.mouse.status(window.event) // Retrieves  mouse position.
        active.object.edit.store() // Store object position.
        // isClickable = active.object.locate.clickable() // If you click on an object go to the menu.
        // console.log(isClickable)
        // if(isClickable[0]) {
            // isClickable[0] = active.options.draw.menu(active.constant.object.information,isClickable[1]) // Object menu. Change the function name.
        // }
        // console.log("done")
    } else { // Simulate mode. Work in progress.
        active.object.edit.update()
        active.object.locate.boundaries()
        // active.object.locate.collision()
        // active.object.locate.size()
        active.create.clear()
        active.create.background()
        active.render.draw.circle()  
    }
    requestAnimationFrame(main);
    
    
    
}
// setInterval( mainLoop, active.constant.numbers.fps );
requestAnimationFrame(main);