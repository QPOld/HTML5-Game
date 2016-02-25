/* 
    SubFi - 2016
    Michael Parkinson
    
*/

active.method = {
    /* number of \ mass \ radius \ x \ y \ vx \ vy \ ax \ ay
           0 		 1 	     2	   3   4    5    6    7    8 
           
           
      RK method is really close.
      
      possible fixes:
      
      store all k values for all objects then perform update loop
      redo code line by line search for problem. IE the forces must be way too large 
      get 2body to work.
      
      create 5 x N k arrays one for each particle update at end
    */
    VelocityVerlet:{
        acc:function(object,i,j,k,temp) {
            // make sure the objects are in the screen.!
            var xOne = object[i][3] - active.constant.object.centerofmass[0]
            var yOne = object[i][4] - active.constant.object.centerofmass[1]
            var xTwo = object[j][3] - active.constant.object.centerofmass[0]
            var yTwo = object[j][4] - active.constant.object.centerofmass[1]
            var mu = active.constant.numbers.G*object[i][1]*object[j][1]
            var xDif = xOne - xTwo
            var yDif = yOne - yTwo
            var magnitude = Math.pow( ( Math.pow( xDif , 2 ) + Math.pow( yDif , 2 ) ), 3/2 )
            var separation = Math.pow( ( Math.pow( xDif , 2 ) + Math.pow( yDif , 2 ) ), 1/2 )
            var maxRadius = object[i][2]+object[j][2]
            if( separation > 0 && separation > maxRadius ){
                var fx = ( xDif ) / magnitude
                var fy = ( yDif ) / magnitude
            }else {
                var fx = 0
                var fy = 0
            }
            if(temp){
                object[i][9] += -mu*fx/object[i][1]
                object[i][10] += -mu*fy/object[i][1]
                object[j][9] += mu*fx/object[j][1]
                object[j][10] += mu*fy/object[j][1]
            }else {
                object[i][7] += -mu*fx/object[i][1]
                object[i][8] += -mu*fy/object[i][1]
                object[j][7] += mu*fx/object[j][1]
                object[j][8] += mu*fy/object[j][1]
            }
            
        },
        
        reset:function(){
            for(var i = 1; i < active.constant.object.information.length; i++){
                active.constant.object.information[i][7] = 0
                active.constant.object.information[i][8] = 0
                active.constant.object.information[i][9] = 0
                active.constant.object.information[i][10] = 0
            }
        }
    },
    RK4:{
        
        acc:function(object,i,j,k) {
            // make sure the objects are in the screen.!
            var xOne = object[i][3]// - active.constant.object.centerofmass[0]
            var yOne = object[i][4]// - active.constant.object.centerofmass[1]
            var xTwo = object[j][3]// - active.constant.object.centerofmass[0]
            var yTwo = object[j][4]// - active.constant.object.centerofmass[1]
            // console.log(x,y)
            var mu = active.constant.numbers.G*object[i][1]*object[j][1]
            var xDif = xOne - xTwo
            var yDif = yOne - yTwo
            var magnitude = Math.pow( ( Math.pow( xDif , 2 ) + Math.pow( yDif , 2 ) ), 3/2 )
            var maxRadius = object[i][2]+object[j][2]
            if( magnitude > 0 && magnitude > maxRadius ){
                var fx = ( xDif ) / maxRadius
                var fy = ( yDif ) / maxRadius
            }else if(magnitude > 0 && magnitude <= maxRadius) { // interior forces. setting to zero for now may change later
                if(object[i][2] > object[j][2]){
                    var fx = ( xDif ) / object[i][2]
                    var fx = ( yDif ) / object[i][2]
                }else {
                    var fx = ( xDif ) / object[j][2]
                    var fx = ( yDif ) / object[j][2]
                }
            }else{
                var fx = 0
                var fy = 0
            }
            active.constant.RK4.kax[k] += -mu*fx/object[i][1]
            active.constant.RK4.kay[k] += -mu*fy/object[i][1]
            // console.log(active.constant.RK4.kax,active.constant.RK4.kay,i,j,k)
            object[j][7] += mu*fx/object[j][1]
            object[j][8] += mu*fy/object[j][1]
        },
        
        slope:function(k,i) {
            active.constant.RK4.kax[k+1] = active.constant.RK4.kax[k]
            active.constant.RK4.kay[k+1] = active.constant.RK4.kay[k]
            active.constant.RK4.kvx[k+1] = active.constant.object.information[i][5] + active.constant.RK4.kax[k]*active.constant.RK4.coefficent()[k]
            active.constant.RK4.kvy[k+1] = active.constant.object.information[i][6] + active.constant.RK4.kay[k]*active.constant.RK4.coefficent()[k]
            active.constant.RK4.krx[k+1] = active.constant.object.information[i][3] + active.constant.RK4.kvx[k]*active.constant.RK4.coefficent()[k]
            active.constant.RK4.kry[k+1] = active.constant.object.information[i][4] + active.constant.RK4.kvy[k]*active.constant.RK4.coefficent()[k]
        },
        update:function(i){
            var rx = active.constant.object.information[i][3]//-= active.constant.object.centerofmass[0]
            var ry = active.constant.object.information[i][4]//-= active.constant.object.centerofmass[1]
            var vx = active.constant.object.information[i][5]
            var vy = active.constant.object.information[i][6]

            for(var k=0;k<4;k++){
                // console.log(active.constant.RK4.kvx[k],active.constant.RK4.matrix()[k])
                active.constant.RK4.kxy[0] += active.constant.RK4.kvx[k]*active.constant.RK4.matrix()[k]
                active.constant.RK4.kxy[1] += active.constant.RK4.kvy[k]*active.constant.RK4.matrix()[k]
                active.constant.RK4.kxy[2] += active.constant.RK4.kax[k]*active.constant.RK4.matrix()[k]
                active.constant.RK4.kxy[3] += active.constant.RK4.kay[k]*active.constant.RK4.matrix()[k]
            }
            active.constant.object.information[i][3] = rx + active.constant.RK4.kxy[0]// + active.constant.object.centerofmass[0]
            console.log(active.constant.object.information[i])
            active.constant.object.information[i][4] = ry + active.constant.RK4.kxy[1]// + active.constant.object.centerofmass[0]
            active.constant.object.information[i][5] = vx + active.constant.RK4.kxy[2]
            active.constant.object.information[i][6] = vy + active.constant.RK4.kxy[3]
            //getting nan left off here
        },
        
        /* 
            active.method.RK4.reset()
            Reset the k arrays for the rk4 method.
        */
        reset:function(i){
            active.constant.RK4.krx = [0,0,0,0,0] // 0 , krx1, krx2, krx3, krx4
            active.constant.RK4.kry = [0,0,0,0,0]
            active.constant.RK4.kvx = [0,0,0,0,0] // 1, kvx1, kvx2, kvx3, kvx4 
            active.constant.RK4.kvy = [0,0,0,0,0]
            active.constant.RK4.kax = [0,0,0,0,0]
            active.constant.RK4.kay = [0,0,0,0,0]
            active.constant.RK4.kxy = [0,0,0,0,0]
            active.constant.object.information[i][7] = 0
            active.constant.object.information[i][8] = 0
            active.constant.object.information[i][9] = 0
            active.constant.object.information[i][10] = 0
        }
    }
}