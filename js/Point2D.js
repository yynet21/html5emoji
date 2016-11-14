var EPSILON =1.0e-6;
function Point2D (x,y){
  if (arguments.length===0){
    this.x=0;
    this.y=0;
  }else{
  this.x = x;
  this.y = y;
  }
}

Point2D.prototype.x = function(){
  return this.x;
}
Point2D.prototype.y = function(){
  return this.y;
}

Point2D.prototype.dis = function(){
  return Math.sqrt(this.x*this.x+this.y*this.y);
}

Point2D.prototype.add =function(v){
  return new Point2D(this.x+v.x,this.y+v.y);
}
Point2D.prototype.Add =function(v){
  this.x+=v.x;this.y+=v.y;
}
Point2D.prototype.sub =function(v){
  return new Point2D(this.x-v.x,this.y-v.y);
}
Point2D.prototype.Sub =function(v){
  this.x-=v.x;this.y-=v.y;
}
Point2D.prototype.mult =function(s){
  return new Point2D(this.x*s,this.y*s);
}
Point2D.prototype.Mult =function(s){
  this.x*=s;this.y*=s;
}

Point2D.prototype.dot = function(v){
    return this.x*v.x+this.y*v.y;
}

Point2D.prototype.cross = function(v){
    return this.x*v.y-this.y*v.x;
}

Point2D.prototype.normalize = function(){
  var norm =this.dis();
  if (norm>EPSILON)
    return this.mult(1.0/norm);
  else
    return (new Vecror2D(0.0,0.0));
}

Point2D.prototype.toString = function(){
    return "("+this.x+","+this.y+")";
}

Point2D.prototype.calc = function (v,a,frame) {
  var x =  v.x*frame+a.x*frame*(frame-1)/2;
  var y =  v.y*frame+a.y*frame*(frame-1)/2;
  return  new Point2D(-x,-y);
};

Point2D.prototype.rotate = function(t){
    return new Point2D(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t));
	//this.x= this.x*Math.cos(t)-this.y*Math.sin(t);
	//this.y= this.x*Math.sin(t)+this.y*Math.cos(t));
}

Point2D.prototype.getcos = function(v){
    return (this.dot(v)/(this.dis()*v.dis()));
}

Point2D.prototype.getsin = function(v){
    var t =this.getcos(v);
    return Math.sqrt(1.0-t*t);
}

Point2D.prototype.pol = function(a,b){
    return((b.sub(a)).cross(this.sub(a))<EPSILON);
}
//Pがa,b上にあるかどうかの判定
Point2D.prototype.pos = function(a,b){
    return (Math.abs( (a.sub(this)).dis() )+Math.abs( (this.sub(b)).dis() )<Math.abs( (a.sub(b)).dis() )+EPSILON);
}

//点pと直線abとの距離を求める
Point2D.prototype.pld = function(a,b){
    return (Math.abs( (b.sub(a)).cross(this.sub(a)) ) / (b.sub(a)).dis());
}
Point2D.prototype.sortpoint =function(c,srt){
    if(typeof srt=== "undefined")srt=1;
    c.sort(function(a,b){
      if (a.x!=b.x)return (a.x-b.x)*srt;
      else { return (a.y-b.y)*srt; }
    });
    return c;
}
