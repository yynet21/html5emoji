function MusicPlayP(id,status){
this.status=[];
 this.status["load"]=status[2]||status[0];//よくないかも
 this.status["error"]=status[3]||"Error!";
 this.status[0]=status[0];
 this.status[1]=status[1];
 // 0 pause 1  2 3
 this.id=id[0];//html id

 this.num=0;
 this.time=getElapsed();
 this.time("p");
 this.statusid=-1;//-1 み再生　０　再生　１　停止　２一時停止
 this.audioContext = new AudioContext();
 this.analyser = this.audioContext.createAnalyser();
 this.spectrums =[];
 this.data;
 this.flag=false;
 var self =this;
 document.getElementById(this.id).innerHTML=this.status[0];
 document.getElementById(this.id).addEventListener('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	self.click();
});
document.getElementById(id[1]).addEventListener('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	self.reset();
});
 //再生　Loading 一時停止　
}
MusicPlayP.prototype.init=function(){
     this.source = this.audioContext.createBufferSource();
     //bufferプロパティにAudioBufferインスタンスを設定
     this.source.buffer = this.data;
     //ループ
     this.source.loop = false;
     //AudioBufferSourceNodeインスタンスをdestinationプロパティに接続
     this.source.connect(this.audioContext.destination);
     this.source.connect(this.analyser);
     //GainNodeを作成する
     this.gainNode = this.audioContext.createGain();
     //sourceをGainNodeへ接続する
     this.source.connect(this.gainNode);
     //GainNodeをAudioDestinationNodeに接続
     this.gainNode.connect(this.audioContext.destination);
     this.gainNode.gain.value = 1;
     this.source.start = this.source.start || this.source.noteOn;
     this.source.stop  = this.source.stop  || this.source.noteOff;
}
MusicPlayP.prototype.add=function(f){
  var self=this;//草
 if (self.statusid>0)self.flag=true;
 self.text();

   //console.log("dfgb"+selkf.status);
   //updateonLoad();
   var successCallback =function(data){
     self.data=data;
     self.analyser.fftSize =2048;
     self.spectrums = new Uint8Array(self.analyser.frequencyBinCount);
     self.statusid=0;
      //self.init();
     self.text();
     self.num+=1;
   };

   var errorCallback = function(){
     self.statusid=-2;

   };
  self.audioContext.decodeAudioData(f, successCallback,errorCallback);

}

MusicPlayP.prototype.remove=function(){
 //今再生リストに曲を削除する
 this.num-=1;
 return 0;
}

MusicPlayP.prototype.num=function(){
 //今再生リストに何曲あるかを返す
 return this.num;
}
MusicPlayP.prototype.now=function(){
 //何番目の曲を再生しているか返す
 return 0;
}
MusicPlayP.prototype.s=function(){
//再生状態を返す
if (this.statusid===1){return true;}
else {return false;}
}
MusicPlayP.prototype.text=function(){
  //console.log(this.statusid);
       if (this.statusid===-2){  document.getElementById(this.id).innerHTML=this.status.error;}
  else if (this.statusid===-1){  document.getElementById(this.id).innerHTML=this.status.load;}
  else if (this.statusid===0){  document.getElementById(this.id).innerHTML=this.status[0];}
  else if (this.statusid===1){ document.getElementById(this.id).innerHTML=this.status[1];}
  else if (this.statusid===2){  document.getElementById(this.id).innerHTML=this.status[0];}
}
MusicPlayP.prototype.render=function(){
  this.analyser.getByteFrequencyData(this.spectrums);
}

MusicPlayP.prototype.click=function(){
 if (this.flag){this.flag =false;this.reset();}
 if (this.statusid===0)this.play();
 else if (this.statusid===1)this.pause();
 else if (this.statusid===2)this.replay();
 this.text();
}
MusicPlayP.prototype.play=function(){
 this.init();
 if (ObjectP.video.v){ObjectP.video.v.currentTime=this.time();ObjectP.video.v.play();}
 this.source.start(0);
 this.time("r");
// ObjectP.lyrics.forEach(function(e){e.init();});

 this.statusid=1;//0->1
}
MusicPlayP.prototype.pause=function(){
 this.time("p");
 if (ObjectP.video.v){ObjectP.video.v.pause();}
this.source.stop(0);
 this.statusid=2;//1->2

}

MusicPlayP.prototype.replay=function(){
 this.time("r");
 var tmp=this.time("get");
 //console.log(tmp);
 this.init();
 this.source.start(0,this.time());
 //ObjectP.object.forEach(function(e){e.update(tmp);});
 this.statusid=1;//2->1
 if (ObjectP.video.v){ObjectP.video.v.currentTime=this.time();ObjectP.video.v.play();}
}

MusicPlayP.prototype.reset=function(){
  console.log(this.time);
  this.time=getElapsed();
 this.time("p");
 //this.time=-1;
 this.source.stop(0);
 this.statusid=0;//2->0 or1->0
  this.text();
   if (ObjectP.video.v){ObjectP.video.v.currentTime = 0; ObjectP.video.v.pause();}
}
