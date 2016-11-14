var  _strutFactor = 0.5;
var _strutNoise=random(10);
var _maxlevels = 1;		

function FractalRoot(x,y,z,sides,angle)  {						
  this.pointArr = [];			
  this.rootBranch;					
  this.x=x;				
  this.y=y;
  this.z=z;
  this.sides=sides||5;
  this.angle=angle||0;
  this.objects=new THREE.Group();
  for (var i = 0; i<this.sides; i++) {		
    var x = this.x +(400 * cos(this.angle+i/this.sides));
    var y = this.y +(400 * sin(this.angle+i/this.sides));
    this.pointArr[i] = new Point3D(x, y,this.z);		
  }							
  this.rootBranch = new Branch(0, 0, this.pointArr,this.objects);		
  this.update();			
  //console.log(this.pointArr);						
}						
FractalRoot.prototype.update=function() {			
  this.rootBranch.drawMe();
  scene.add(this.objects);
  //console.log(this.objects);
}						

FractalRoot.prototype.draw=function() {
  _strutNoise += 0.001;
  _strutFactor = noise(_strutNoise) * 2;
  /*for (var i = 0; i<this.sides; i++) {		
    var x = this.x +(400 * cos(_t()+i/this.sides));
    var y = this.y +(400 * sin(_t()+i/this.sides));
    this.pointArr[i] = new Point3D(x, y,this.z);		
  }
  this.rootBranch.outerPoints=this.pointArr;*/
  if (frameCount%2===1){
    this.rootBranch.updateMe();
    //console.log(_strutFactor);
  }

  
  //pentagon.drawShape();	  
  this.objects.position.z=camera.position.z-1000;
  //this.objects.rotation.z=_t();
  
  //console.log(_strutNoise,_strutFactor);
}						

//================================================ Branch object

function Branch(lev, n,points,objectsP) {			
  this.level=lev, this.num=n;				
  this.outerPoints = points;
  this.midPoints = [];	
  this.projPoints = [];
  this.myBranches = [];
  this.objects=[];
  this.midPoints = this.calcMidPoints();
  this.projPoints = this.calcStrutPoints();
  this.objectsP=objectsP; 
    if ((this.level+1) < _maxlevels) {
      var childBranch = new Branch(this.level+1, 0, this.projPoints,this.objectsP);
      this.myBranches.push(childBranch); 
     for (var k = 0; k < this.outerPoints.length; k++) {
       var nextk = k-1;
       if (nextk < 0) { nextk += this.outerPoints.length; }
       var newPoints = [  this.projPoints[k], this.midPoints[k], this.outerPoints[k], this.midPoints[nextk], this.projPoints[nextk] ];
       var childBranch = new Branch(this.level+1, k+1, newPoints,this.objectsP);
       this.myBranches.push(childBranch);
     } 

    }

 // console.log("L"+this.myBranches.length); 		
 }			
  
  Branch.prototype.calcMidPoints=function() {						
     var mpArray = [];		
     for (var i = 0; i < this.outerPoints.length; i++) {			
       var nexti = i+1;						
       if (nexti == this.outerPoints.length) { nexti = 0; }		
       var  thisMP = this.calcMidPoint(this.outerPoints[i],this.outerPoints[nexti]);	
       mpArray[i] = thisMP;						
     } 							
     return mpArray;						
  }							
    
  Branch.prototype.calcMidPoint=function(a,b) {		
      return new Point3D((a.x+b.x)/2, (a.y+b.y)/2,(a.z+b.z)/2);			
  }
	
  Branch.prototype.calcStrutPoints=function() {
    var strutArray =[];
    for (var i = 0; i < this.midPoints.length; i++) {
      var nexti = i+3;
      if (nexti >= this.midPoints.length) { nexti -= this.midPoints.length; }
      var thisSP = this.calcProjPoint(this.midPoints[i], this.outerPoints[nexti]); 
      strutArray[i] = thisSP;
    } 
    return strutArray;
  }
    
  Branch.prototype.calcProjPoint=function (mp, op) {
    return new Point3D(mp.x+(op.x - mp.x)* _strutFactor, mp.y+(op.y - mp.y)* _strutFactor,mp.z+(op.z - mp.z)* _strutFactor);  
  }
		
  
   Branch.prototype.drawMe =function() {
        for (var i = 0; i < this.outerPoints.length; i++) {
         this.obj(this.outerPoints[i].x, this.outerPoints[i].y);	
       } 	
       for (var j = 0; j < this.midPoints.length; j++) {
         this.obj(this.projPoints[j].x, this.projPoints[j].y);
       }
       for (var j = 0; j < this.midPoints.length; j++) {
         this.obj(this.projPoints[j].x, this.outerPoints[j].y);
       }
       
       for (var k = 0; k < this.myBranches.length; k++) {
         this.myBranches[k].drawMe();
       } 

  }
  
    Branch.prototype.obj =function(a,b) {
        var src=Video_src;
        var texture =new THREE.VideoTexture(src);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;

        var geometry = new THREE.PlaneBufferGeometry(src.width/3, src.height/3);
        //console.log(src.width);
          var material = new THREE.MeshPhongMaterial({
            //color:"#ffffff",
            map: texture,
            blending:THREE.NoBlending,
           // blending: (random(2)>1)?THREE.NormalBlending:THREE.NormalBlending,
            //transparent: true
          });
    var tv = new THREE.Mesh(geometry, material);
        tv.position.set(a,b,random(10));
    this.objects.push(tv);
    this.objectsP.add(tv);
    }
   Branch.prototype.updateMe =function() {

      this.midPoints = this.calcMidPoints();
      this.projPoints = this.calcStrutPoints(); 
      //console.log(this.objects.length);
        var k=0;
 
        for (var i = 0; i < this.outerPoints.length; i++) {
         this.objects[k].position.x=this.outerPoints[i].x;
         this.objects[k].position.y=this.outerPoints[i].y;
         k++;
       } 	
       for (var j = 0; j < this.midPoints.length; j++) {
         this.objects[k].position.x=this.projPoints[j].x;
         this.objects[k].position.y=this.projPoints[j].y//,this.camera.position.z);
         k++;
       }
       for (var j = 0; j < this.midPoints.length; j++) {
         this.objects[k].position.x=this.projPoints[j].x;
         this.objects[k].position.y=this.outerPoints[j].y//,this.camera.position.z);
         k++;
       }
       
         if ((this.level+1) < _maxlevels) {//念のため 
          for (var i=0;i<this.myBranches.length;i++){
              if (this.myBranches[i].num===0){
                this.myBranches[i].outerPoints =this.projPoints ;//中心のやつ
              }
              else {
                k=i-1;
                var nextk = k-1;
                if (nextk < 0) { nextk += this.outerPoints.length; }
                  this.myBranches[i].outerPoints=[  this.projPoints[k], this.midPoints[k], this.outerPoints[k], this.midPoints[nextk], this.projPoints[nextk] ]
              }
              this.myBranches[i].updateMe();
            }
      }
  }
