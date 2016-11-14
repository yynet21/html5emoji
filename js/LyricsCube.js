function LyricsCube(table){
    this.size=4;
    this.pos=[];
    this.v=[];
    this.mesh=[];
    // 空のジオメトリを作成

      var geometry2 = new THREE.CubeGeometry(this.size, this.size, this.size, 1, 1, 1);
      // マテリアルを作成
      // Box
    //  console.log(this.table[0].length+"ghjkl;:");
      for (var i = 0;i < table.length; i++) {
          for (var j=0;j<table[i].length;j++){
            if (table[i][j]===1){
     var c="rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")" ;
      var material = new THREE.MeshBasicMaterial({color:c});
               var cube=new THREE.Mesh(geometry2, material);
              var xx=(this.size+0)*(-table[i].length/2+j);
              var yy=(this.size+0)*(table.length-i);
              this.pos.push({x:xx,y:yy});
              var v={x:random(10,100),y:random(100,500),z:random(0,800)};
              this.v.push(v);
            //  this.a.push({x:xx,y:yy});
            cube.position.set(xx-v.x,yy-v.y,-1000);

              //spush({x:3,y:4});
              this.mesh.push(cube);
          }
            // ジオメトリを結合

          //  THREE.GeometryUtils.merge(geometry2, meshItem);
        }
      }

}

LyricsCube.prototype.draw=function(s,time){
  time-=3;
  for (var i=0;i<this.mesh.length;i++){
    this.mesh[i].scale.set(1,1,1);
    this.mesh[i].position.set(this.pos[i].x+this.v[i].x*time,this.pos[i].y+this.v[i].x*time,this.pos[i].z+time*this.v[i].z);
  //  console.log(this.pos[i].x,this.pos[i].z);
  }
}
LyricsCube.prototype.init=function(z){
  for (var i=0;i<this.mesh.length;i++){
    this.mesh[i].position.z+=z;
    this.pos[i].z=this.mesh[i].position.z;
    this.mesh[i].scale.set(0.01,0.01,0.01);
    scene.add(this.mesh[i]);

    //console.log("hjk");

  }
}

LyricsCube.prototype.update=function(z){
  //for (var i=0;i<this.mesh.length;i++){
    //this.mesh[i].position.z+=z;
    //this.pos[i].z=this.mesh[i].position.z;
  //}
}