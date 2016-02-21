/* 
    SubFi - 2016
    Michael Parkinson
    
*/

active.method = {
    /* number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
           0 		 1 	     2	   3   4    5    6    7    8 
    */
    RK4:{
        
        acc:function(object,i,j,incX,incY) {
            // make sure the objects are in the screen.!
            var xOne = object[i][3] - active.constant.object.centerofmass[0]
            var yOne = object[i][4] - active.constant.object.centerofmass[1]
            var xTwo = object[j][3] - active.constant.object.centerofmass[0]
            var yTwo = object[j][4] - active.constant.object.centerofmass[1]
            // console.log(x,y)
            var mu = active.constant.numbers.G*object[i][1]*object[j][1]
            var xDif = ( xOne + incX ) - xTwo
            var yDif = ( yOne + incY ) - yTwo
            var magnitude = Math.pow( ( Math.pow( xDif , 2 ) + Math.pow( yDif , 2 ) ), 3/2 )
            var maxRadius = object[i][2]+object[j][2]
            if( magnitude <= maxRadius){
                // var fx = ( xDif ) / maxRadius
                // var fy = ( yDif ) / maxRadius
                var fx = 0
                var fy = 0
            }else {
                var fx = ( xDif ) / magnitude
                var fy = ( yDif ) / magnitude
                var force = Math.sqrt( Math.pow(fx,2) + Math.pow(fy,2) )
                // console.log("drawing",object[j][3],object[j][4],100*fx/force+ active.constant.object.centerofmass[0],100*fy/force+ active.constant.object.centerofmass[1])
                active.constant.context.ctx().beginPath();
                active.constant.context.ctx().fillStyle = "#000000";
                active.constant.context.ctx().fill()
                active.constant.context.ctx().moveTo(object[j][3],object[j][4]);
                active.constant.context.ctx().lineTo(100*fx/force+ active.constant.object.centerofmass[0],100*fy/force+ active.constant.object.centerofmass[1]);
                active.constant.context.ctx().lineWidth = 10
                active.constant.context.ctx().stroke();
                active.constant.context.ctx().closePath();
            }
            object[i][7] += mu*fx/object[i][1]
            object[i][8] += mu*fy/object[i][1]
            object[j][7] += mu*fx/object[j][1]
            object[j][8] += mu*fy/object[j][1]
        },
        
        slope:function(ax,ay,k,i) {
            active.constant.RK4.kvx[k+1] = ax
            active.constant.RK4.kvy[k+1] = ay
            active.constant.RK4.krx[k+1] = active.constant.object.information[i][5]*active.constant.RK4.kvx[k]*active.constant.RK4.kcoefficent()[k]
            active.constant.RK4.kry[k+1] = active.constant.object.information[i][6]*active.constant.RK4.kvy[k]*active.constant.RK4.kcoefficent()[k]
        },
        
        update:function(i){
            active.constant.object.information[i][7] = 0
            active.constant.object.information[i][8] = 0
            active.constant.object.information[i][3] -= active.constant.object.centerofmass[0] // rx
            active.constant.object.information[i][4] -= active.constant.object.centerofmass[1] // ry
            // console.log(active.constant.object.information[0][3],active.constant.object.information[0][4],active.constant.object.information[1][3],active.constant.object.information[1][4])
            for(var l=0;l<active.constant.RK4.fcoefficent().length;l++){
                active.constant.object.information[i][5] += active.constant.RK4.fcoefficent()[l]*active.constant.RK4.kvx[l+1] // vx
                active.constant.object.information[i][6] += active.constant.RK4.fcoefficent()[l]*active.constant.RK4.kvy[l+1] // vy
                active.constant.object.information[i][3] += active.constant.RK4.fcoefficent()[l]*active.constant.RK4.krx[l+1] // rx
                active.constant.object.information[i][4] += active.constant.RK4.fcoefficent()[l]*active.constant.RK4.kry[l+1] // ry
            }
            active.constant.object.information[i][3] += active.constant.object.centerofmass[0] // rx
            active.constant.object.information[i][4] += active.constant.object.centerofmass[1] // ry
            // console.log(active.constant.object.information[0][3],active.constant.object.information[0][4],active.constant.object.information[1][3],active.constant.object.information[1][4])
            
        }
    }
}