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
            var mu = active.constant.numbers.G*object[i][1]*object[j][1]
            var xDif = ( object[i][3] + incX ) - object[j][3]
            var yDif = ( object[i][4] + incY ) - object[j][4]
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
            }
            object[i][7] += -mu*fx/object[i][1]
            object[i][8] += -mu*fy/object[i][1]
            object[j][7] += mu*fx/object[j][1]
            object[j][8] += mu*fy/object[j][1]
        },
        
        slope:function(ax,ay,k,i) {
            active.RK4.Array.kvx[k+1] = ax
            active.RK4.Array.kvy[k+1] = ay
            active.RK4.Array.krx[k+1] = active.constant.object.information[i][5]*active.RK4.Array.kvx[k]*active.RK4.Array.coefficent[k]
            active.RK4.Array.kry[k+1] = active.constant.object.information[i][6]*active.RK4.Array.kvy[k]*active.RK4.Array.coefficent[k]
        },
        
        update:function(i){
            active.constant.object.information[i][7] = 0
            active.constant.object.information[i][8] = 0
            for(l=0;l<active.RK4.Array.fcoefficent.length;l++){
                active.constant.object.information[i][5] += active.RK4.Array.fcoefficent[l]*active.RK4.Array.kvx[l+1]
                active.constant.object.information[i][6] += active.RK4.Array.fcoefficent[l]*active.RK4.Array.kvy[l+1]
                active.constant.object.information[i][3] += active.RK4.Array.fcoefficent[l]*active.RK4.Array.krx[l+1]
                active.constant.object.information[i][4] += active.RK4.Array.fcoefficent[l]*active.RK4.Array.kry[l+1]
            }
        }
    }
}