function Plane(x,y,z){
  this.x=x;
  this.y=y;
  this.z=z;
  
  this.offset =random(5);
  /*this.height=random(5,100);
  this.geometry = new THREE.CubeGeometry(5,this.height,5);
  this.material = new THREE.MeshBasicMaterial({
    color : "#"+("000000"+Math.floor(Math.random() * 0xFFFFFF).toString(16)).slice(-6),
    wireframe : random(2) >= 1
});
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.set(x, y+this.height/2, z);
  //this.cube.rotation.y=random(2*Math.PI);
  scene.add(this.cube);*/
  var geometry = new THREE.CubeGeometry( 4, 6, 4);
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  this.body = new THREE.Mesh( geometry, material );
  geometry = new THREE.SphereGeometry(5);
  material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  this.lhand = new THREE.Mesh( geometry, material );
  this.body.add(this.lhand);
  this.body.position.set(x,y,z);
  scene.add(this.body);
}

Plane.prototype.draw=function(){
  //this.cube.rotation.y+=0.01;
  //this.cube.rotation.x+=0.01;
  //var scale =1*noise(frameCount*0.01+this.offset)+1;
  //this.cube.scale.y=scale;
  var a=_t()+this.offset;
  var b=_t()*0.2+this.offset;
  
  this.lhand.position.x=100*cos(a);
  this.lhand.position.y=100*sin(a)*cos(b);
  this.lhand.position.z=100*sin(a)*sin(b);
  this.body.position.z=camera.position.z-1000*noise(_t()*0.01+this.offset);
   //console.log(this.lhand.position.y);
  //this.cube.scale.y=1+Math.random(1)*0.08;

}
