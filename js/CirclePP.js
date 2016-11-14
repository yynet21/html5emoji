function CirclePP(ctx){
  this.ctx=ctx;
  this.height=canvas.height;
  this.width=canvas.width;
  this.amount=6000;
  this.size= 4;
  this.Wall={x:canvas.width-2*this.size,y:canvas.height-2*this.size};
  this.offset={x:this.size,y:this.size};
  this.flag=false;
  this.hue =[];this.pos =[];
  this.setrandom=true;
  this.list=[];this.timeL=[];
  this.from=[];this.to=[];
  this.id=0;
  this.att={v:-1,a:-1};
  this.fgg=random(360);

  for (var i=0;i<this.amount;i++){
    this.hue[i]="hsla("+(random(this.fgg,(this.fgg+20)%360)|0)+",100%,50%,0.3)";
    this.pos[i]={p:null,v:null,a:null}
    this.pos[i].p={x:random(this.Wall.x),y:random(this.Wall.y)};
    this.pos[i].v={x:random(-1,1),y:random(-1,1)};
    this.pos[i].a={x:random(-0.1,0.1),y:random(-0.1,0.1)};
    //this.pos[i].a.y=0.03;
    //console.log(this.pos[i]);
    }
}
CirclePP.prototype.srandom=function(f){this.setrandom=f;}
CirclePP.prototype.update=function(){
  /*今回は同時に描画も行う*/
  this.calcf();
//  console.log(this.pos[0].p.x);
  for (var i=0;i<this.amount;i++){
    this.ctx.fillStyle =this.hue[i];
    this.ctx.beginPath();
  //  this.ctx.arc(this.pos[i].p.x, this.pos[i].p.y, this.size, Math.PI*2, false);
    this.ctx.rect(this.pos[i].p.x-this.size/2, this.pos[i].p.y-this.size/2, this.size, this.size);
    this.ctx.closePath();
    this.ctx.fill();
    //console.log(this.width,this.height,"this.pos[i].x",this.pos[i].x);
  }
  //console.log(frameCount,this.f,this.time);
  if (this.flag &&frameCount===this.f+this.time){
    this.setff();

  }
}

CirclePP.prototype.setf=function(list,timeL,f){
  /*あくまでもイベントをセットする！！*/
    if (f){this.f="";this.time="";this.list=[];this.timeL=[];this.flag=false;}
    if (!this.flag){this.f=frameCount,this.time=timeL[0];}

  /*今回は同時に描画も行う*/
  for (var i=list.length-1;i>=0;i--){
    this.list.unshift(list[i]);
    this.timeL.unshift(timeL[i]);
  }



    console.log(this.hue[0]);

  if (this.flag)this.id+=list.length;//
//  console.log(this.list.length);
  if (!this.flag)this.sets();
  this.flag=true;
}
CirclePP.prototype.setff=function(){
  this.f=frameCount;
  var tmp=this.list.splice(this.id,1);
  var tmpt=this.timeL.splice(this.id,1);
  this.id=0;
  this.list.push(tmp[0]);
  this.timeL.push(tmpt[0]);
  this.time=this.timeL[0];
  //console.log(this.list[0][0].x);
  this.sets();
}
CirclePP.prototype.sets=function(){
  //if (typeof this.timeL.length!=="undefined"){
          for (var i=0;i<this.timeL.length;i++){
       //   console.log("this.timeL["+i+"]",this.timeL[i]);
        }
//}
  for (var i=0;i<this.amount;i++){
    this.from[i]={x:this.pos[i].p.x,y:this.pos[i].p.y};
    //console.log(this.from[i].x);
    var c=0;
    if (this.setrandom) c=random(this.timeL.length)|0;
    var f={x:Math.floor(random(-2,0,1,3)),y:Math.floor(random(-2,0,1,3))};
    this.to[i]={x:(f.x%2===0)? this.list[c][i].x:2*this.size-this.list[c][i].x,y:(f.y%2===0)? this.list[c][i].y:2*this.size-this.list[c][i].y};
    this.to[i].x+=this.Wall.x*2*Math.ceil(f.x/2);
    this.to[i].y+=this.Wall.y*2*Math.ceil(f.y/2);
    this.hue[i]="rgba("+this.list[c][i].color[0]+","+this.list[c][i].color[1]+","+this.list[c][i].color[2]+","+this.list[c][i].color[3]/256+")";
    //console.log(f.x,f.y);
      //this.pos[i].a=(this.to[i].sub(this.from[i])).mult(-2/(this.timeL[0]*(this.timeL[0]+1)));//0...100 100...0 5050 101
      //this.pos[i].v=(this.to[i].sub(this.from[i])).mult(2/this.timeL[0]);
  }
}
CirclePP.prototype.calcf=function(){
  /*フレーム数で計算を行う*/
  //一番単純なモデルで実装することにしよう等速だが徐々に遅くなる
  // v->0 -> v->0->v 以下ループ[100,200]
  // 0 100 0,300 1700,2500 now v[i]=100;  1000 1280 1560 3560canvas*2*this.width*2*(random(10)|0)+(random(2)>1)? -this.from[i].x:this.from[i].x,
  for (var i=0;i<this.amount;i++){
    //this.pos[i].a.y=0.3;
    //this.pos[i].v.Add(this.pos[i].a);
    //this.pos[i].v.Mult(0.999);
    //this.pos[i].p.Add(this.pos[i].v);
    if (this.flag){
        //this.pos[i].p.x=step(this.from[i].x,this.to[i].x,this.time,frameCount-this.f,0,0.89+1*this.pos[i].a.y);
        //this.pos[i].p.y=step(this.from[i].y,this.to[i].y,this.time,frameCount-this.f,0,0.89+1*this.pos[i].a.x);
        this.pos[i].p.x=step2(this.from[i].x,this.to[i].x,this.time,frameCount-this.f,2.4);
        this.pos[i].p.y=step2(this.from[i].y,this.to[i].y,this.time,frameCount-this.f,2.1);
        //console.log("NH");
        this.pos[i].p.x-=this.offset.x;
        this.pos[i].p.y-=this.offset.y;
        var tmp=[0,0];
            tmp[0]=(this.pos[i].p.x)%(2*this.Wall.x);
            if (tmp[0]<0)tmp[0]+= 2*this.Wall.x;
            if (tmp[0]>this.Wall.x) tmp[0]=2*this.Wall.x-tmp[0];
            tmp[1]=(this.pos[i].p.y)%(2*this.Wall.y);
            if (tmp[1]<0) tmp[1]+=2*this.Wall.y;
            if (tmp[1]>this.Wall.y) tmp[1]=2*this.Wall.y-tmp[1];
            // 1300 800 1600-1300

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
