function Stations(){
  this.station=[];
  this.name=["渋谷","神泉","駒場東大前","池の上"];
  this.pos=[[0,0],[-100,-500],[0,-1000],[100,-2000]];

  for (var i=0;i<this.name.length;i++){
      this.station.push(new Station(this.name[i],this.pos[i]));
  }
}

Stations.prototype.draw=function(){
  this.station.forEach(function(e){e.draw();});
  //console.log(frameCount,199);
}
