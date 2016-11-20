function FractalRoot(clock,dr,pos,sides,angle)  {
  this.time=clock;
  this.dr=dr[0];
  this.ini =dr[1];
  this.strutFactor = 0.5;
  this.strutNoise=random(10);
  this.pos=pos;
  this.sides=sides||5;
  this.angle=angle||0;
  this.point = [];

  for (var i = 0; i<this.sides; i++) {
    var x = this.pos.x +(400 * cos(this.angle+i/this.sides));
    var y = this.pos.y +(400 * sin(this.angle+i/this.sides));
    this.point[i] = {x:x,y:y};
  }
  this.obj=[];
  this.obj[0]={out:this.point,mid:null,proj:null,lev:0,num:0};
  this.maxlevel=2;
  this.a=[];
  this.a[0]=1;

  for (var i=1,k=1;i<=this.maxlevel;i++){
    k*=this.sides+1;
    this.a[i]=this.a[i-1]+k;          //1-5-25-125なら　0-1 1-6 2-31
  }
  this.calc();
  this.add();
}
FractalRoot.prototype.updateP=function() {//親の位置変更
}


FractalRoot.prototype.update=function() {
  //this.Par.position.z=camera.position.z-1000;
  this.strutNoise += 0.001;
  this.strutFactor = noise(this.strutNoise) * 1.3;
    for (var i = 0; i<this.sides; i++) {
    var x = this.pos.x +(400 * cos(this.angle+this.time()*0.01+i/this.sides));
    var y = this.pos.y +(400 * sin(this.angle+this.time()*0.01+i/this.sides));
    this.point[i] = {x:x,y:y};
  }
  this.obj=[];
  this.obj[0]={out:this.point,mid:null,proj:null,lev:0,num:0};
  this.calc();


  this.draw();
}

FractalRoot.prototype.calc=function() {//点の位置の計算
    for (var i=0;i<this.a[this.maxlevel];i++){
         //console.log(i,this.obj[i].out.length);
         this.obj[i].mid = this.calcmid(i);
         this.obj[i].proj = this.calcStrutPoints(i);
         if (this.obj[i].lev==this.maxlevel)continue;
         else{
            this.obj.push({out:this.obj[i].proj,
                        mid:null,
                        proj:null,
                        lev:this.obj[i].lev+1,num:0});
                        //consol.e.
           for (var k = 0; k < this.obj[i].out.length; k++) {
             var nextk = k-1;
             if (nextk < 0) { nextk += this.obj[i].out.length; }
             var newPoints = [  this.obj[i].proj[k], this.obj[i].mid[k], this.obj[i].out[k], this.obj[i].mid[nextk], this.obj[i].proj[nextk] ];
             this.obj.push({out:newPoints,
                        mid:null,
                        proj:null,
                        lev:this.obj[i].lev+1,num:k+1});
            //console.log(i,k,this.obj[i]);
           }
         }
      }
    //console.log(this.a[this.maxlevel],this.obj.length);
}

  FractalRoot.prototype.calcmid=function(k) {
     var mpArray = [];
     for (var i = 0; i < this.obj[k].out.length; i++) {
       var nexti = i+1;
       if (nexti == this.obj[k].out.length) { nexti = 0; }
       var  thisMP = this.calcMidPoint(this.obj[k].out[i],this.obj[k].out[nexti]);
       mpArray[i] = thisMP;
     }
     return mpArray;
  }

  FractalRoot.prototype.calcMidPoint=function(a,b) {
      return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}
  }

  FractalRoot.prototype.calcStrutPoints=function(k) {
    var strutArray =[];
    for (var i = 0; i < this.obj[k].mid.length; i++) {
      var nexti = i+3;
      if (nexti >= this.obj[k].mid.length) { nexti -= this.obj[k].mid.length; }
      var thisSP = this.calcProjPoint(this.obj[k].mid[i], this.obj[k].out[nexti]);
      strutArray[i] = thisSP;
    }
    return strutArray;
  }

  FractalRoot.prototype.calcProjPoint=function (a, b) {
    return {x:a.x+(b.x - a.x)* this.strutFactor, y:a.y+(b.y - a.y)* this.strutFactor}
  }


    FractalRoot.prototype.add =function() {//配置
        this.ex=[];
      if (this.ini){
        this.ini.call(this.obj,this.ex);
      }
    }
 FractalRoot.prototype.draw =function() {//値の変更
     this.dr.call(this.ex,this.obj);

}
