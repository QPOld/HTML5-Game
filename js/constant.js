/*
SubFi - 2016
Michael Parkinson

Constants and Arrays.


 */
active.constant = {

	/*
	active.constant.mouse.position

	Constants stored for the mouse go here.

	Holds the mouse position array. This may be changed to an empty array.

	mouseDownX \ mouseDownY \ mouseUpX \ mouseUpY \ Distance
	0            1            2          3          4
	 */
	mouse : {
		position : [0, 0, 0, 0, 0],
        isClickable : [false,-1]
	},

	/*
	active.constant.dot.position

	Constants for the drawing dot goes here.

	Holds an empty array for the dot position.
	 */
	dot : {
		position : []
	},

	/*
	active.constant.object.information
    active.object.locate.information

	active.constant.object.information is an array storing the phase space
	for an object plus additional information.
    
    active.constant.object.centerofmass
    active.object.locate.centerofmass
    
    used to calculate the center of mass for the system of N particles.

	number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay \ axtemp \ aytemp
	0 		      1 	  2	    3   4    5    6    7    8      9       10
	 */
	object : {
		information : [],
		centerofmass : [0, 0]
	},

	/*
	active.constant.numbers."name"

	Stores constants:physical constants, parameters,flags,etc.
	 */
	numbers : {
		objects : 0,
        maxObjects : 50,
		rho : 1, // solar mass / au^3
		G : 39.4, // solar mass au years
		index : -1,
		minimumRadius : 5, // au
		updating : 0,
		maximumFrames : 1,
		splitting : 4,
		fps : 1000 / 60,
		h : 0.015, // step sizes
		totalMass : 0,
		edgeThickness : 25, // in pixels
		menuThickness : 90,
        maxRadius : 25,
        dotRadius : 5,
        vectorScale : 75,
        triangleHeight: 10, // in pixels
        triangleBase: 25, // in pixels
        velocityLimit : 100 // for the menu and possible future addtions.
        
	},

	/*
	active.constant.context.ctx()

	Must be called like a function.
	Reference to the canvas which is contained in the constant object.
	 */
	context : {
		ctx : function () {
			return active.constant.windows.canvas.getContext("2d")
		}
	},

	/*
	active.constants.windows."name"

	Anything canvas related but the context (ctx).
	 */
	windows : {
		canvas : document.createElement("canvas"),
		width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
	},

	/*
	active.constant.random.uniform(min,max)

	Generates a random number between min and max.
	 */
	random : {
		uniform : function (min, max) {
			return Math.random() * (max - min) + min;
		}
	}
}
