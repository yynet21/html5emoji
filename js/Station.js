function Station(name,pos){
  this.x=pos[0];
  this.y=10;
  this.z=pos[1];
  this.name=name;
// CreateJS のテキストを作成
var stationText = new createjs.Text(this.name, "128px ヒラギノ角ゴ Pro W3", "#00F");
// Canvas 要素としてレンダリングさせる
  this.i=(this.name.length<2)?1 : 1<<((this.name.length-1).toString(2).length);
  stationText.cache(0, 0, 128*this.i, 128);

// Three.js のテクスチャに展開する(GPU にアップロードする)
var texture = new THREE.Texture(stationText.cacheCanvas);
texture.needsUpdate = true;

// 平面を作成する
this.geometry = new THREE.PlaneBufferGeometry(this.y*2*this.i, this.y*2);
this.material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  side: THREE.DoubleSide
});

// メッシュオブジェクトを作成し、3D空間に追加する
this.station = new THREE.Mesh(this.geometry, this.material);
this.station.position.set(this.x+this.y*this.i, this.y, this.z);
scene.add(this.station);

console.log(this.name,this.name.length,this.z);
}

Station.prototype.draw=function(){
  /*animationするときに必要*/
  var s=step(0,10,900,frameCount,2);
  //s=100;
  this.station.scale.set(s,s,1);
  //console.log(s);

  this.station.position.set(this.x+this.y*this.i*s, s*this.y, this.z);

}
