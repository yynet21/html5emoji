function Arrow(arg){
  this.name=arg.name;
  this.color=arg.color;
  this.vec=arg.vec;
  this.pos=arg.pos||[640,400];
  this.ang=arg.ang;
 // console.log(this.name,this.color,this.vec);
}
Arrow.prototype.draw=function(){
  ctx.font='normal normal 40px san-serif';
  ctx.textAling='left';
  ctx.textBaseline='top';
 /* ctx.translate(canvas.width/2,canvas.height/2);  */
  ctx.strokeStyle=this.color;
  ctx.beginPath();
  ctx.moveTo(this.pos[0], this.pos[1]);
  ctx.lineTo(this.pos[0]+this.vec*cos(this.ang), this.pos[1]+this.vec*sin(this.ang));
  ctx.stroke();
  ctx.fillText(this.name,this.pos[0]+(100+this.vec)*cos(this.ang), this.pos[1]+(100+this.vec)*sin(this.ang));  
}
Arrow.prototype.update=function(){
  if (this.name==="気圧傾度力"){this.vec=$("#p1").val()*10;}
  if (this.name==="摩擦力"){
    this.vec=$("#f1").val()*10;
    a=Math.asin(ObjectP[1].vec/ObjectP[0].vec)/(Math.PI*2);
    this.ang=-a+0.5;
//    console.log(a,ObjectP[1].vec,ObjectP[0].vec);
  }
  if (this.name==="コリオリ力"){
    this.vec=$("#p1").val()*10*cos(a);
    this.ang=-a+0.25;

  ctx.strokeStyle="#000000";
    ctx.save();
    console.log(this.pos[0]);
  ctx.moveTo(this.pos[0], this.pos[1]);
  ctx.lineTo(this.pos[0]+200, this.pos[1]);
  ctx.stroke();
;
  ctx.beginPath();
  ctx.setLineDash([5,10]); 
  ctx.moveTo(this.pos[0], this.pos[1]);
  ctx.lineTo(this.pos[0]+cos(-a)*200, this.pos[1]+sin(-a)*200);
  ctx.stroke();
  ctx.restore(); 
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1],50,0,(1-a)*2*Math.PI,true);
  ctx.stroke();
  ctx.textBaseline='bottom';
  ctx.font='normal normal 30px san-serif';
  
  ctx.fillText("a",this.pos[0]+60,this.pos[1]);
  ctx.font='normal normal 40px san-serif';
  
  var tmp='風速'+(Math.sqrt(ObjectP[0].vec*ObjectP[0].vec-ObjectP[1].vec*ObjectP[1].vec)/f).toFixed(2) ;
  ctx.fillText(tmp, 100, 200);  
  var alpha='向き　sin a='+ObjectP[1].vec/ObjectP[0].vec;
  ctx.fillText(alpha, 100, 240);  
 
  }
  
  this.draw();
}    //$('#sides').val()|0