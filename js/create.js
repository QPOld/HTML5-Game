/*
	SubFi - 2016
	Michael Parkinson

	Creates a canvas with a width and height given by the current window/document width and height minus the edge thickness.

*/

active.create = {
    /* 
        createBackground()
        
        Create a canvas element that is the width and height of the screen/window.
        Then fills the circle with the background color.
    
    */
    background: function(){
        document.getElementById('xPosition').min = '0'
        document.getElementById('xPosition').max = active.constant.windows.width.toString()
        document.getElementById('yPosition').min = '0'
        document.getElementById('yPosition').max = active.constant.windows.height.toString()
        windowEdgeThickness = 25;
        active.constant.windows.canvas.width = active.constant.windows.width - active.constant.windows.edgeThickness;
        active.constant.windows.canvas.height = active.constant.windows.height - active.constant.windows.edgeThickness;
        active.context.ctx.fillStyle = "#faffcb";
        active.context.ctx.fill()
        active.context.ctx.fillRect( 0 , 0 , active.constant.windows.width , active.constant.windows.height );
    },
    
    /* 
        MainWindow()
        
        Turns on the main menu and creates the background.
        The canvas is then appended to the body.
    
    */
    append() {
        active.options.draw.turnOnMenu()
        active.create.background()
        document.body.appendChild(active.constant.windows.canvas);
	
    },
    /* 
    clear()
    
    Places a clear rectangle with size of the window height and width.
    
    */
    clear: function() {
        active.context.ctx.clearRect(0, 0, active.constant.windows.width, active.constant.windows.height);
    },
    
    /* 
        initialize()
    
        Initializes the mouse, window, and object array.
    */
    initialize: function(){
        active.create.clear() 
        active.userinfo.mouse.reset() 
        active.object.edit.reset(active.constant.object.information)
        active.create.append()
    }
}