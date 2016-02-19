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
// setInterval( function(){active.create.main()}, 1000/60 );
/* 
    main(event)

    Main loop for the entire program. Runs the function at 60 fps.
*/
var mainLoop = function main(event){
    var checkStatus = active.render.draw.status()
    if(checkStatus){ // draw mode
        active.constant.mouse.position = active.userinfo.mouse.status(window.event) // Retrieves  mouse position.
        active.object.edit.store() // Store object position.
        isClickable = active.object.locate.clickable() // If you click on an object go to the menu.
        if(isClickable[0]) {
            isClickable[0] = active.options.draw.menu(active.constant.object.information,isClickable[1]) // Object menu. Change the function name.
        }
    } else { // Simulate mode. Work in progress.
        active.object.edit.update(active.constant.object.information) 
        active.object.locate.collision()
        active.create.background()
        active.render.draw.circle()
    }	
}
setInterval( mainLoop, 1000/60 );