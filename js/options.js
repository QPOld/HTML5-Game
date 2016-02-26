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
	draw : {

		/*
		active.options.draw.openHelpMenu()

		Turns on the help menu.

		It will be a slider menu.
		 */
		openHelpMenu : function () {
			document.getElementById('HelpButton').style.opacity = 0.0
            document.getElementById('HelpButton').disabled = true
            document.getElementById('CloseButton').style.opacity = 0.75
            document.getElementById('CloseButton').style.left = "-10px"
            document.getElementById('CloseButton').disabled = false
            document.getElementById('HelpMenuSlideLeft').style.opacity = 0.75
		},

		/*
		active.options.draw.openHelpMenu()

		Turns on the help menu.

		It will be a slider menu.
		 */
		closeHelpMenu : function () {
			document.getElementById('HelpButton').style.opacity = 0.75
            document.getElementById('HelpButton').disabled = false
            document.getElementById('CloseButton').style.opacity = 0.0
            document.getElementById('CloseButton').style.left = "+100px"
            document.getElementById('CloseButton').disabled = true
            document.getElementById('HelpMenuSlideLeft').style.opacity = 0.0
            
		},

		/*
		active.options.draw.editCircleOn()

		Turns on the object menu.
		Can edit the x and y position.
		Can edit the radius which changes the mass.
		This will be changed to flow better.

		 */
		editCircleOn : function () {
            document.getElementById('xPosition').min = '0'
            document.getElementById('xPosition').max = active.constant.windows.width.toString()
            document.getElementById('yPosition').min = '0'
            document.getElementById('yPosition').max = active.constant.windows.height.toString()
            document.getElementById('ObjectMenuSlideDown').style.opacity = 0.75
			document.getElementById('InputMenu').style.opacity = 0.75
            document.getElementById('InputMenu').disabled = false
            document.getElementById('InputMenuText').style.opacity = 0.75
            document.getElementById('InputMenuText').disabled = false;
            document.getElementById('xVal').textContent = active.constant.object.information[active.constant.numbers.index][3]
            document.getElementById('yVal').textContent = active.constant.object.information[active.constant.numbers.index][4]
            document.getElementById('rad').textContent = active.constant.object.information[active.constant.numbers.index][2]
            active.userinfo.mouse.reset()
		},

		/*
		active.options.draw.editCircleOff()

		Turns off the object menu. This is done with a confirmation button.
		The objectInformation array is updated then the screen is redrawn.

		 */
		editCircleOff : function () {
			document.getElementById('InputMenu').style.opacity = 0.0
            document.getElementById('InputMenu').disabled = true;
			document.getElementById('InputMenuText').style.opacity = 0.0
            document.getElementById('InputMenuText').disabled = true;
            document.getElementById('ObjectMenuSlideDown').style.opacity = 0.0
			if (active.constant.object.information.length > 1) {
				try {
					active.constant.object.information[active.constant.numbers.index][3] = parseInt(document.getElementById('xPosition').value, 10)
                    active.constant.object.information[active.constant.numbers.index][4] = parseInt(document.getElementById('yPosition').value, 10)
                    active.constant.object.information[active.constant.numbers.index][2] = parseInt(document.getElementById('radius').value, 10)
				} catch (err) {}
			}
			active.render.draw.circle(active.constant.object.information)
			active.userinfo.mouse.reset()
		},

		/*
		active.options.draw.menu()

		Turns on the object menu.
		Wrapper for the object menu functions.
		 */
		menu : function () {
			active.options.draw.editCircleOn()
			active.object.edit.list()
			active.userinfo.mouse.reset()
			return false
		},

		/*
		active.options.draw.turnOnMainMenu()

		Turns on the main menu. This contains the start, reset, stop, and begin buttons.
		To avoid unclickable buttons the location of the start button is moved to no mans land.

		 */
		turnOnMainMenu : function () {
			active.userinfo.mouse.reset()
			document.getElementById('StartButton').style.opacity = 0; // Turn off the opacity for the start button.
			document.getElementById('StartButton').disabled = true;

			document.getElementById('reset').style.opacity = 0.75; // Turn on the opacity for the reset button.
			document.getElementById('reset').disabled = false;

			document.getElementById('begin').style.opacity = 0.75; // Turn on the opacity for the begin button.
			document.getElementById('begin').disabled = false;

			document.getElementById('stop').style.opacity = 0; // Turn off the opacity for the stop button.
			document.getElementById('stop').disabled = true;

			document.getElementById('HelpButton').style.opacity = 0.0
            document.getElementById('HelpButton').disabled = true;

			document.getElementById('CloseButton').style.opacity = 0.0
            document.getElementById('CloseButton').disabled = true;

			document.getElementById('HelpMenuSlideLeft').style.opacity = 0.0
            document.getElementById('HelpMenuSlideLeft').disabled = true;

			document.getElementById('Planets').style.opacity = 0.0
            document.getElementById('Planets').disabled = true;

			document.getElementById('Logo').style.opacity = 0.0
            document.getElementById('Logo').disabled = true;
		}
	}, // End of active.options.draw

	/*
	Anything related to starting the simulation will go here.
	 */
	run : {

		/*
		active.options.run.simulation()

		Turns off the opacity for the start and begin button.
		Turns on the opacity for the reset and stop button.

		 */
		simulation : function () {
			document.getElementById('begin').style.opacity = 0.0 // Turn on the opacity for the begin button.
            document.getElementById('begin').disabled = true;
			document.getElementById('reset').style.opacity = 0.75 // Turn on the opacity for the reset button.
            document.getElementById('reset').disabled = false;
			document.getElementById('stop').style.opacity = 0.75 // Turn off the opacity for the stop button.
            document.getElementById('stop').disabled = false;
			active.object.locate.centerofmass()
			active.options.run.initialConditions()
			active.options.draw.editCircleOff()
		},

		/*
		active.options.run.initialConditions()

		The parameter com is the center of mass in 2d [xCOM,yCOM].

		Work in progress.
		 */
		initialConditions : function () {
			for (var i = 0; i < active.constant.object.information.length; i++) {
				var x = active.constant.object.information[i][3] - active.constant.object.centerofmass[0]
					var y = active.constant.object.information[i][4] - active.constant.object.centerofmass[1]
					var mu = active.constant.numbers.G * (active.constant.numbers.totalMass)
					var top = 1 + Math.pow(y, 2) / Math.pow(x, 2)
					var bot = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 3)
					if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < active.constant.object.information[i][2]) {
						var vx = 0
							var vy = 0
					} else {
						var mu = active.constant.numbers.G * (active.constant.numbers.totalMass)
							var vx = -Math.sqrt(mu) * x * y * Math.sqrt(top / bot) // incorrect velocities
							var vy = Math.sqrt(mu) * Math.pow(x, 2) * Math.sqrt(top / bot)
					}
					active.constant.object.information[i][5] = vx
					active.constant.object.information[i][6] = vy
			}

		}
	}
}
