 window.AudioContext = window.AudioContext || window.webkitAudioContext;
 function MusicPlayP(){
  this.num=0;
  this.time=-1;
  this.status="　再 生　";
  this.statusid=-1;
  this.audioContext = new AudioContext();
  this.analyser = this.audioContext.createAnalyser();
  this.data;
  this.flag=false;
  //this.tmp=0;
  //var source,gainNode,spectrums;
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
      //this.source.start(0);
      this.num=1;
}
MusicPlayP.prototype.add=function(file){
   var reader= new FileReader();
  if (this.statusid>0)this.flag=true;
  this.status="Loading";
  $("#pauseB").text(this.status);
  var self=this;//草
  reader.progress =updateProgress;
  reader.onloadstart =updateonLoadS;
  
	reader.onload = function(ev){
    //console.log("dfgb"+selkf.status);
    updateonLoad();    
		var successCallback =function(data){
      self.data=data;
			self.analyser.fftSize =2048;
			self.spectrums = new Uint8Array(self.analyser.frequencyBinCount);
      self.statusid=0;
      self.status="　再 生　";
      $("#pauseB").text(self.status);//self.init();
		};

		var errorCallback = function(){
			self.status="Error!";
      $("#pauseB").text(self.status);
		};
      self.audioContext.decodeAudioData(reader.result, successCallback,errorCallback);
	};
	reader.readAsArrayBuffer(file);
 }

MusicPlayP.prototype.remove=function(){
  //今再生リストに曲を削除する
  return 0;
}

MusicPlayP.prototype.num=function(){
  //今再生リストに何曲あるかを返す
  return 0;
}
MusicPlayP.prototype.now=function(){
  //何番目の曲を再生しているか返す
  return 0;
}
MusicPlayP.prototype.flg=function(){
//再生状態を返す
  return this.status;
}
MusicPlayP.prototype.click=function(){
  if (this.flag){this.flag =false;this.reset();}
  if (this.statusid===0)this.play();
  else if (this.statusid===1)this.pause();
  else if (this.statusid===2)this.replay();
  $("#pauseB").text(this.status);
}
MusicPlayP.prototype.play=function(){
  this.init();
  this.source.start(0);
  this.time=getElapsed();
  ObjectL.forEach(function(e){e.init();});
  this.time=getElapsed();
  this.status="一時停止";//0->1
  this.statusid=1;
}


MusicPlayP.prototype.pause=function(){
  this.time("p");
	this.source.stop(0);
	//cancelAnimationFrame(animationId);
  this.status="　再 生　";//1->2
  this.statusid=2;
}

MusicPlayP.prototype.replay=function(){
  this.time("r");
  var tmp=this.time("get");
  console.log(tmp);
  this.init();
	this.source.start(0,this.time());
	//requestAnimationFrame(render);
  ObjectL.forEach(function(e){e.update(tmp);});
  this.status="一時停止";//2->1
  this.statusid=1;
}

MusicPlayP.prototype.reset=function(){
  this.time=-1;
	this.source.stop(0);
	//cancelAnimationFrame(animationId);
  this.status="　再 生　";//2->0 or1->0
  this.statusid=0;
  $("#pauseB").text(this.status);
}
