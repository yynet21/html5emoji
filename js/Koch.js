function  Koch(lev,points,objects){
  this.objects=objects;
  this.level; this.num;
  
  this.outerpoints = [];
  this.midpoints = [];
  this.myKoch = [];
  _maxLevels=4;
  _numSides=3;
      this.level =lev;
      //this.num =n;
      this.outerpoints =points;

      if ((this.level+1)<_maxLevels){
      this.midpoints = this.calcMidpoints();
		//console.log(this.midpoints.length);
       for (var i=0;i<_numSides+1;i++){
			var a =[];
           if (i===0)  {  a[0]=this.outerpoints[0];a[1]=this.midpoints[0];}
           else if (i===_numSides){ a[0]=this.midpoints[_numSides-1];a[1]=this.outerpoints[1];}
           else { a[0]=this.midpoints[i-1]; a[1]=this.midpoints[i];}

           this.myKoch.push(new Koch(this.level+1, a,objects));
       }

    }
    this.drawMe();
}

Koch.prototype.static = function(v){  
    if(typeof(arguments.callee.v) == 'undefined'){  
        arguments.callee.v = false;      // このfalseがデフォルト値。  
    }  
    if(typeof(v) != 'undefined'){  
        arguments.callee.v = v;  
    }  
  
    return arguments.callee.v;  
}  

  Koch.prototype.calcMidpoints= function () {
     var mpArray =[];
    // console.log(this.outerpoints);
     var mid1 =(this.outerpoints[1].sub(this.outerpoints[0])).scale(0.3);
     var mid2 =(this.outerpoints[1].sub(this.outerpoints[0])).scale(0.4);
     for (var i = 0; i < _numSides; i++) {
       if (i===0){mpArray[0]=this.outerpoints[0].add(mid1);}
       else if (i===1){mpArray[1]=mpArray[0].add(mid2.rotateZ((_numSides-2)*Math.PI/_numSides));}//
       else  {         mpArray[i]=mpArray[i-1].add(mid2.rotateZ((_numSides-2)*Math.PI/_numSides-(i-1)*2*Math.PI/_numSides));
      }
     }
		//console.dir(mpArray);
     return mpArray;
  }


 Koch.prototype.drawMe= function () {

    if (this.level==3){
      //var size=10*Math.pow(2,3-this.level);
     /* var geometry = new THREE.CubeGeometry(size,size,size);
      var material = new THREE.MeshBasicMaterial({
    color : "#"+("000000"+Math.floor(Math.random() * 0xFFFFFF).toString(16)).slice(-6),
    wireframe : random(2) >= 1
});
  cube = new THREE.Mesh( geometry,  material);
  //var x=(this.outerpoints[0].x+this.outerpoints[1].x)/2;
  //var y=(this.outerpoints[0].y+this.outerpoints[1].y)/2;*/
 var geometry = new THREE.Geometry();

    //頂点座標の追加
    geometry.vertices.push( new THREE.Vector3( this.outerpoints[0].x, this.outerpoints[0].y, 0)  ); 
    geometry.vertices.push( new THREE.Vector3( this.outerpoints[1].x, this.outerpoints[1].y, 0)  ); 

    //線オブジェクトの生成	
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) );

  //cube.position.set(x, y, camera.position.z-500);
  this.objects.add(line);		
   }/*
   for (var k = 0; k < this.myKoch.length; k++) {
       this.myKoch[k].drawMe();

     }*/

}
