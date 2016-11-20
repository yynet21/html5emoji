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
 this.timelines =[];
 this.bpmlist =[];
 this.bpmbest=[];
 this.bpmrange=[];
 this.data;
 this.flag=false;
 var self =this;/*
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
});*/
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
MusicPlayP.prototype.duration =function(){ return this.data.duration}
MusicPlayP.prototype.getbpm =function(){ return this.bpmlist}
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
     self.timelines = new Uint8Array(self.analyser.fftSize);
     self.statusid=0;
      //self.init();
     self.text();
     self.num+=1;
     self.measurebpm();//console.log("OK!");
    // xxx(self);
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
  this.analyser.getByteTimeDomainData(this.timelines);
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
 this.source.start(0);
 this.time("r");
// ObjectP.lyrics.forEach(function(e){e.init();});

 this.statusid=1;//0->1
}
MusicPlayP.prototype.pause=function(){
 this.time("p");
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

}

MusicPlayP.prototype.reset=function(){
//  console.log(this.time);
  this.time=getElapsed();
 this.time("p");
 //this.time=-1;
 this.source.stop(0);
 this.statusid=0;//2->0 or1->0
  this.text();

}
MusicPlayP.prototype.setbpmrange= function(){
  //var tmp0=document.getElementById("#minbpm").value||60;
  //var tmp1=document.getElementById("#maxbpm").value||240;
  var tmp0=60, tmp1=240;
  this.bpmrange=[tmp0|0,tmp1|0];
}
MusicPlayP.prototype.measurebpm=function(){
  var self =this;
  console.log();
  //this.init();
	var music_data =this.data.getChannelData(0);
	var music_data2=[],music_data3=[],win=[];
	this.setbpmrange();
	var music_range=[(this.data.length*0.25)|0,(this.data.length*0.75)|0];
	var music_frame=1024;
	var music_set=((music_range[1]-music_range[0])/music_frame)|0;

	for (var i=0;i<music_set;i++){
		var tmp=0;
		for (var j=0;j<music_frame;j++){
			tmp+=music_data[music_range[0]+i*music_frame+j]*music_data[music_range[0]+i*music_frame+j];
		}
		music_data2.push(Math.sqrt(tmp/music_frame));
	}

	for (var i=0;i<music_set-1;i++){
		win[i]=0.5-0.5*Math.cos(2*Math.PI*i/(music_set));
		music_data3[i]=(music_data2[i+1]>music_data2[i])? music_data2[i+1]-music_data2[i]:0;
	}

	for (let i=this.bpmrange[0];i<=this.bpmrange[1];i++){
		var tmp=match_bpm(i);
		this.bpmlist.push(tmp);
	//	console.log(tmp);
	}
	this.bpmbest=this.bpmlist.slice().sort(function(a,b){
      if (a[1]!=b[1])return (b[1]-a[1]);
      else { return (b[0]-a[0]); }
    });
    var x=this.bpmbest[0][1];
	for (var i=0;i<this.bpmlist.length;i++){
		this.bpmlist[i][1]/=x;
	}
  /*
	for (var i=0;i<3;i++){
		if (this.bpmbest[i][2]>0)this.bpmbest[i][2]-=2*Math.PI;
		var tmp=[60/this.bpmbest[i][0],this.bpmbest[i][2]/(2*Math.PI*this.bpmbest[i][0]/60),this.bpmbest[i][1]/this.bpmbest[0][1]];
		this.bpmbest.push(tmp);
	}*/

		function match_bpm(bpm){
			var c_sum=0;
			var s_sum=0;
    //  console.log(self);
			//var n=audioBuffer.getChannelData(0).length;
			var s=self.data.sampleRate*1.0/music_frame;
			for (var i=0;i<music_set-1;i++){
				var dn=music_data3[i];
				c_sum+=dn*Math.cos(2*Math.PI*bpm*i/60/s)*win[i];
				s_sum+=dn*Math.sin(2*Math.PI*bpm*i/60/s)*win[i];
			}
			c_sum/=music_frame;
			s_sum/=music_frame;

			var a=[bpm,Math.sqrt(c_sum*c_sum+s_sum*s_sum),Math.atan(s_sum/c_sum)];
		return a;
	}

	//console.log(this.bpmlist);
}
