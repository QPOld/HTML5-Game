/* 
    SubFi - 2016
	Michael Parkinson
    
    Constants
*/
active.constant = {
    mouse:{
        position:[0,0,0,0,0] // global variable - gets used by all files
    },
    dot:{
        position:[]
    },
    object:{
        information:[]
    },    
    numbers:{
        objects:0,
        rho:0.001,
        index:-1,
        minimumRadius:5
    },
    
    windows:{
        canvas:document.createElement("canvas"),
        
        width:window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        edgeThickness:25
    }
}
active.context= {
    ctx:active.constant.windows.canvas.getContext("2d")
}