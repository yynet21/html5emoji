var EPSILON =1.0e-6;
function Point3D (x,y,z){
  var x,y,z;
  this.x = x;
  this.y = y;
  this.z = z;
}

Point3D.prototype.x = function(){
  return this.x;
}
Point3D.prototype.y = function(){
  return this.y;
}
Point3D.prototype.z = function(){
  return this.z;
}

Point3D.prototype.norm = function(){
  return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}

Point3D.prototype.add =function(v){
  return new Point3D(this.x+v.x,this.y+v.y,this.z+v.z);
}

Point3D.prototype.sub =function(v){
  return new Point3D(this.x-v.x,this.y-v.y,this.z-v.z);
}

Point3D.prototype.scale =function(s){
  return new Point3D(this.x*s,this.y*s,this.z*s);
}

Point3D.prototype.dot = function(v){
    return this.x*v.x+this.y*v.y+this.z*v.z;
}

Point3D.prototype.normalize = function(){
  var norm =this.norm();
  if (norm>EPSILON)
    return this.scale(1.0/norm);
  else
    return (new Vecror3D(0.0,0.0,0.0));
}

Point3D.prototype.toString = function(){
    return "(x:"+this.x+",y:"+this.y+",z:"+this.z+")";
}

Point3D.prototype.calc = function (v,a,frame) {
  var x =  v.x*frame+a.x*frame*(frame-1)/2;
  var y =  v.y*frame+a.y*frame*(frame-1)/2;
  var z =  v.z*frame+a.z*frame*(frame-1)/2;
  return  new Point3D(-x,-y,-z);
};

Point3D.prototype.rotateZ = function(t){
    return new Point3D(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t),this.z);
	//this.x= this.x*Math.cos(t)-this.y*Math.sin(t);
	//this.y= this.x*Math.sin(t)+this.y*Math.cos(t));
}

