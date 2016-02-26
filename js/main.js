/*
SubFi - 2016
Michael Parkinson

 */
/*
main(event)

Main loop for the entire program. Runs the function at 60 fps.
 */
function main() {
	var checkStatus = active.render.draw.status()
		if (checkStatus) { // draw mode
			active.constant.mouse.position = active.userinfo.mouse.status(window.event) // Retrieves  mouse position.
				active.object.edit.store() // Store object position.
				isClickable = active.object.locate.clickable() // If you click on an object go to the menu.
				// console.log(isClickable)
				if (isClickable[0]) {
					isClickable[0] = active.options.draw.menu(active.constant.object.information, isClickable[1]) // Object menu. Change the function name.
				}
				// console.log("done")
		} else { // Simulate mode. Work in progress.
			active.object.locate.boundaries()
			// active.object.locate.collision()
			active.object.edit.update()
			// active.object.locate.size()
			if (active.constant.numbers.updating == active.constant.numbers.maximumFrames) {
				active.create.background.clear()
				active.create.background.frame()
				active.render.draw.circle()
				active.constant.numbers.updating = 0
			}
			active.constant.numbers.updating++

		}
		requestAnimationFrame(main);

}
// setInterval( mainLoop, active.constant.numbers.fps );
requestAnimationFrame(main);
