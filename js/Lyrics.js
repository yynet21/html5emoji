function Lyrics(time,lyrics){
  var fontsize=128;
  this.size=20;
  this.time=time;
  this.lyrics=lyrics;
  this.z=-this.time*100-200;
  this.flag=true;
  //this.ctx.measureText(this.lyrics).width;
  var lyricsText = new createjs.Text(this.lyrics, fontsize+"px ヒラギノ角ゴ Pro W3", "#00F");
  // Canvas 要素としてレンダリングさせる
  this.i=(this.lyrics.length<2)?1 : 1<<((this.lyrics.length-1).toString(2).length);
  lyricsText.cache(0, 0, fontsize*this.i, fontsize);

  var imagecanvas = document.createElement('canvas');
  var    imagectx = imagecanvas.getContext('2d');
  imagecanvas.width=(this.lyrics.length===0)? 1:this.lyrics.length*fontsize;
  imagecanvas.height=fontsize;
  imagectx.font=fontsize+"px ヒラギノ角ゴ Pro W3";
  imagectx.textBaseline = "top";

  this.width_offset =this.size*(this.i-imagectx.measureText(this.lyrics).width/fontsize)/2;

  var table =[];
  //this.cube=[];
  this.scale =[];
  if (this.lyrics.length){
    fontsize=20;
    imagecanvas.width=imagectx.measureText(this.lyrics).width*20/128;
    imagecanvas.height=fontsize;
    imagectx.font=fontsize+"px ヒラギノ角ゴ Pro W3";
    imagectx.textBaseline = "top";
    imagectx.fillText(this.lyrics, 0, 0);
    imgdata = imagectx.getImageData(0, 0, imagecanvas.width, imagecanvas.height);
    for (var i=0;i<imagecanvas.height;i++){
        table[i]=[];
        for (var j=0;j<imagecanvas.width;j++){
          var alpha = imgdata.data[(imagecanvas.width * i + j) * 4 + 3];
          table[i][j]=(alpha>100)?1:0;
          //console.log("i="+i+"j="+j,alpha);
        }
        //console.log("i="+i);
    }
    //console.log(this.table);
    this.cube=new LyricsCube(table,this.z);
    // 空のジオメトリを作成


  }
  //this.height_offset =strHeight(this.lyrics,this.fontStyle);console.log(this.height_offset+"wfe");
  // Three.js のテクスチャに展開する(GPU にアップロードする)
  //console.log(imagecanvas.height,imagecanvas.width);
  var texture = new THREE.Texture(lyricsText.cacheCanvas);
  //var loader = new THREE.TextureLoader();
  //var texture = loader.load(imagecanvas);
  //var texture =new THREE.ImageUtils.TextureLoader(imagecanvas);
  texture.needsUpdate = true;

  // 平面を作成する
  var geometry = new THREE.PlaneBufferGeometry(this.size*this.i, this.size);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  // メッシュオブジェクトを作成し、3D空間に追加する
  this.lyricsO = new THREE.Mesh(geometry, material);
  this.lyricsO.position.set(this.width_offset, this.size/2, this.z);
  //scene.add(this.lyricsO);
  //console.log("sdfghjkl");

}

Lyrics.prototype.draw=function(){
  var time=mp.time()-(this.time-1);
  if (0<=time&&this.flag&&typeof this.cube!=="undefined"){
    this.cube.init(this.z+mp.time("get")*-100);
    //console.log(this.z);
    var t = new TimelineMax({repeat: -1});
    t.to(this.lyricsO.position, 3.0,{z:this.z+mp.time("get")*-100-500} );
    t.addCallback(function () {
    // 0.1倍速再生にする(スローモーションとなる)
    t.timeScale(0.1);
    //console.log("fghjkl");
  }, 1.5);
  // 本来のタイムラインの0.50秒の地点まで到達したら
  t.addCallback(function () {
    // 1.0倍速再生にする(通常再生速度となる)
    t.timeScale(1.0);
  }, 2.0);
    this.flag=false;
  }
  if (time<0 || 3<time)return;
  var s =step(0.01,1.5,3,time,2);

  //console.log(this.lyricsO.position.z);
  this.lyricsO.scale.set(s,s,1);
  this.lyricsO.position.set(this.width_offset*s,this.size/2*s,this.lyricsO.position.z);
  if (typeof this.cube!=="undefined")this.cube.draw(s,Math.min(time,3));
}
Lyrics.prototype.init=function(z){
  this.z+=z;
  this.lyricsO.position.z=this.z;
  var s=0.01;
  this.lyricsO.scale.set(s,s,1);
  scene.add(this.lyricsO);
}

Lyrics.prototype.update=function(z){
  //this.z+=z;
  this.lyricsO.position.z=this.z+mp.time("get")*-100;
  //if (typeof this.cube!=="undefined")this.cube.update(z);
}
function strHeight(str,fontStyle) {
  var e = $("#ruler");
  e.css({font: fontStyle});
  var height = e.text(str).get(0).offsetHeight;
  e.empty();
  return height;
}
