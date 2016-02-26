/*
SubFi - 2016
Michael Parkinson

Creates a canvas with a width and height given by the current window/document width and height minus the edge thickness.

 */

active.create = {

	background : {

		/*
		active.create.background.frame()

		Create a canvas element that is the width and height of the screen/window.
		Then fills the circle with the background color.

		 */
		frame : function () {
			active.constant.windows.canvas.width = active.constant.windows.width
            active.constant.windows.canvas.height = active.constant.windows.height
            // active.constant.windows.canvas.width = 800
            // active.constant.windows.canvas.height = 600
            active.constant.context.ctx().fillStyle = "#9999ff";
			active.constant.context.ctx().fill()
			active.constant.context.ctx().fillRect(0, 0, active.constant.windows.canvas.width, active.constant.windows.canvas.height);
            // active.constant.context.ctx().fillRect(0, 0, 800, 600);
		},

		/*
		active.create.background.append()

		Turns on the main menu and creates the background.
		The canvas is then appended to the body.

		 */
		append : function () {
            active.create.background.frame()
            document.body.appendChild(active.constant.windows.canvas);
			active.options.draw.turnOnMainMenu()	
		},

		/*
		active.create.background.clear()

		Places a clear rectangle with size of the window height and width.

		 */
		clear : function () {
			active.constant.context.ctx().clearRect(0, 0, active.constant.windows.width, active.constant.windows.height);
		},

		/*
		active.create.backgroundinitialize()

		Initializes the mouse, window, and object array.
		 */
		initialize : function () {
			active.create.background.clear()
			active.userinfo.mouse.reset()
			active.object.edit.reset(active.constant.object.information)
			active.create.background.append()
		}
	}
}
