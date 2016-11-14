function House(x,y,z){
  this.x=x;
  this.y=y;
  this.z=z;
  this.offset =random(5);
  this.height=random(5,100);
  this.geometry = new THREE.CubeGeometry(5,this.height,5);
  this.material = new THREE.MeshBasicMaterial({
    color : "#"+("000000"+Math.floor(Math.random() * 0xFFFFFF).toString(16)).slice(-6),
    wireframe : random(2) >= 1
});
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.set(x, y+this.height/2, z);
  //this.cube.rotation.y=random(2*Math.PI);
  scene.add(this.cube);

}

House.prototype.draw=function(){
  //this.cube.rotation.y+=0.01;
  //this.cube.rotation.x+=0.01;
  var scale =1*noise(frameCount*0.01+this.offset)+1;
  this.cube.scale.y=scale;
  this.cube.position.y=this.y+this.height*scale/2;

  //this.cube.scale.y=1+Math.random(1)*0.08;

}
