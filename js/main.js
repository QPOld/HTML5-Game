/*
SubFi - 2016
Michael Parkinson

 */
/*
main(event)

Main loop for the entire program. Runs the function at 60 fps.
 */
function main() {
	var checkStatus = active.render.draw.status() // check opacity
    if (checkStatus == 'draw') { // draw mode
        active.userinfo.mouse.status(window.event) // Retrieves  mouse position.
        active.object.edit.store() // Store object position.
        active.object.locate.clickable(0) // If you click on an object go to the menu.
        if (typeof(active.constant.mouse.isClickable) != 'undefined') {
            if(active.constant.mouse.isClickable[0]){
                active.constant.mouse.isClickable[0] = active.options.draw.menu(active.constant.object.information, active.constant.mouse.isClickable[1]) // Object menu. Change the function name. 
            }
        }
    } else if(checkStatus == 'simulate') { // Simulate mode. Work in progress.
        active.object.locate.boundaries(0)
        // active.object.locate.collision()  // Needs work
        active.object.edit.update()
        // active.object.locate.size()  // Needs work
        active.render.draw.frame()
    }
    requestAnimationFrame(main);

}
requestAnimationFrame(main);
