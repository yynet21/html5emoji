function  KochP(x,y,z) {
  this.pointArr=[];
  this.pointArr[0] =new Point3D(x-100,y,z);
  this.pointArr[1] =new Point3D(x+100,y,z);
  this.objects = new THREE.Group();
  this.rootFractal;
  this.rootFractal = new Koch(0,this.pointArr,this.objects);
  //this.init();
  scene.add(this.objects);
}
  KochP.prototype.draw = function (){
    this.objects.position.z=camera.position.z-500;
  }
