/* 
    SubFi - 2016
	Michael Parkinson
    
    Constants
    
    Anything that is constant.
*/
active.constant = {
    
    mouse:{
        position:[0,0,0,0,0] // global variable - gets used by all files
    },
    
    dot:{
        position:[]
    },
    
    /* number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
           0 		 1 	     2	   3   4    5    6    7    8 
    */
    object:{
        information:[]
    },
    
    numbers:{
        objects:0,
        rho:0.001,
        G:39.4, // solar mass au years
        index:-1,
        minimumRadius:5,
        updating:1,
        fps:1000/60,
        delta:0.001
    },
    
    windows:{
        canvas:document.createElement("canvas"),
        
        width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        edgeThickness:25
    },
    
    random:{
        uniform: function(min, max) {
    return Math.random() * (max - min) + min;
}
    }
    
}
active.context= {
    ctx:active.constant.windows.canvas.getContext("2d")
}