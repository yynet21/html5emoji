//let getElapsed=require('./getElapsed');
class MusicPlayP{
  constructor(arg){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
     // 0 pause 1  2 3

     this.num=0;
     this.vol=0.4;
     this.audioContext = new AudioContext();
     this.analyser = this.audioContext.createAnalyser();
     this.spectrums =[];
     this.timelines =[];
     this.bpmlist =[];
     this.bpmbest=[];
     this.bpmrange=[];
     this.data;

     let self =this;

     for (let i in arg){ this[i]=arg[i];}
     if (this["cons"])this["cons"]();
     this.time=getElapsed();
     this.time("p");

     this.fch=[];
     this.fch.from=3;
     this.fch.to=9;
     this.fch.bins=12;
      for (let h=0;h<this.fch.to-this.fch.from;h++){
        this.fch[h]=[];
        for (let c=0;c<12;c++){
          this.fch[h][c]=1200*(h+this.fch.from)+100*c;
      }
    }


  }
  init(){
    this.source = this.audioContext.createBufferSource();
    //bufferプロパティにAudioBufferインスタンスを設定
    this.source.buffer = this.data;
    //ループ
    //this.source.playbackRate.value=2;
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
    this.gainNode.gain.value = this.vol;
    this.source.start = this.source.start || this.source.noteOn;
    this.source.stop  = this.source.stop  || this.source.noteOff;

    this.vec=[];
    this.count=[];
    this.logfreq=[];
    let ppp=440*Math.pow(2,3/12-5);
    for (let i=0;i<12;i++){
      this.vec[i]=0;
      this.count[i]=0;
    }
    let size=this.spectrums.length;
    for (let i=1;i<size;i++){
        let tmp=1200*Math.log2(i/size*this.data.sampleRate/2/ppp);
        this.logfreq[i]=tmp;
    }
    //console.log("count",this.count)
    this.vec12flag=true;
    
    this.vecall=[];
    this.countall=[];
    this.vec12ff=true;
    for (let i=0;i<(this.fch.to-this.fch.from)*this.fch.bins;i++){
      this.vecall[i]=0;
      this.countall[i]=0;
    }
    console.log(this.vecall.length);
    
  }
  duration(){ return this.data.duration}
  getbpm(){ return this.bpmlist}
  getTime(){
    return function(){
      return this.audioContext.currentTime-this.pausingTime;
    }
  }
  changevolume(vol){
    this.vol=vol;
    this.gainNode.gain.value = this.vol;
  }
  add(f){
    let self=this;//草
      //self.text();

     //console.log("dfgb"+selkf.status);
     //updateonLoad();
     //再生時間よりも前のデータでサンプルしている可能性が高い　ただし、最初と最後のデータ　とかがわからない->最後はおそらく再生時間内で最後に取られたものをそのまま　データ値が変わらない感じになりそう
     let successCallback =function(data){
       self.data=data;
       self.analyser.fftSize =8192;
       self.analyser.smoothingTimeConstant = 0;
       //self.spectrums = new Uint8Array(self.analyser.frequencyBinCount);
       self.spectrums = new Float32Array(self.analyser.frequencyBinCount);
       self.timelines = new Uint8Array(self.analyser.fftSize);
       self.num+=1;
       self.measurebpm();//console.log("OK!");
       document.getElementById("pauseB").innerHTML="再　生";
       //console.log(self.data.length);

        //   self.offAudiocontext= new OfflineAudioContext (2,self.data.length,self.data.sampleRate);
        //   self.offAudiocontext= new AudioContext ();
       //source2.start();
       	//analyser2.getFloatFrequencyData(spectrums2);
        //var k=10;

        var a=performance.now();
        //console.log(self.bpmbest[0]);
        
        for (var i=self.bpmbest[0][1];i<self.data.duration;i+=15/self.bpmbest[0][0]){
        //  var tmp=self.bpmbest[0][1]+i*60/self.bpmbest[0][0];
          break;
          if (i<0)continue; 
          
          self.ini();
          self.source.start(0,i);
          self.analyser.getFloatFrequencyData(self.spectrums);
          self.source.stop(0);
          //console.log(i,self.spectrums);
        }
        console.log("処理時間:",performance.now()-a);

     };
     let errorCallback = function(){

     };
    self.audioContext.decodeAudioData(f, successCallback,errorCallback);
  }
  remove(){this.num-=1;}
  num(){return this.num;}
  now(){}
   ini(){
 this.source = this.audioContext.createBufferSource();
 this.source.buffer = this.data;
 this.source.loop = false;
 this.source.connect(this.analyser);
   }
  render(){
//    this.analyser.getByteFrequencyData(this.spectrums);

   this.analyser.getFloatFrequencyData(this.spectrums);
    this.analyser.getByteTimeDomainData(this.timelines);
  }
  vec12(){
   this.render();
 
//(this.time()-this.bpmoffset[i][1])%this.bpmoffset[i][0]) 

   // console.log(this.bpmbest);
   var mm={id:0,f:-Infinity}
   for (var i=0;i<this.spectrums.length;i++ ){
     if (mm.f<this.spectrums[i]){
       mm={id:i,f:this.spectrums[i]};
     }
   }
  // console.log(this.time(),this.spectrums);
   //if (Math.random()<0.03)console.log("spec;",this.spectrums);
    for (let i=0;i<12;i++){
      this.vec[i]=0;
      for (let j=1;j<this.spectrums.length;j++){
        for (let h=0;h<this.fch.to-this.fch.from;h++){
          let tmp=this.bpf(this.logfreq[j],h,i);
          //console.log(tmp);
          if (this.vec12flag &&tmp!==false ){this.count[i]+=tmp;}
          if (tmp){
            this.vec[i]+=Math.pow(10,-0+this.spectrums[j]/10)*tmp;//magnitudeなので/10でよい

            //console.log(this.spectrums[j],j,this.logfreq[j],i);
            //this.vec[i]+=Math.pow(2,48+this.spectrums[j])*tmp;
          }
        }
      }
    }
  //  console.log("before:",this.count,this.vec);
    for (let i=0;i<this.vec.length;i++){
      this.vec[i]/=this.count[i];
      //this.vec[i]=Math.log2(this.vec[i])+100;
    }
    //if (Math.random()<0.1)console.log(this.vec);
    let tmp=Math.max(...this.vec);
    this.vec=this.vec.map(a=>a/tmp);
    //this.vec=this.lerp(this.vec,Math.min(...this.vec),Math.max(...this.vec));
    //console.log("after:",this.logfreq,this.vec);
    if (this.vec12flag)this.vec12flag=false;
   // console.log(this.fch);
    return this.vec;
  }
  vecAll(){
   this.render();
      for (let i=0;i<this.vecall.length;i++){
        this.vecall[i]=0;
        for (let j=1;j<this.spectrums.length;j++){
          let tmp=this.bpf(this.logfreq[j],(i/12)|0,i%12);
          if (this.vec12ff &&tmp!==false ){this.countall[i]+=tmp;}
          if (tmp){
            this.vecall[i]+=Math.pow(10,-0+this.spectrums[j]/10)*tmp;//magnitudeなので/10でよい
            //console.log("");
          }
        }
      }
    for (let i=0;i<this.vecall.length;i++){
      this.vecall[i]/=this.countall[i];
    }
    let tmp=Math.max(...this.vecall);
    this.vecall=this.vecall.map(a=>a/tmp);
    if (this.vec12ff)this.vec12ff=false;
    return this.vecall;
  }
  
  bpf(x,h,c){
      if (Math.abs(x-this.fch[h][c])>=100)return false;
      else {
      //  if (this.spectrums[j]>-60)console.log(x,c);
        let tmp= (1/2)*(1-Math.cos(2*Math.PI/200*(x-this.fch[h][c]+100)));
        return tmp
      }
  }
  lerp(a,b,c) {
    let x = [];
    for(var i = 0; i < a.length; i++)
        x.push((a[i]-b)/(c-b));
    return x;
  }
    play(){
    this.time("r");
    this.init();
    this.source.start(0);

  }
  pause(){
    this.time("p");
  	//this.source.stop(0);
    this.audioContext.suspend();

  }
  replay(){
    this.time("r");
   // let tmp=this.time("get");
    //this.init();
    //this.source.start(0,this.time());
      this.audioContext.resume();

  }
  reset(){
    this.time=getElapsed();
   this.time("p");
   //this.time=-1;
   this.source.stop(0);

  }
  setbpmrange(){
    let tmp0=60, tmp1=240;
    this.bpmrange=[tmp0|0,tmp1|0];
  }

  measurebpm(){
      let self =this;
    	let music_data =this.data.getChannelData(0);
    	let music_data2=[],music_data3=[],win=[];
    	this.setbpmrange();
    	let music_range=[(this.data.length*0.25)|0,(this.data.length*0.75)|0];
    	let music_frame=1024;
    	let music_set=((music_range[1]-music_range[0])/music_frame)|0;

    	for (let i=0;i<music_set;i++){
    		let tmp=0;
    		for (let j=0;j<music_frame;j++){
    			tmp+=music_data[music_range[0]+i*music_frame+j]*music_data[music_range[0]+i*music_frame+j];
    		}
    		music_data2.push(Math.sqrt(tmp/music_frame));
    	}

    	for (let i=0;i<music_set-1;i++){
    		win[i]=0.5-0.5*Math.cos(2*Math.PI*i/(music_set));
    		music_data3[i]=(music_data2[i+1]>music_data2[i])? music_data2[i+1]-music_data2[i]:0;
    	}

    	for (let i=this.bpmrange[0];i<=this.bpmrange[1];i++){
    		let tmp=match_bpm(i);
    		this.bpmlist.push(tmp);
    	//	console.log(tmp);
    	}
    	this.bpmbest=this.bpmlist.slice().sort(function(a,b){
          if (a[1]!=b[1])return (b[1]-a[1]);
          else { return (b[0]-a[0]); }
        });
        let x=this.bpmbest[0][1];
    	for (let i=0;i<this.bpmlist.length;i++){
    		this.bpmlist[i][1]/=x;
    	}
    this.bpmoffset=[];
    for (let i=0;i<2;i++){
      this.bpmoffset[i]=[];
      this.bpmoffset[i][0]=60/this.bpmbest[i][0];//1beatの秒数
      this.bpmoffset[i][1]=this.bpmbest[i][2]/(2*Math.PI*this.bpmbest[i][0]/60);
      this.bpmoffset[i][1]-=2*Math.PI*this.bpmbest[i][0]/60;
    }

    		function match_bpm(bpm){
    			let c_sum=0;
    			let s_sum=0;

    			let s=self.data.sampleRate*1.0/music_frame;
    			for (let i=0;i<music_set-1;i++){
    				let dn=music_data3[i];
    				c_sum+=dn*Math.cos(2*Math.PI*bpm*i/60/s)*win[i];
    				s_sum+=dn*Math.sin(2*Math.PI*bpm*i/60/s)*win[i];
    			}
    			c_sum/=music_frame;
    			s_sum/=music_frame;

    			let a=[bpm,Math.hypot(c_sum,s_sum),(c_sum<0)?Math.atan(s_sum/c_sum)-Math.PI:Math.atan(s_sum/c_sum)-2*Math.PI];
    		return a;
    	}
    }



}
        /*
        while(k<self.data.duration){
              if(audioCtx.state === 'running' && self.offAudiocontext.currentTime>k) {
                  audioCtx.suspend().then(function() {
                  //susresBtn.textContent = 'Resume context';
                  k++;
                  });
            } else if(audioCtx.state === 'suspended') {
                audioCtx.resume().then(function() {
                 //susresBtn.textContent = 'Suspend context';
                }); 
            };
        }*/
//module.exports = MusicPlayP;
