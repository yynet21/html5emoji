/*高い保守性　可用性を目指す*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(cb) {setTimeout(cb, 17);};
var ObjectP={lyrics:[],music:new MusicPlayP(["pauseB","resetB"],["  再　生　","一時停止","Loading"]),image:[],video:[],object:[],time:[],pixi:[]};
ObjectP.pixi.obj=[];
init();
//animate();
function init(){
InputFiles("files",function() {
    if(this.type.match('video.*')){

    }
    else if (this.type.match('text.*')||this.name.slice(-4)===".lrc"||this.name.slice(-4)===".kar"){
      var reader=new FileReader();
      reader.onload = function(e){
         ObjectP.lyrics.push(new LyricsToTextT(e.target.result));//ObjectP.lyrics=new LyricsToTextT(e.target.result))でもいいかも
         ObjectP.lyrics.addpixi();
      }
      reader.readAsArrayBuffer(this);
    }
    else if(this.type.match('video.*')){

    }
    else if(this.type.match('audio.*')){
      var reader=new FileReader();
      reader.onload = function(e){
        ObjectP.music.add(e.target.result);
        ObjectP.music.addpixi();
      }
      reader.readAsArrayBuffer(this);
    }
  }
);
var res=getCSV("data/sample.csv");
//console.log(res);

    /*kokokara pixi js*/
    ObjectP.pixi.width = 1280;
    ObjectP.pixi.height = 800;

    // ステージを作る
  //  ObjectP.pixi.stage = new PIXI.Stage(0x66FF99);
    //ObjectP.pixi.stage  = new PIXI.Container();

    // レンダラーを作る
    ObjectP.pixi.renderer = PIXI.autoDetectRenderer(ObjectP.pixi.width, ObjectP.pixi.height);

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


    ObjectP.music["addpixi"]=function(){

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
              console.log(ObjectP.music.spectrums[0]);
    },function(a){

      var container = new PIXI.Container();

      for (var i=0;i<a[0];i++){
          var color =Math.random()*0xFFFFFF;
          var tmp=new PIXI.Graphics();
          a[1].push(tmp);
          a[2].push(color);
          ObjectP.pixi.stage.addChild(tmp);
      }

      }]) );

    }

    ObjectP.pixi["draw"]= function (){
      for (var i=0;i<ObjectP.pixi.textobj.length;i++){
      //  ObjectP.pixi.textobj[i].x=step2(ObjectP.pixi.width*1,ObjectP.pixi.width*(-0.5),ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start,ObjectP.music.time()-ObjectP.lyrics[0].l[i].start,11);
        ObjectP.pixi.textobj[i].y=step2(ObjectP.pixi.height*1.1,ObjectP.pixi.height*(-0.1),ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start,ObjectP.music.time()-ObjectP.lyrics[0].l[i].start,11);
        //tmp.position.y=ObjectP.pixi.height/2;
        //if ()
      }
      ObjectP.pixi.renderer.render(ObjectP.pixi.stage);
      //console.log(ObjectP.pixi.textobj.length,"jl");
    }
    ObjectP.lyrics["addpixi"]=function(){
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
        ObjectP.pixi.strimage.push(new StringtoImage(ObjectP.lyrics[0].l[i].lyrics,30));
      }



/*
      ObjectP.pixi.obj.push(new CirclePP(ObjectP.music.time,[ObjectP.pixi.width,ObjectP.pixi.height],[function (a){

        a[0].position.x =a[2].p.x;
        a[0].position.y =a[2].p.y;
    },function(a){
      //console.log(a);
        var tmp=new PIXI.Graphics().beginFill(a[1],0.7).drawCircle(a[2].p.x,a[2].p.y,a[3]).endFill();
        a[0].push(tmp);
        ObjectP.pixi.stage.addChild(tmp);
      }]) );


      var tmp =ObjectP.pixi.obj[ObjectP.pixi.obj.length-1];

      tmp.srandom(false);
      for (var i=0;i<ObjectP.pixi.strimage.length;i++){
            var to=[];
            to=ObjectP.pixi.strimage[i].getrandom(tmp.amount);
            tmp.setf([to],[ObjectP.lyrics[0].l[i].end-ObjectP.lyrics[0].l[i].start]);
      }
  //    tmp.flag=true;*/




  }
}
// アニメーション関数を定義する

    requestAnimationFrame(animate);
function animate(){
    requestAnimationFrame(animate); // 次の描画タイミングでanimateを呼び出す
   // 描画する
    //console.log(typeof ObjectP.lyrics[0]==="undefined");

//console.log(ObjectP.music.time());



  if (ObjectP.music.s())ObjectP.music.render();
  if (ObjectP.music.s())ObjectP.pixi.obj.forEach(function (e){e.update();});
  if (ObjectP.lyrics[0]&&ObjectP.music.s())ObjectP.pixi.draw();
 ObjectP.pixi.renderer.render(ObjectP.pixi.stage);
 //console.log(ObjectP.music.analyser);
}
