function Television(x,y,z,src,idx,idy,sx,sy){
  this.x=x;
  this.y=y;
  this.z=z;
  this.offset =random(5);
  var texture =new THREE.VideoTexture(src);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

  this.geometry = new THREE.PlaneBufferGeometry(src.width/3, src.height/3);
    this.material = new THREE.MeshPhongMaterial({
     // color:"#000000",
      map: texture,
     // blending: (random(2)>1)?THREE.NormalBlending:THREE.NormalBlending,
      transparent: true
    });
  /*var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0,  0, 0));
  geometry.vertices.push(new THREE.Vector3(src.width/2.1,0, 0));
  geometry.vertices.push(new THREE.Vector3(src.width/2.1,src.height/2.1,  0, 0));
  geometry.vertices.push(new THREE.Vector3( 0, src.width/2.1, 0));
  geometry.faces.push(new THREE.Face3(0, 1, 2, new THREE.Vector3( 0,  0, 1)));
  geometry.faces.push(new THREE.Face3(0, 2, 3, new THREE.Vector3( 0,  0, 1)));

  console.log(geometry);
  geometry.faceVertexUvs[0].push([
   (0.0, 0.0),
   (1.0, 0.0),
   (1.0, 1.0)
 ]);

 geometry.faceVertexUvs[1].push([
  (0.0, 0.0),
  (1.0, 1.0),
  (0.0, 1.0)
]);*/
  //this.material.map.needsUpdate = true;

  this.tv = new THREE.Mesh(this.geometry, this.material);
  if (typeof idx!=="undefined" &&typeof sx!=="undefined" && typeof idy!=="undefined" &&typeof sy!=="undefined"){
  var attr = this.tv.geometry.getAttribute('uv');
  attr.array[0]=idx;
  attr.array[2]=idx+sx;
  attr.array[4]=idx;
  attr.array[6]=idx+sx;
  attr.array[1]=idy+sy;
  attr.array[3]=idy+sy;
  attr.array[5]=idy;
  attr.array[7]=idy;
}
  this.tv.position.set(x, y, z);
  //this.cube.rotation.y=random(2*Math.PI);
  scene.add(this.tv);

}

Television.prototype.draw=function(){
  //this.cube.rotation.y+=0.01;
  //this.cube.rotation.x+=0.01;
  //var scale =1*noise(frameCount*0.01+this.offset)+1;
  var s=(this.offset+_t())%6;
  this.tv.rotation.y=5*Math.PI*2/360*Math.min(s,6-s);
  this.tv.position.z=camera.position.z+this.z+0.0*this.z*noise(_t()*0.03+this.offset);

  //this.cube.scale.y=1+Math.random(1)*0.08;

}
