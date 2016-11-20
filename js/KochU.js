function  KochU(arg) {
//  arg.p,arg.point,arg.calcpoint,arg.draw,arg.maxlevel,arg.
  this.pointArr=[];
  this.pointArr[0] =new Point3D(x-100,y,z);
  this.pointArr[1] =new Point3D(x+100,y,z);
  this._maxLevels=4;
  this._numSides=3;

  this.objects = new THREE.Group();
  //this.rootFractal = new Koch(0,this.pointArr,this.objects);
  this.init(0,this.pointArr);
  scene.add(this.objects);
}
  KochS.prototype.draw = function (){
    this.objects.position.z=camera.position.z-500;
  }
  KochS.prototype.init =function(lev,points){
  this.level; this.num;
  this.outerpoints = [];
  this.midpoints = [];
  this.myKoch = [];
  this.outerpoints =points;

  if ((lev+1)<this._maxLevels){
    this.midpoints = this.calcMidpoints();
       for (var i=0;i<_numSides+1;i++){
          var a =[];
          if (i===0)  {  a[0]=this.outerpoints[0];a[1]=this.midpoints[0];}
          else if (i===_numSides){ a[0]=this.midpoints[_numSides-1];a[1]=this.outerpoints[1];}
          else { a[0]=this.midpoints[i-1]; a[1]=this.midpoints[i];}
           this.myKoch.push(new Koch(lev+1, a));
       }

    }
  if (lev+1===this._maxLevels)this.set();
}



  KochS.prototype.calcMidpoints= function () {
     var mpArray =[];
     var mid1 =(this.outerpoints[1].sub(this.outerpoints[0])).scale(0.3);
     var mid2 =(this.outerpoints[1].sub(this.outerpoints[0])).scale(0.4);
     for (var i = 0; i < _numSides; i++) {
       if (i===0){mpArray[0]=this.outerpoints[0].add(mid1);}
       else if (i===1){mpArray[1]=mpArray[0].add(mid2.rotateZ((_numSides-2)*Math.PI/_numSides));}//
       else  {         mpArray[i]=mpArray[i-1].add(mid2.rotateZ((_numSides-2)*Math.PI/_numSides-(i-1)*2*Math.PI/_numSides));
      }
     }
	    return mpArray;
  }


 KochS.prototype.set= function () {

    if (this.level==3){
    var geometry = new THREE.Geometry();

    //頂点座標の追加
    geometry.vertices.push( new THREE.Vector3( this.outerpoints[0].x, this.outerpoints[0].y, camera.position.z)  );
    geometry.vertices.push( new THREE.Vector3( this.outerpoints[1].x, this.outerpoints[1].y, camera.position.z)  );

    //線オブジェクトの生成
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) );

  this.objects.add(line);
   }
}
