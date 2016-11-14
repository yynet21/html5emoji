function CubeU(x,y,z){
  this.x=x;
  this.y=y;
  this.z=z;
  this.offset =random(5);
  this.size={x:random(10,50)|0,y:random(10,50)|0,z:random(10,50)|0};
  this.geometry = new THREE.CubeGeometry(this.size.x,this.size.y,this.size.z);
  var color = new THREE.Color();
  color.setHSL(random(1), 0.80, 0.50);
  this.material = new THREE.MeshBasicMaterial({
    //color : "#"+("000000"+Math.floor(Math.random() * 0xFFFFFF).toString(16)).slice(-6),
    color: color,
  //  wireframe : random(2) >= 1,
    opacity:0.9,
    side: THREE.DoubleSide,
    transparent:true
    //metal:true
});
/*
  var light = new THREE.PointLight(color, random(1),1000,1);//強さ　距離　減衰
  light.position.set(x, y, z);
//  light.intensity = random(1);
  light.shadowCameraVisible = true;
  light.castShadow = true;
  scene.add(light);*/
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.set(x, y, z);
  //this.cube.rotation.y=random(2*Math.PI);
  //this.cube.castShadow = true;
  scene.add(this.cube);
  this.cube.rotation.x=random(1);
  this.cube.rotation.y=random(1);
  this.cube.rotation.z=random(1);

}

CubeU.prototype.draw=function(){
  //this.cube.rotation.y+=0.01;
  //this.cube.rotation.x+=0.01;
  //var scale =1*noise(frameCount*0.01+this.offset)+1;
  //this.cube.scale.y=scale;
//  this.cube.position.z=this.z+camera.position.z;

  //this.cube.scale.y=1+Math.random(1)*0.08;

}
