/*高い保守性　可用性を目指す*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(cb) {setTimeout(cb, 17);};
  var xxx;
var ObjectP={str:[],lyrics:[],music:new MusicPlayP(["pauseB","resetB"],["  再　生　","一時停止"]),image:[],video:[],object:[],time:[],pixi:[]};
ObjectP.pixi.obj=[];
init();
//animate();
function init(){
InputFiles("files",function() {
  console.log(this.type);
     if (this.type.match('text.*')||this.name.slice(-4)===".lrc"||this.name.slice(-4)===".kar"){
      var reader=new FileReader();
      reader.onload = function(e){
         ObjectP.lyrics.push(new LyricsToTextT(e.target.result));//ObjectP.lyrics=new LyricsToTextT(e.target.result))でもいいかも
         //console.log(ObjectP.music);
        if (ObjectP.music.flg){ObjectP.lyrics.addpixi();}

      }
      reader.readAsArrayBuffer(this);
    }
    else if(this.type.match('video.*')){
      var reader=new FileReader();
      reader.onload = function(e){

        ObjectP.music.add(reader.result);
        ObjectP.music.flg=true;
        ObjectP.music.addpixi();
        ObjectP.video.addpixi(reader.result);
      }
      reader.readAsArrayBuffer(this);
    }
     else if(this.type.match('audio.*')||this.type.match('video.*')){
      var reader=new FileReader();
      reader.onload = function(e){

          ObjectP.music.add(reader.result);
          ObjectP.music.addpixi();
        //var x=function (a){

        //    a();
        //}
        //x(a);
      }
      reader.readAsArrayBuffer(this);
    }
  }
);

ClickChange ("pauseB",function(e){
  //e.stopPropagation();
	//e.preventDefault();
  if (ObjectP.music.statusid===1 && ObjectP.video.v){ObjectP.video.v.pause();}
  else if (ObjectP.video.v &&ObjectP.music.statusid>=0){ObjectP.video.v.currentTime=ObjectP.music.time();ObjectP.video.v.play();}
	ObjectP.music.click();
  //console.log(e);
//ObjectP.music.measurebpm();
});
ClickChange ("resetB",function(e){
  //e.stopPropagation();
//	e.preventDefault();
	ObjectP.music.reset();
  if (ObjectP.video.v){ObjectP.video.v.currentTime = 0; ObjectP.video.v.pause();}
});

//var res=getCSV("data/sample.csv");
//console.log(res);

    /*kokokara pixi js*/
    ObjectP.pixi.width = 1280;
    ObjectP.pixi.height = 800;
    ObjectP.pixi.diagonal=Math.sqrt(ObjectP.pixi.width*ObjectP.pixi.width+ObjectP.pixi.height*ObjectP.pixi.height);
    // ステージを作る
  //  ObjectP.pixi.stage = new PIXI.Stage(0x66FF99);
    //ObjectP.pixi.stage  = new PIXI.Container();

    // レンダラーを作る
    var myView = document.getElementById('visualizer');
    ObjectP.pixi.renderer = PIXI.autoDetectRenderer(ObjectP.pixi.width, ObjectP.pixi.height,{view: myView,antialias:true});
  //  ObjectP.pixi.renderer.domElement.id = 'visualizer';

    // レンダラーのviewをDOMに追加する
    document.getElementById("pixiview").appendChild(ObjectP.pixi.renderer.view);
 //document.body.appendChild(ObjectP.pixi.renderer.view);
    ObjectP.pixi.stage = new PIXI.Graphics();//ContainerではなくGraphicsで初期化する
     ObjectP.pixi.stage .beginFill(0x000000,0.0);//完全透明の四角形を作る
     ObjectP.pixi.stage .drawRect(0, 0, ObjectP.pixi.width, ObjectP.pixi.height);//キャンバスと同じサイズ
     ObjectP.pixi.stage .interactive = true;


    ObjectP.time[0]=new getElapsed();
    //console.log(ObjectP.time[0]);
    var tmp=new PIXI.Graphics().beginFill(0xffffff,1).drawRect(0,0,ObjectP.pixi.width,ObjectP.pixi.height).endFill();
  //  a[0].push(tmp);
    ObjectP.pixi.stage.addChild(tmp);
ObjectP.video["addpixi"]=function(f){
  ObjectP.video.v=document.createElement("video");
  //ObjectP.video.v.volume =-1;
 ObjectP.video.v.src = window.URL.createObjectURL(new Blob([f], { type: "video/mp4"}));
  ObjectP.video.v.onloadeddata = function(){

        console.log(f);
          // create a video texture from a path
        var texture = PIXI.Texture.fromVideo(ObjectP.video.v);

        // create a new Sprite using the video texture (yes it's that easy)
        var videoSprite = new PIXI.Sprite(texture);
        var size = 640;
        /*if(Video_src.videoWidth > size){
          var aspectratio = Video_src.videoWidth / size;
          var another = Math.round(Video_src.videoHeight / aspectratio);

          Video_src.width  = size;
          Video_src.height = another;
        }else{
          Video_src.width  = Video_src.videoWidth;
          Video_src.height = Video_src.videoHeight;
        }*/
videoSprite.alpha=0.5;
        videoSprite.width = 1120;
        videoSprite.height = 630;
        videoSprite.position.x=70;

        videoSprite.position.y=70;
  ObjectP.video.v.muted = true;
        ObjectP.pixi.stage.addChild(videoSprite);
        //ObjectP.video.v.play();

        ObjectP.video.v.pause();
  }
}






ObjectP.pixi.obj.push(new FractalRoot(ObjectP.time[0],
     [function (a){
       var k=0;
     for (var i=0;i<a.length;i++){
        for (var j = 0; j < a[i].out.length; j++) {
           var nextj=(j+1)%a[i].out.length;
           this[k].clear();
           this[k].lineStyle(2,0x000000).moveTo(a[i].out[j].x,a[i].out[j].y)
         .lineTo(a[i].out[nextj].x,a[i].out[nextj].y);
          k++;
       }
       for (var j = 0; j < a[i].mid.length; j++) {
         this[k].clear();
         //this[k].lineStyle(2,0x000000).moveTo(a[i].mid[j].x,a[i].mid[j].x)
        // .lineTo(a[i].proj[j].y,a[i].mid[j].y);
         k++;
       }
     }
   },function(a){
       for (var i=0;i<this.length*(this[0].out.length+this[0].mid.length);i++){
         var tmp=new PIXI.Graphics();
          a.push(tmp);
         ObjectP.pixi.stage.addChild(tmp);
       }
     }],{x:ObjectP.pixi.width/2,y:ObjectP.pixi.height/2}) );


  var emo=["💯","🍎","🍍","💢","💉","🍀","❄️"];
//  var emo=["💯","❄️"];

  //"☯"
  for (var i=0;i<emo.length;i++){
  ObjectP.str.push(new StringtoImage(emo[i],200));
  //console.log(emo[i]);
  }
  //ObjectP.str.push(new StringtoImage("✒︎🍍🍎✒︎",100));

  ObjectP.pixi.obj.push(new CirclePP(ObjectP.time[0],[ObjectP.pixi.width,ObjectP.pixi.height],[function (a){
    //console.log(a[0]);
    a[0].clear();
    a[0].beginFill(a[1],1).drawCircle(a[2].p.x,a[2].p.y,a[3]).endFill();
  //  a[0].fillColor=123456;
  //  a[0].beginFill="0x00ff00";
  //  a[0].position.x =a[2].p.x;
    //a[0].position.y =a[2].p.y;
  // console.log(a[0]);
},function(a){
  //console.log(a);
  //var tmp=new PIXI.Graphics().beginFill("0xff0000",1).drawCircle(0,0,a[3]).endFill();
  var tmp=new PIXI.Graphics();
    a[0].push(tmp);
    ObjectP.pixi.stage.addChild(tmp);
  }]) );
 //console.log(ObjectP.pixi.obj.length,ObjectP.str.length,nyaho);

  var tmp =ObjectP.pixi.obj[ObjectP.pixi.obj.length-1];
  tmp.srandom(false);
  for (var i=0;i<ObjectP.str.length;i++){
    var to=[];
  //  console.log(i,ObjectP.str[i]);
    to=ObjectP.str[i].getrandom(tmp.amount,[ObjectP.pixi.width,ObjectP.pixi.height]);
  //  nyaho=ObjectP.str[i].getrandom(tmp.amount);
    tmp.setlist([to],[10]);
  }
//console.log(nyaho);

ObjectP.music.addpixi=function(){

  ObjectP.pixi.obj.push(new Analyzer(ObjectP.music.analyser.fftSize/10,[ObjectP.pixi.width,ObjectP.pixi.height],[function (a){
    //a[0].position.x =a[2].x;
    for (var i=0;i<a[0];i++){
        //var color =Math.random()*0xFFFFFF;
        a[1][i].clear();
        var tmp=ObjectP.music.spectrums[i];
        a[1][i].beginFill(a[2][i],0.7).drawRect(i/a[0]*ObjectP.pixi.width,ObjectP.pixi.height*0.9-tmp,a[4],tmp).endFill();
        //ObjectP.pixi.stage.addChild(tmp);
        //console.log(tmp);
    }
    //a[0].position.y =a[2].y;
          //console.log(ObjectP.music.spectrums[0]);
},function(a){
  for (var i=0;i<a[0];i++){
      var color =Math.random()*0xFFFFFF;
      var tmp=new PIXI.Graphics();
      a[1].push(tmp);
      a[2].push(color);
      ObjectP.pixi.stage.addChild(tmp);
  }

  }]) );


  ObjectP.pixi.obj.push(new TimeLineM({size:(ObjectP.music.analyser.fftSize)|0,width:ObjectP.pixi.width,height:ObjectP.pixi.height,repeat:20},[function (ex,col,size){
        var d=5;
      for (var i=0;i<this.repeat;i++){
        var radius=600/step2(6,0.3,d,(ObjectP.time[0]()+i*d/this.repeat)%d,2);
        var posx=step2(this.width/2,this.width*0.9,d,(ObjectP.time[0]()+i*d/this.repeat)%d,2);
        var posy=step2(this.height/2,this.height*0.8,d,(ObjectP.time[0]()+i*d/this.repeat)%d,3);
        for (var j=0;j<this.size;j++){
          this.value[i][j]=this.value[i][j]*0.9+0.1*ObjectP.music.timelines[j];
          var x=posx+radius/256*this.value[i][j]*Math.cos(j/this.size*2*Math.PI);
          var y=posy+radius/256*this.value[i][j]*Math.sin(j/this.size*2*Math.PI);
          //var x=Math.random()*1000;
          //var y=Math.random()*500;
          ex[i][j].position.x=x;
          ex[i][j].position.y=y;
          //console.log(y,this.height,this.size,this,this.value[i][j]);
        }
    }
},function(ex,col){
    for (var i=0;i<this.repeat;i++){
        col[i]=[];ex[i]=[];
        for (var j=0;j<this.size;j++){
          //col[i].push((i/this.repeat*0xFFFFFF)|0);
          col[i].push((HSL2RGB(i/this.repeat,0.8,0.55)*0xFFFFFF)|0);
          var tmp =new PIXI.Graphics().beginFill(col[i][col[i].length-1],1).drawRect(0,0,3,3).endFill();
          ex[i].push(tmp);
          ObjectP.pixi.stage.addChild(ex[i][ex[i].length-1]);
      }
        //console.log(ex.length);
    }
  }]));



//console.log("hrt",ObjectP.music.bpmlist);


  xxx=function (ev){
    //  ObjectP.pixi.textobj2 =[];
    var h=ObjectP.pixi.height-60;
    var w=ObjectP.pixi.width*0.8;
    var x=ev.bpmrange[1]-ev.bpmrange[0]+1;
    for (var i=0;i<x;i++){
    var col= HSL2RGB(i/x,0.7,0.8)*0xFFFFFF;;
    //console.log(new Date().getTime());
    //var col=noise(new Date().getTime()/10000)*0xFFFFFF;
    //console.log(i,ev.bpmlist[i][1]);
    var tmp=new PIXI.Graphics().beginFill(col,1)
    .drawRect(w/8+i*w/x,h-h*ev.bpmlist[i][1],w/x,h*ev.bpmlist[i][1])
    .endFill();
    ObjectP.pixi.stage.addChild(tmp);
    if (i%10===0){
        var tmp=new PIXI.Text(ev.bpmrange[0]+i,{font:'bold 10pt Arial', fill:'black'} );
          tmp.position.x=w/8+i*w/x;
          tmp.position.y=h+10;

          ObjectP.pixi.stage.addChild(tmp);
    }
  }
}


  //console.log(ObjectP.lyrics[0]);
 if (ObjectP.lyrics[0])ObjectP.lyrics.addpixi();
}

ObjectP.pixi.draw= function (){
  for (var i=0;i<ObjectP.pixi.textobj.length;i++){
  //  ObjectP.pixi.textobj[i].x=step2(ObjectP.pixi.width*1,ObjectP.pixi.width*(-0.5),ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start,ObjectP.music.time()-ObjectP.lyrics[0].l[i].start,11);
    ObjectP.pixi.textobj[i].y=step2(ObjectP.pixi.height*1.1,ObjectP.pixi.height*(-0.1),ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start,ObjectP.music.time()-ObjectP.lyrics[0].l[i].start,11);
    //tmp.position.y=ObjectP.pixi.height/2;
    //if ()
  }
  ObjectP.pixi.renderer.render(ObjectP.pixi.stage);
  //console.log(ObjectP.pixi.textobj.length,"jl");
}
ObjectP.lyrics.addpixi=function(){
  /*色々追加するタスク*/
  // テキストオブジェクトを作る
  //var word = "Hello World!";
 var style = {font:'bold 30pt Arial', fill:'black'};
   ObjectP.pixi.textobj =[];
  ObjectP.pixi.strimage =[];

  for (var i=0;i<ObjectP.lyrics[0].l.length;i++){
    var tmp=new PIXI.Text(ObjectP.lyrics[0].l[i].lyrics, style);
    tmp.anchor.x = 0.5;
    tmp.anchor.y = 0.5;
    tmp.position.x=ObjectP.pixi.width*(0.5);
    tmp.position.y=ObjectP.pixi.height*1.1;
    ObjectP.pixi.textobj.push(tmp);
    ObjectP.pixi.stage.addChild(tmp);
    ObjectP.pixi.strimage.push(new StringtoImage(ObjectP.lyrics[0].l[i].lyrics,20));
  }



  ObjectP.pixi.obj.push(new CirclePP(ObjectP.music.time,[ObjectP.pixi.width,ObjectP.pixi.height],[function (a){
  a[0].clear();
  a[0].beginFill(a[1],1).drawCircle(a[2].p.x,a[2].p.y,a[3]).endFill();
},function(a){
var tmp=new PIXI.Graphics();
  a[0].push(tmp);
  ObjectP.pixi.stage.addChild(tmp);
}],4,1000) );


  var tmp =ObjectP.pixi.obj[ObjectP.pixi.obj.length-1];
  var to=[];
  var a=[];
  for (var i=0;i<ObjectP.pixi.strimage.length;i++){
        to[i]=[];
        to[i]=ObjectP.pixi.strimage[i].getrandom(tmp.amount,[ObjectP.pixi.width,ObjectP.pixi.height]);
        if (ObjectP.pixi.strimage.length-1!==i)a[i]=ObjectP.lyrics[0].l[i+1].start-ObjectP.lyrics[0].l[i].start;
        else{a[i]=ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start;}
  }
  tmp.setlist(to,a);




  }
}
// アニメーション関数を定義する
//var flags=true;
//var frameCount;
    requestAnimationFrame(animate);
function animate(){
    requestAnimationFrame(animate); // 次の描画タイミングでanimateを呼び出す
   // 描画する
    //console.log(typeof ObjectP.lyrics[0]==="undefined");

//console.log(ObjectP.pixi.obj.length);

  if (!ObjectP.video){
//  if (ObjectP.music.s()){ObjectP.video.v.play();}
  //else {ObjectP.video.v.pause();}
}
  if (ObjectP.music.s())ObjectP.music.render();//analyzer配列の更新
  if (ObjectP.music.s())ObjectP.pixi.obj.forEach(function (e){e.update();}); //粒子、analyzer
  if (ObjectP.lyrics[0]&&ObjectP.music.s())ObjectP.pixi.draw();//歌詞
 ObjectP.pixi.renderer.render(ObjectP.pixi.stage);


}
document.getElementById("saveimg").addEventListener('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	saveimg("visualizer");
});
function HSL2RGB(h,s,l){
    // HSLからRGBへの変換公式は見つけれなかった・・・
    let r, g, b;
    if(s == 0) r = g = b = l; // achromatic
    else{
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return Math.round(r * 255)/256+Math.round(g * 255)/256/256+ Math.round(b * 255)/256/256/256;
}
