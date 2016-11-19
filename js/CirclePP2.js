function CirclePP(cl,ct,dr){
  //this.ctx=ctx;
  this.clock=cl;
  this.height=ct[0];
  this.width=ct[1];
  this.dr=dr[0];
  this.ini=dr[1];

  this.amount=6000;
  this.size= 4;
  this.Wall={x:this.width-2*this.size,y:this.height-2*this.size};
  this.offset={x:this.size,y:this.size};
  this.flag=false;
  this.hue =[];this.pos =[];
  this.setrandom=true;
  this.list=[];this.timeL=[];
  this.from=[];this.to=[];
  this.id=0;
  this.att={v:-1,a:-1};
  this.fgg=random(360);

  this.ex=[];
  for (var i=0;i<this.amount;i++){
    this.hue[i]="hsla("+(random(this.fgg,(this.fgg+20)%360)|0)+",100%,50%,0.3)";
    this.pos[i]={p:null,v:null,a:null}
    this.pos[i].p={x:random(this.Wall.x),y:random(this.Wall.y)};
    this.pos[i].v={x:random(-1,1),y:random(-1,1)};
    this.pos[i].a={x:random(-0.1,0.1),y:random(-0.1,0.1)};
    //this.pos[i].a.y=0.03;
    //console.log(this.pos[i]);
    }
    //console.log(this.pos[0].p);
    if (this.ini){
      for (var i=0;i<this.amount;i++){
          this.ini([this.ex,this.hue[i],this.pos[i],this.size]);
      }
    }
}
CirclePP.prototype.srandom=function(f){this.setrandom=f;}
CirclePP.prototype.clear=function(){
  this.begin="";this.duration="";this.list=[];this.timeL=[];this.flag=false;
}
CirclePP.prototype.update=function(){
  /*今回は同時に描画も行う*/
  this.calcpos();
  for (var i=0;i<this.amount;i++){
    this.dr([this.ex[i],this.hue[i],this.pos[i],this.size]);
  }
  if (this.flag &&this.clock()>=this.begin+this.duration){this.pushlist();}//場所を入れ替える
}

CirclePP.prototype.setlist=function(list,timeL){
  /*あくまでもイベントをセットする！！*/
  if (!this.flag){this.begin=0,this.duration=timeL[0];}
  for (var i=list.length-1;i>=0;i--){
    this.list.unshift(list[i]);
    this.timeL.unshift(timeL[i]);
  }

  if (this.flag)this.id+=list.length;//
  //if (!this.flag)this.setdestination();
  this.flag=true;
}
CirclePP.prototype.pushlist=function(){
  this.begin=this.clock();
  var tmp=this.list.splice(this.id,1);
  var tmpt=this.timeL.splice(this.id,1);
  this.id=0;
  this.list.push(tmp[0]);
  this.timeL.push(tmpt[0]);
  this.duration=this.timeL[0];
  this.setdestination();
}
CirclePP.prototype.setdestination=function(){
  for (var i=0;i<this.amount;i++){
    this.from[i]={x:this.pos[i].p.x,y:this.pos[i].p.y};
    var c=0;
    if (this.setrandom) c=random(this.timeL.length)|0;
    var f={x:Math.floor(random(-2,0,1,3)),y:Math.floor(random(-2,0,1,3))};
    this.to[i]={x:(f.x%2===0)? this.list[c][i].x:2*this.size-this.list[c][i].x,y:(f.y%2===0)? this.list[c][i].y:2*this.size-this.list[c][i].y};
    this.to[i].x+=this.Wall.x*2*Math.ceil(f.x/2);
    this.to[i].y+=this.Wall.y*2*Math.ceil(f.y/2);
    this.hue[i]="rgba("+this.list[c][i].color[0]+","+this.list[c][i].color[1]+","+this.list[c][i].color[2]+","+this.list[c][i].color[3]/256+")";
  }
}

CirclePP.prototype.calcpos=function(){
  for (var i=0;i<this.amount;i++){
    if (this.flag){
        this.pos[i].p.x=step2(this.from[i].x,this.to[i].x,this.duration,this.clock()-this.begin,2.4);
        this.pos[i].p.y=step2(this.from[i].y,this.to[i].y,this.duration,this.clock()-this.begin,2.1);
        this.pos[i].p.x-=this.offset.x;
        this.pos[i].p.y-=this.offset.y;
        var tmp=[0,0];
            tmp[0]=(this.pos[i].p.x)%(2*this.Wall.x);
            if (tmp[0]<0)tmp[0]+= 2*this.Wall.x;
            if (tmp[0]>this.Wall.x) tmp[0]=2*this.Wall.x-tmp[0];
            tmp[1]=(this.pos[i].p.y)%(2*this.Wall.y);
            if (tmp[1]<0) tmp[1]+=2*this.Wall.y;
            if (tmp[1]>this.Wall.y) tmp[1]=2*this.Wall.y-tmp[1];

        this.pos[i].p.x=tmp[0]+this.offset.x;
        this.pos[i].p.y=tmp[1]+this.offset.y;
    }
    else{
      this.pos[i].v.x+=this.pos[i].a.x;
      this.pos[i].v.y+=this.pos[i].a.y;
      //this.pos[i].v.Mult(0.999);
      this.pos[i].p.x+=this.pos[i].v.x;
      this.pos[i].p.y+=this.pos[i].v.y;

          if (this.pos[i].p.x<this.size){
            this.pos[i].p.x=this.size*2-this.pos[i].p.x;
            this.pos[i].v.x*=this.att.v;this.pos[i].a.x*=this.att.a;
          }
          else if (this.pos[i].p.x>this.width-this.size){
            this.pos[i].p.x=2*(this.width-this.size)-this.pos[i].p.x;
            this.pos[i].v.x*=this.att.v;this.pos[i].a.x*=this.att.a;
          }
          if (this.pos[i].p.y<this.size){
            this.pos[i].p.y=this.size*2-this.pos[i].p.y;
            this.pos[i].v.y*=this.att.v;this.pos[i].a.y*=this.att.a;
          }
          else if (this.pos[i].p.y>this.height-this.size){
            this.pos[i].p.y=2*(this.height-this.size)-this.pos[i].p.y;
            this.pos[i].v.y*=this.att.v;this.pos[i].a.y*=this.att.a;
          }
          if (this.pos[i].p.y>this.height-this.size-1){
          //      this.pos[i].v.x*=0.8;
            //    this.pos[i].v.y*=100;
          }

      //console.log(this.Wall.x,this.Wall.y,this.offset);
    }



  }
}
