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

	active.constant.object.information is an array storing the phase space
	for an object plus additional information.
    
    active.constant.object.centerofmass
    
    used to calculate the center of mass for the system of N particles.

	number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay \ axtemp \ aytemp
	0 		 1 	     2	   3   4    5    6    7    8      9       10
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
        maxRadius: 25
	},

	/*
	active.constant.RK4.kcoefficent()
	active.constant.RK4.fcoefficent()
	active.constant.RK4."name"

	The k-coefficent and f-coefficent are functions that return arrays.
	They reference the same object and must be returned immediately upon calling.

	The others are called as usual.
	 */
	RK4 : {
		coefficent : function () {
			return [1, active.constant.numbers.h / 2, active.constant.numbers.h / 2, 1]
		},
		matrix : function () {
			return [active.constant.numbers.h / 6, active.constant.numbers.h / 3, active.constant.numbers.h / 3, 6]
		},
		krx : [0, 0, 0, 0, 0], // 0 , krx1, krx2, krx3, krx4
		kry : [0, 0, 0, 0, 0],
		kvx : [0, 0, 0, 0, 0], // 1, kvx1, kvx2, kvx3, kvx4
		kvy : [0, 0, 0, 0, 0],
		kax : [0, 0, 0, 0, 0],
		kay : [0, 0, 0, 0, 0],
		kxy : [0, 0, 0, 0, 0]
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
	active.constant.random.uniform()

	Generates a random number between min and max.
	 */
	random : {
		uniform : function (min, max) {
			return Math.random() * (max - min) + min;
		}
	}
}
