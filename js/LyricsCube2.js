function LyricsCube(table,z){
    this.z=z;
    this.size=4;
    this.pos=[];
    this.v=[];
    this.mesh=[];
    // 空のジオメトリを作成

      this.geometry = new THREE.Geometry();
      //this.cubeItem = new THREE.CubeGeometry(this.size, this.size, this.size, 1, 1, 1);
      this.cubeItem=new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3));
      // マテリアルを作成
      this.material = new THREE.MeshBasicMaterial({color:"#000"});
      // Box
    //  console.log(this.table[0].length+"ghjkl;:");
 
      for (var i = 0;i < table.length; i++) {
          for (var j=0;j<table[i].length;j++){
            if (table[i][j]===1){
              var xx=(this.size+0)*(-table[i].length/2+j);
              var yy=(this.size+0)*(table.length-i);
              this.pos.push({x:xx,y:yy});
              var v={x:random(10,100),y:random(100,500),z:random(0,800)};
              this.v.push(v);
            //  this.a.push({x:xx,y:yy});
              this.cubeItem.position.x=xx-v.x;
              this.cubeItem.position.y=yy-v.z;
              this.cubeItem.position.z=this.z;
              this.geometry.mergeMesh(this.cubeItem);
              //spush({x:3,y:4});
          }
            // ジオメトリを結合

          //  THREE.GeometryUtils.merge(geometry2, meshItem);
        }
      }

 // var mesh = new THREE.Mesh(this.geometry, this.material);
  //scene.add(mesh)
}

LyricsCube.prototype.draw=function(s,time){
  time=time-3;
  //console.log(time);
  
  this.geometry=new THREE.Geometry();
  for (var i=0;i<this.pos.length;i++){
    this.cubeItem.scale.set(1,1,1);
    this.cubeItem.position.x=this.pos[i].x+this.v[i].x*time;
    this.cubeItem.position.y=this.pos[i].y+this.v[i].x*time;
    this.cubeItem.position.z=this.pos[i].z+time*this.v[i].z;
    this.geometry.mergeMesh(this.cubeItem);
  }
  var mesh = new THREE.Mesh(this.geometry, this.material);
  //scene.add(mesh);
  //console.log(this.pos.length);
}
LyricsCube.prototype.update=function(z){
  this.geometry=new THREE.Geometry();
  for (var i=0;i<this.pos.length;i++){
    this.pos[i].z+=z;
    //this.cubeItem.scale.set(0.01,0.01,0.01);
    this.cubeItem.position.z=this.pos[i].z;
    this.geometry.mergeMesh(this.cubeItem);
  }
  //var mesh = new THREE.Mesh(this.geometry, this.material);
  //scene.add(mesh);
}
