/*let LyricsToText = require('./LyricsToText');
let MusicPlayP = require('./MusicPlayP');
let getElapsed = require('./getElapsed');
let Stats = require('./stats.min');
let cos= require('./mathtool').cos;
let sin = require('./mathtool').sin;
let random = require('./mathtool').random;
let step = require('./mathtool').step;
let step2 = require('./mathtool').step2;
let mod = require('./mathtool').mod;

let PIXI = require('pixi.js');
*/
if (typeof main == 'undefined') { var main = {};}
init();
animate();
function init(){
main={  width:1280,
        height:800,
        canvas:[document.getElementById("mycanvas"),document.getElementById('myview')],//今回はもともと用意してあるcanvasにpixiを導入する
        stage:new PIXI.Graphics(),
        pview:[document.getElementById("canvasview"),document.getElementById("pixiview")],
        stats:[],
        draw:[],
        action:null,
        music:{main:new MusicPlayP(),lyrics:[],time:null,status:0,flg:false},
        event:null,
        time:[getElapsed()]
};


for (let i=main.pview.length-1;i<main.pview.length;i++){
  main.stats[i]= new Stats();
  main.stats[i].setMode( 0 ); // 0: fps, 1: ms, 2: mb
  main.stats[i].domElement.style.position = "absolute";
  main.stats[i].domElement.style.left     = "5px";
  main.stats[i].domElement.style.top      = `${600+200*i}px`;
  main.pview[i].appendChild(main.stats[i].domElement);
}

main.time[1]=main.music.main.time;

main.event=(action,id,fn)=>{
  document.getElementById(id).addEventListener(action,(e)=>{
      fn.call(e,id);
  }, false);
};

main.action=function (action,id,fn){
  document.getElementById(id).addEventListener(action,function (e){
      for (var i = 0, f; f = e.target.files[i]; i++){
          fn.call(f,id);//汎用性が高くなるコードs
        }}, false)};

for (let i=0;i<main.canvas.length;i++){
  main.canvas[i].width=main.width;
  main.canvas[i].height=main.height;
}

main.ctx=main.canvas[0].getContext('2d');

main.renderer=PIXI.autoDetectRenderer(main.width, main.height,{view: main.canvas[1],antialias:true,backgroundColor: 0x171d35}),

main.pview[1].appendChild(main.renderer.view);

main.music.time=getElapsed();
main.music.time("p");

main.action("change","files",function() {
  console.log(this.type);
    let reader=new FileReader();
    if (this.type.match('text.*')||this.name.slice(-4)===".lrc"||this.name.slice(-4)===".kar"){
      reader.onload = function(e){
         main.music.lyrics.push(new LyricsToText(e.target.result));

         main.draw.push({
           play:function(){

             this.init();
             this.flg=true;
           },
           reset:function(){
             this.flg=false;
           },
           init:function(){
             this.flg=false;
             this.MM=main.music.lyrics[0];
             this.W=main.canvas[1].width/2;
             this.H=main.canvas[1].height/2;
             this.amount=this.MM.l.length;
             this.size=20;
             this.obj=[];
             let style = {font:'bold 20pt Arial'};

             for (let i=0;i<this.amount;i++){
                 this.obj[i]={};
                 this.obj[i].col=Math.random()*0xFFFFFF;
                 this.obj[i].rand=Math.random();
                 this.obj[i].main = new PIXI.Graphics().beginFill(this.obj[i].col,1).drawRect(0,0,this.size,this.size).endFill();
                 this.obj[i].main.position.x=this.W*0.2;
                 this.obj[i].main.position.y=(0.2+0.3*(i%3))*this.H*2;

                 this.obj[i].text=new PIXI.Text(this.MM.l[i].lyrics, style);
                 this.obj[i].text.style.fill=`rgb(${random(256)|0},${random(256)|0},${random(256)|0})`;//"#ffffff";//;
                 this.obj[i].text.position.x=this.W;
                 this.obj[i].text.position.y=this.obj[i].main.position.y;
                 this.obj[i].text.anchor.x=0.5;
                 this.obj[i].text.anchor.y=0.5;
                 let h=10;
                 this.obj[i].rect = new PIXI.Graphics().beginFill(this.obj[i].col,1).drawRect(0,0,this.obj[i].text.width*1.2,h).endFill();
                 //this.obj[i].rect.anchor.x=0;
                 this.obj[i].rect.position.x=this.obj[i].text.position.x-this.obj[i].text.width*0.6;
                 this.obj[i].rect.position.y=this.obj[i].text.position.y+this.obj[i].text.height*0.6;
                 this.obj[i].rect2 = new PIXI.Graphics().beginFill(0xFFFFFF,1).drawRect(0,0,this.obj[i].text.width*1.4,this.obj[i].text.height*1.6).endFill();
                 //this.obj[i].rect.anchor.x=0;
                 this.obj[i].rect2.position.x=this.obj[i].text.position.x-this.obj[i].text.width*0.7;
                 this.obj[i].rect2.position.y=this.obj[i].text.position.y-this.obj[i].text.height*0.65;

                 main.stage.addChild(this.obj[i].rect2);
                 main.stage.addChild(this.obj[i].main);
                 main.stage.addChild(this.obj[i].text);
                 main.stage.addChild(this.obj[i].rect);

            }

         },draw:function(){
           if (!this.flg)return ;//未定義だったら戻る
          let k=this.MM.l;
          let time=main.time[1]();
           for (let i=0;i<k.length;i++){
              if (1.1*k[i].start-0.1*k[i].end<time && time<1.2*k[i].end-0.2*k[i].start){
                //this.obj[i].main.visible=true;
                this.obj[i].text.visible=true;
                this.obj[i].rect.visible=true;
                this.obj[i].rect2.visible=true;
                this.obj[i].main.alpha=  0.7+0.3*sin(this.obj[i].rand+main.frameCount/180);
                this.obj[i].text.alpha=  (time>k[i].end)?1:0.7+0.3*sin(this.obj[i].rand+main.frameCount/180);
                this.obj[i].rect.scale.x=  step2(0,1,k[i].end-k[i].start,time-k[i].start,2);
              }
              else{
                this.obj[i].main.visible=false;
                this.obj[i].text.visible=false;
                this.obj[i].rect.visible=false;
                this.obj[i].rect2.visible=false;
              }
           }

         }


         });

      }
      reader.readAsArrayBuffer(this);
    }
    else if(this.type.match('audio.*')||this.type.match('video.*')){
      reader.onload = function(e){
         main.music.main.add(reader.result);
         main.music.status=1;
         main.addpixi();
         //main.draw.push({draw:null
         //console.log(main.music.main);

         //});
       }
      reader.readAsArrayBuffer(this);
    }
});

main.event("click","pauseB",function(id) {
  //console.log(id);
  if (main.music.status>=1){
      //if (main.music.status>=2)main.music.main.changevolume(0.1);


      console.log(main.time[0](),main.time[1]());
      let y=[2,2,3,4,3];
      let xx=["init","reset","play","pause","replay"];
      let display=["Loading",""," 再　生 ","一時停止"," 再　生 "];
      let tmp=y[main.music.status];
      document.getElementById(id).innerHTML=display[y[tmp]];
      main.music.status=tmp;
      //console.log(y[tmp]);
      main.draw.forEach(function (e){  (e[xx[tmp]])?e[xx[tmp]]():null     });
      if (main.music.main[xx[tmp]]){ main.music.main[xx[tmp]](); };
  }
});

main.event("click","resetB",function() {
  if (main.music.status>=1){

    let y=[1,1,1,1,1];
    let xx=["init","reset","play","pause","replay"];
    document.getElementById("pauseB").innerHTML=" 再　生 ";
    let tmp=y[main.music.status];
    main.music.status=tmp;
    main.draw.forEach(function (e){if (e[xx[tmp]]) e[xx[tmp]]   });
    if (main.music.main[xx[tmp]]){ main.music.main[xx[tmp]](); };
    main.time[1]=main.music.main.time;

  }
});


class Illmination{
  constructor(arg){
    for (let i in arg){
      this[i]=arg[i];
    }
    this["cons"]();
  }
}

main.draw=[
{draw:()=>{
  main.ctx.fillStyle="#000000";
  main.ctx.fillRect(0,0,main.width,main.height);
}},

new Illmination({visible:true,cons:function (){
  this.W=main.canvas[1].width/2;
  this.H=main.canvas[1].height/2;
  this.size=90;
  this.obj=[];
//  this.background=new PIXI.Graphics().beginFill(0xFF0000,1).drawRect(0,0,this.W*2,this.H*2).endFill();
  for (let i=0;i<this.W*2;i+=this.size){
    let tmp=new PIXI.Graphics().lineStyle(2,0xFFFFFF).moveTo(0,0).lineTo(0,this.H*2);
    tmp.position.x=i;
    this.obj.push({main:tmp,x:i});
  }
  for (let i=0;i<this.H*2;i+=this.size){
    let tmp=new PIXI.Graphics().lineStyle(2,0xFFFFFF).moveTo(0,0).lineTo(this.W*2,0);
    tmp.position.y=i;
    this.obj.push({main:tmp,y:i});
  }

},init:function(){
//  main.stage.addChild(this.background);
  for (let i=0;i<this.obj.length;i++){
    main.stage.addChild(this.obj[i].main);
  }
}
,draw:function (){
//  if (main.frameCount%4!==0)return;
  for (let i=0;i<this.obj.length;i++){
    if (typeof this.obj[i].x!=="undefined")this.obj[i].main.position.x = this.obj[i].x+(main.frameCount*0.1)%this.size;
    if (typeof this.obj[i].y!=="undefined")this.obj[i].main.position.y = this.obj[i].y+(main.time[0]())%this.size;
    //console.log(this.obj[i].main.position);
  }
} }),


new Illmination({visible:true,cons:function (){
  let  lightimage = PIXI.Texture.fromImage("img/circle0.png");
  this.W=main.canvas[1].width/2;
  this.H=main.canvas[1].height/2;
  this.size=60;
  this.obj=[];
  this.v={x:0,y:105};
  this.space={x:200,y:90};
  this.amount={x:Math.ceil(this.W*2/this.space.x),y:Math.ceil(this.H*2/this.space.y)};
  for (let i=0;i<=this.amount.x;i++){
    for (let j=0;j<=this.amount.y;j++){
    //  let col=`rgb(${(random(2)|0)*256},${(random(2)|0)*256},${(random(2)|0)*256})`;
    //  let col=(random(2)|0)*0xFF0000+(random(2)|0)*0x00FF00+(random(2)|0)*0x0000FF;
    //let col=0xFFFFF;
    let col=0xc8db4a;
      let tmp=new PIXI.Sprite(lightimage);
      tmp.tint =col;
      tmp.scale.x=random(0.5,3);
      tmp.scale.y=tmp.scale.x;
      //tmp.position.x=i*this.space.x;
      //tmp.position.y=j*this.space.y;
      tmp.blendMode = PIXI.BLEND_MODES.ADD;
      tmp.position.x=random(this.W*2);
      tmp.position.y=random(this.H*2);

      this.obj.push({main:tmp,x:tmp.position.x,y:tmp.position.y,offset:Math.random()});
    }
  }

},init:function(){
//  main.stage.addChild(this.background);
  for (let i=0;i<this.obj.length;i++){
    main.stage.addChild(this.obj[i].main);
  }
}
,draw:function (){
//  if (main.frameCount%4!==0)return;
  for (let i=0;i<this.obj.length;i++){
    this.obj[i].main.position.x = (this.obj[i].x+(main.time[0]()*this.v.x))%(this.space.x*this.amount.x)-this.space.x/2;
    this.obj[i].main.position.y = (this.obj[i].y+(main.time[0]()*this.v.y))%(this.space.y*this.amount.y)-this.space.y/2;
    this.obj[i].main.alpha =  0.7+0.3*sin(this.obj[i].offset+main.frameCount/180);
  //  console.log("ok");
  }
} })

];


main.addpixi=function(){

  main.draw.push({
   visible:true,
   name:"72音階",
    play:function(){
      this.init();
      this.flg=true;
    },

    pause:function(){
      this.flg=false;
    },
    replay:function(){
      this.flg=true;
    },
    reset:function(){
      this.flg=false;
    },
    init:function(){
      this.flg=false;
      this.W=main.canvas[1].width/2;
      this.H=main.canvas[1].height/2;
      this.obj=[];
      this.size={x:5,y:10};
      this.amount=256;
      this.time=0;
      this.bpmoffset=main.music.main.bpmoffset;
      this.playtime=main.music.main.time;
      this.duration =main.music.main.duration();
      this.tmpvec=[];
      this.octave=12*6;
      for (let i=0;i<this.octave;i++){
        this.tmpvec[i]=0;
      }
      for (let i=0;i<this.amount;i++){
        this.obj[i]=[];
        for (let j=0;j<this.octave;j++){
          this.obj[i][j]={};
          this.obj[i][j].main = new PIXI.Graphics().beginFill(0xFFFFFF,1).drawRect(0,0,this.size.x,this.size.y).endFill();
          this.obj[i][j].main.position.x=this.W-this.size.x*this.amount/2+i*this.size.x;
          this.obj[i][j].main.position.y=this.H-this.size.y*this.octave/2+j*this.size.y;
         main.stage.addChild(this.obj[i][j].main);
        }
     }
  //       let tmp=new PIXI.Graphics().lineStyle(2,0xFFFFFF).moveTo(0,0).lineTo(0,this.H*2);
     this.line = new PIXI.Graphics().lineStyle(1,0xFF0000).moveTo(0,this.H-this.octave/2*this.size.y).lineTo(0,this.H+this.octave/2*this.size.y);
     this.circle = new PIXI.Graphics().beginFill(114514,1).drawCircle(this.W*1.5,this.H*0.2,30,30).endFill();
    var sty = {fontStyle:'bold 20pt Arial',fill:0xFFFF00};
    this.text=new PIXI.Text("BPM:"+Math.round(60/this.bpmoffset[0][0])+" or "+Math.round(60/this.bpmoffset[1][0]), sty);
    this.text.position.x=this.W*1.3;
    this.text.position.y=this.H*0.5;
     main.stage.addChild(this.line);
     main.stage.addChild(this.circle);
     main.stage.addChild(this.text);
     for (var i=0;i<6;i++){
      let line = new PIXI.Graphics().lineStyle(1,0x000000).moveTo(this.W-this.size.x*this.amount/2,this.H-this.size.y*this.octave/2+12*i*this.size.y).lineTo(this.W+this.size.x*this.amount/2,this.H-this.size.y*this.octave/2+12*i*this.size.y);
     main.stage.addChild(line);
       
     }
    this.bline=[];
    for (let i=0;i<(2*this.duration/this.bpmoffset[0][0])|0;i++){
      this.bline[i]={};
      this.bline[i].main= new PIXI.Graphics().lineStyle(1,(i%2===0)?0xFF0000:0xFFFFFF).moveTo(0,this.H-this.octave/2*this.size.y).lineTo(0,this.H+this.octave/2*this.size.y);
      this.bline[i].time=this.bpmoffset[0][1]+0.5*i*this.bpmoffset[0][0];
    //  if (i%2===1)this.bline[i].main.tint=0xFFFFFF;
      this.bline[i].flg=false;
      this.bline[i].main.visible=false;
      main.stage.addChild(this.bline[i].main);
       
     }

  },draw:function(){
    if (main.frameCount%2!=0)return;
    if (!this.flg)return ;//未定義だったら戻る
    
   let x=   main.music.main.vecAll();
   x=x.reverse();
  // console.log(x);
  let ptime=this.playtime();
  this.time++;
  let ttime=mod(this.time,this.amount);
   //let x=main.m
    for (let i=0;i<x.length;i++){

        // this.obj[this.time][i].main.tint= (1+256+256*256)* ((x[i]*256)|0);
         //let tmp=((x[i]*10)|0)/10;
        let tmp=(x[i]*255)|0;
        //let tmp=(128*(1-5*x[i]+5*this.tmpvec[i]))|0;
        //if (tmp>128)tmp=127;
       if (tmp<0)tmp=0;
        this.obj[ttime][i].main.tint= 0x010000*tmp+0x000001*(255-tmp);
        if (x[i]===1){
         this.obj[ttime][i].main.tint= 0x00FF00;
         }
         else if (x[i]>0.5){
         this.obj[ttime][i].main.tint= 0xFFFF00;
         }    
         else if (tmp===128){
        this.obj[ttime][i].main.tint=0;

         }
    }
    //15/bpm 秒における音量レベルの変化がわかると面白いかも　急激に変化した場合は音の始まり終わりを示すので
  //  console.log(0x000001* main.music.main.spectrums[0]*600,this.obj[0][0].main.tint);
  this.line.position.x=this.obj[ttime][0].main.position.x+this.size.x/2;
  for (let i=0;i<this.bline.length;i++){
     if (!this.bline[i].flg  && ptime>this.bline[i].time){
       this.bline[i].flg=true;
       this.bline[i].count=this.time;
       this.bline[i].main.position.x=this.obj[ttime][0].main.position.x;
       this.bline[i].main.visible=true;
     }
     if (this.bline[i].flg  && this.time>this.bline[i].count+this.amount){this.bline[i].main.visible=false;}
  }
  this.circle.alpha=1*Math.pow(cos(((this.playtime()-this.bpmoffset[0][1])%(this.bpmoffset[0][0])/2)/this.bpmoffset[0][0] ),3);
  //this.circle.scale.y=1.5+0.5*cos(((this.playtime()-this.bpmoffset[0][1])%(2*this.bpmoffset[0][0]))/this.bpmoffset[0][0]/2 );
  for (let i=0;i<x.length;i++){
    this.tmpvec[i]=x[i];
  }

  }


  });


  
  
 
  main.draw.push({
    visible:false,
    name:"12音階",
    play:function(){
      this.init();
      this.flg=true;
    },

    pause:function(){
      this.flg=false;
    },
    replay:function(){
      this.flg=true;
    },
    reset:function(){
      this.flg=false;
    },
    init:function(){
      this.flg=false;
      this.W=main.canvas[1].width/2;
      this.H=main.canvas[1].height/2;
      this.obj=[];
      this.size={x:5,y:10};
      this.amount=256;
      this.time=0;
      this.bpmoffset=main.music.main.bpmoffset;
      this.playtime=main.music.main.time;
      this.duration =main.music.main.duration();
      this.tmpvec=[];
      for (let i=0;i<12;i++){
        this.tmpvec[i]=0;
      }
      for (let i=0;i<this.amount;i++){
        this.obj[i]=[];
        for (let j=0;j<12;j++){
          this.obj[i][j]={};
          this.obj[i][j].main = new PIXI.Graphics().beginFill(0xFFFFFF,1).drawRect(0,0,this.size.x,this.size.y).endFill();
          this.obj[i][j].main.position.x=this.W-this.size.x*this.amount/2+i*this.size.x;
          this.obj[i][j].main.position.y=this.H-this.size.y*6+j*this.size.y;
         main.stage.addChild(this.obj[i][j].main);
        }
     }
  //       let tmp=new PIXI.Graphics().lineStyle(2,0xFFFFFF).moveTo(0,0).lineTo(0,this.H*2);
     this.line = new PIXI.Graphics().lineStyle(1,0xFF0000).moveTo(0,this.H-6*this.size.y).lineTo(0,this.H+6*this.size.y);
     this.circle = new PIXI.Graphics().beginFill(114514,1).drawCircle(this.W*1.5,this.H*0.2,30,30).endFill();
    var sty = {fontStyle:'bold 20pt Arial',fill:0xFFFF00};
    this.text=new PIXI.Text("BPM:"+Math.round(60/this.bpmoffset[0][0])+" or "+Math.round(60/this.bpmoffset[1][0]), sty);
    this.text.position.x=this.W*1.3;
    this.text.position.y=this.H*0.5;
     main.stage.addChild(this.line);
     main.stage.addChild(this.circle);
     main.stage.addChild(this.text);
    this.bline=[];
    for (let i=0;i<(2*this.duration/this.bpmoffset[0][0])|0;i++){
      this.bline[i]={};
      this.bline[i].main= new PIXI.Graphics().lineStyle(1,(i%2===0)?0xFF0000:0xFFFFFF).moveTo(0,this.H-6*this.size.y).lineTo(0,this.H+6*this.size.y);
      this.bline[i].time=this.bpmoffset[0][1]+0.5*i*this.bpmoffset[0][0];
    //  if (i%2===1)this.bline[i].main.tint=0xFFFFFF;
      this.bline[i].flg=false;
      this.bline[i].main.visible=false;
      main.stage.addChild(this.bline[i].main);
       
     }

  },draw:function(){
   // if (main.frameCount%10!=0)return;
    if (!this.flg)return ;//未定義だったら戻る
    
   let x=   main.music.main.vec12();
   x=x.reverse();
  // console.log(x);
  let ptime=this.playtime();
  this.time++;
  let ttime=mod(this.time,this.amount);
   //let x=main.m
    for (let i=0;i<x.length;i++){

        // this.obj[this.time][i].main.tint= (1+256+256*256)* ((x[i]*256)|0);
         //let tmp=((x[i]*10)|0)/10;
        let tmp=(x[i]*255)|0;
       // let tmp=(128*(1-5*x[i]+5*this.tmpvec[i]))|0;
       // if (tmp>128)tmp=127;
       // if (tmp<0)tmp=0;
        this.obj[ttime][i].main.tint= 0x010000*tmp+0x000001*(255-tmp);
        if (x[i]===1){
        // this.obj[ttime][i].main.tint= 0x00FF00;
         }
         else if (x[i]>0.5){
        // this.obj[ttime][i].main.tint= 0xFFFF00;
         }    
         else if (tmp===128){
       // this.obj[ttime][i].main.tint=0;

         }
    }
    //15/bpm 秒における音量レベルの変化がわかると面白いかも　急激に変化した場合は音の始まり終わりを示すので
  //  console.log(0x000001* main.music.main.spectrums[0]*600,this.obj[0][0].main.tint);
  this.line.position.x=this.obj[ttime][0].main.position.x+this.size.x/2;
  for (let i=0;i<this.bline.length;i++){
     if (!this.bline[i].flg  && ptime>this.bline[i].time){
       this.bline[i].flg=true;
       this.bline[i].count=this.time;
       this.bline[i].main.position.x=this.obj[ttime][0].main.position.x;
       this.bline[i].main.visible=true;
     }
     if (this.bline[i].flg  && this.time>this.bline[i].count+this.amount){this.bline[i].main.visible=false;}
  }
  this.circle.alpha=1*Math.pow(cos(((this.playtime()-this.bpmoffset[0][1])%(this.bpmoffset[0][0])/2)/this.bpmoffset[0][0] ),3);
  //this.circle.scale.y=1.5+0.5*cos(((this.playtime()-this.bpmoffset[0][1])%(2*this.bpmoffset[0][0]))/this.bpmoffset[0][0]/2 );
  for (let i=0;i<x.length;i++){
    this.tmpvec[i]=x[i];
  }

  }


  });
   for(let i=main.draw.length-1;i>=0;i--){
    if (main.draw[i].visible===false){
      main.draw.splice(i,1);
    }
  }
  
  
}

  //そもそも今回表示したくないものは関数自体に入れないという神仕様 visible :falseのみ有効！
  //削除はデクリメントループを使う
  for(let i=main.draw.length-1;i>=0;i--){
    if (main.draw[i].visible===false){
      main.draw.splice(i,1);
    }
  }
  main.draw.forEach(function (e){if (e.init) e.init();});
  console.log(main.draw.length);
}

function animate(){
  main.frameCount=requestAnimationFrame(animate);
  main.draw.forEach(function (e){if (e.draw)e.draw();});
  main.renderer.render(main.stage);
  main.stats.forEach(function (e){if (e.update)e.update();});
}
