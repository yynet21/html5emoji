function HexagonF(ctx,pos,sides,angle)  {						
  this.ctx=ctx;
  this.height=canvas.height;
  this.width=canvas.width;
  this.strutFactor = 0.5;
  this.strutNoise=random(10);
  this.pos=pos;				
  this.sides=sides||4;
  this.angle=angle||0;
  this.point = [];
  this.radius=400;  
  for (var i = 0; i<this.sides; i++) {		
    var x = this.pos.x +(this.radius * cos(this.angle+i/this.sides));
    var y = this.pos.y +(this.radius * sin(this.angle+i/this.sides));
    this.point[i] = {x:x,y:y};		
  }
  this.obj=[];
  this.obj[0]={out:this.point,mid:[],lev:0,num:0};
  this.maxlevel=3;
  this.a=[];
  this.a[0]=1;
  
  for (var i=1,k=1;i<=this.maxlevel;i++){
    k*=this.sides+1;
    this.a[i]=this.a[i-1]+k;          //1-5-25-125なら　0-1 1-6 2-31
  }
  this.calc();
  this.add();
}		
HexagonF.prototype.updateP=function() {//親の位置変更			
}						
		

HexagonF.prototype.update=function() {
  //this.Par.position.z=camera.position.z-1000;
  this.strutNoise += 0.004;
  this.strutFactor = noise(this.strutNoise) * 5.5-3;
  //this.strutFactor = 1.5;
  
    for (var i = 0; i<this.sides; i++) {		
    var x = this.pos.x +(this.radius * cos(this.angle+frameCount*0.001+i/this.sides));
    var y = this.pos.y +(this.radius * sin(this.angle+frameCount*0.001+i/this.sides));
    this.point[i] = {x:x,y:y};		
  }
  this.obj=[];
  this.obj[0]={out:this.point,mid:[],lev:0,num:0};
  this.calc();


  this.draw();
}						

HexagonF.prototype.calc=function() {//点の位置の計算
    for (var i=0;i<this.a[this.maxlevel-1];i++){
         //console.log(i,this.obj[i].out.length);
         if (this.obj[i].lev==this.maxlevel)continue;
         else{
            this.obj[i].mid = this.calcMid(i);
            this.obj.push({out:this.obj[i].mid,
                        mid:[],                        
                        lev:this.obj[i].lev+1,num:0});
                        //consol.e.
           for (var k = 0; k < this.obj[i].out.length; k++) {
             var newPoints = this.calcProj(i,k);
             this.obj.push({out:newPoints,
                        mid:[],                        
                        lev:this.obj[i].lev+1,num:k+1});
            //console.log(i,k,this.obj[i]);            
           } 
         }
      }
    //console.log(this.a[this.maxlevel-1],this.obj.length);
}
  
  HexagonF.prototype.calcMid=function(k) {						
     var mid = [];		
     for (var i = 0; i < this.obj[k].out.length; i++) {			
       var nexti = i+1;						
       if (nexti == this.obj[k].out.length) { nexti = 0; }		
       mid[i] = this.calcMidP(this.obj[k].out[i],this.obj[k].out[nexti]);	
     } 							
     return mid;						
  }							
    
  HexagonF.prototype.calcMidP=function(a,b) {		
    return {x:a.x+(b.x - a.x)*0.5, y:a.y+(b.y - a.y)* 0.5}  
  }
	
  HexagonF.prototype.calcProj=function(j,k) {
    //if (k===0) return;
    var st =[];
    for (var i = 0; i < this.obj[j].mid.length; i++) {
      if (k==i){st[i]=this.obj[j].mid[k];continue;}
      st[i] = this.calcProjP(this.obj[j].mid[i], this.obj[j].mid[k]); 
    } 
    return st;
  }
    
  HexagonF.prototype.calcProjP=function (a, b) {
    return {x:a.x+(b.x - a.x)* this.strutFactor, y:a.y+(b.y - a.y)* this.strutFactor}  
  }
		
  
    HexagonF.prototype.add =function() {//配置
    }
 HexagonF.prototype.draw =function() {//値の変更
     this.ctx.beginPath();
     var asp=img[0].width/img[0].height;
     var canvasT = document.createElement('canvas');
     var text="ああ";     
    canvasT.width = 100*(text.length+1);
    canvasT.height = 100;         //サイズ　縦
    //試しに文字描画
    var ctxT = canvasT.getContext('2d');
    ctxT.font = "100px 'ＭＳ Ｐゴシック'";
    ctxT.textBaseline = "top";
    
    //canvasT.width =ctxT.measureText(text).width;          //サイズ　横
    ctxT.fillText(text, 0, 0);
   // var data = canvas.toDataURL();
     asp=canvasT.width/canvasT.height;
    //this.ctx.drawImage(canvasT, (this.obj[0].mid[0].x+this.obj[0].mid[2].x)/2-50*asp,(this.obj[0].mid[0].y+this.obj[0].mid[2].y)-50,100*asp,100 );
    //this.ctx.drawImage(canvasT,680-60*asp,400-60,120*asp,120 );
    //console.log((this.obj[0].out[0].x+this.obj[0].out[2].x)/2-50*asp,(this.obj[0].out[0].y+this.obj[0].out[2].y)-50);
     for (var i=0;i<this.obj.length;i++){
       var h=(100*Math.pow(2/3,this.obj[i].lev))|0;
       var w=(asp*h)|0;
        for (var j = 0; j < this.obj[i].out.length; j++) {
                   var nextj=(j+1)%this.obj[i].out.length;
         this.ctx.moveTo(this.obj[i].out[j].x,this.obj[i].out[j].y);
         
     //    this.ctx.drawImage(img[0], this.obj[i].out[j].x-w/2,this.obj[i].out[j].y-h/2,w,h );
         this.ctx.drawImage(canvasT, this.obj[i].out[j].x-w/2,this.obj[i].out[j].y-h/2,w,h );
         this.ctx.lineTo(this.obj[i].out[nextj].x,this.obj[i].out[nextj].y);
       }
        for (var j = 0; j < this.obj[i].mid.length; j++) {
                   var nextj=(j+1)%this.obj[i].mid.length;
         this.ctx.moveTo(this.obj[i].mid[j].x,this.obj[i].mid[j].y);
        // this.ctx.drawImage(img[0], this.obj[i].mid[j].x-asp*w*2,this.obj[i].mid[j].y-w*2,w,h );
         this.ctx.lineTo(this.obj[i].mid[nextj].x,this.obj[i].mid[nextj].y);
         this.ctx.drawImage(canvasT, this.obj[i].mid[j].x-w*2,this.obj[i].mid[j].y-h*2,w,h );
       }
       
     }
     this.ctx.stroke();
}