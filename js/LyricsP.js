function LyricsP(time,lyrics){
  this.lyrics=[];
  for (var i=0;i<lyrics.length;i++){
    this.lyrics.push(new Lyrics(time[i],lyrics[i]));
  }
}

LyricsP.prototype.draw=function(){
    if (mp.time!==-1 &&this.lyrics.length>0 &&this.lyrics[0].time +10< mp.time()){
      if (typeof this.lyrics[0].cube!=="undefined"){
        for (var i=0;i<this.lyrics[0].cube.mesh.length;i++){
        scene.remove(this.lyrics[0].cube.mesh[i]);
        //geometry.dispose();
        //material.dispose();
        //texture.dispose();
        }
      }
      this.lyrics.shift();
      //console.log("ghj");
  }
  if (mp.time!==-1)this.lyrics.forEach(function(e){e.draw();});
  //console.log(frameCount,90);
         //ObjectP.forEach(function(e){e.draw();});
}

LyricsP.prototype.init=function(){
  var tmp=camera.position.z;
  this.lyrics.forEach(function(e){e.init(tmp);});
  //console.log(frameCount,90);
         //ObjectP.forEach(function(e){e.draw();});
}

LyricsP.prototype.update=function(z){
  //z*=-100;
  this.lyrics.forEach(function(e){e.update(z);});
}