var  _strutFactor = 0.5;
var _strutNoise=random(10);
var _maxlevels = 2;		

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
  _strutNoise += 0.01;
  _strutFactor = noise(_strutNoise) * 2;
  /*for (var i = 0; i<this.sides; i++) {		
    var x = this.x +(400 * cos(_t()+i/this.sides));
    var y = this.y +(400 * sin(_t()+i/this.sides));
    this.pointArr[i] = new Point3D(x, y,this.z);		
  }
  this.rootBranch.outerPoints=this.pointArr;*/
  if (frameCount%2===1){
    this.rootBranch.updateMe();
    console.log(_strutFactor);
  }

  
  //pentagon.drawShape();	  
  this.objects.position.z=camera.position.z;
  //console.log(_strutNoise,_strutFactor);
}						

//================================================ Branch object

function Branch(lev, n,points,objects) {			
  this.level=lev, this.num=n;				
  this.outerPoints = points;
  this.midPoints = [];	
  this.projPoints = [];
  this.myBranches = [];
  this.lines=[];
  this.midPoints = this.calcMidPoints();
  this.projPoints = this.calcStrutPoints();
  this.objects=objects; 
    if ((this.level+1) < _maxlevels) {
      var childBranch = new Branch(this.level+1, 0, this.projPoints,this.objects);
      this.myBranches.push(childBranch); 
     for (var k = 0; k < this.outerPoints.length; k++) {
       var nextk = k-1;
       if (nextk < 0) { nextk += this.outerPoints.length; }
       var newPoints = [  this.projPoints[k], this.midPoints[k], this.outerPoints[k], this.midPoints[nextk], this.projPoints[nextk] ];
       var childBranch = new Branch(this.level+1, k+1, newPoints,this.objects);
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
        //strokeWeight(5 - level);      
        // draw outer shape
        for (var i = 0; i < this.outerPoints.length; i++) {
         var nexti = i+1;					
         if (nexti == this.outerPoints.length) { nexti = 0; }	
         this.line(this.outerPoints[i].x, this.outerPoints[i].y, this.outerPoints[nexti].x, this.outerPoints[nexti].y);	
       } 	
       // draw midpoints
       //strokeWeight(0.5);
       //fill(255, 150);   
       for (var j = 0; j < this.midPoints.length; j++) {
         //ellipse(midPoints[j].x, midPoints[j].y, 5, 5);
         this.line(this.midPoints[j].x, this.midPoints[j].y, this.projPoints[j].x, this.projPoints[j].y);
         //ellipse(projPoints[j].x, projPoints[j].y, 5, 5);
         //console.log(this.midPoints[j]);
       }
       
       for (var k = 0; k < this.myBranches.length; k++) {
         this.myBranches[k].drawMe();
       } 

  }
  
    Branch.prototype.line =function(a,b,c,d) { 
      var geometry = new THREE.Geometry();

    //頂点座標の追加
      geometry.vertices.push( new THREE.Vector3( a, b, -1000)  ); 
      geometry.vertices.push( new THREE.Vector3( c, d, -1000)  ); 

    //線オブジェクトの生成	
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) );
    line.geometry.verticesNeedUpdate = true;
   this.lines.push(line);
  //cube.position.set(x, y, camera.position.z-500);
    //scene.add(line);
    this.objects.add(line);
    //console.log(this.objects); 
    }
   Branch.prototype.updateMe =function() {
 //myBranchesもlineも一つのBranchには定数(6)個存在
     for (var i=0;i<this.lines.length;i++){
        this.lines[i].geometry.verticesNeedUpdate = true;
         //this.lines[i].geometry.vertices[0].x=random(599);
     }     
 
      this.midPoints = this.calcMidPoints();
      this.projPoints = this.calcStrutPoints(); 
       // console.log("hello "+this.lines.length,this.myBranches.length,this.level);
        var k=0;
       // console.log("before: ",this.lines[0].geometry.vertices[0],this.outerPoints[0]);
 
        for (var i = 0; i < this.outerPoints.length; i++) {
         var nexti = i+1;					
         if (nexti == this.outerPoints.length) { nexti = 0; }	
         this.lines[k].geometry.vertices[0]=this.outerPoints[i];
         this.lines[k].geometry.vertices[1]=this.outerPoints[nexti];
         k++;
       } 
       // console.log("after: ",this.lines[0].geometry.vertices[0]);
       
       // draw midpoints
       //strokeWeight(0.5);
       //fill(255, 150);   
       for (var j = 0; j < this.midPoints.length; j++) {
         //this.lines[k](this.midPoints[j].x, this.midPoints[j].y, this.projPoints[j].x, this.projPoints[j].y);
         this.lines[k].geometry.vertices[0]=this.midPoints[j];
         this.lines[k].geometry.vertices[1]=this.projPoints[j];
         k++;
       }
       //if ((this.level+1) < _maxlevels) {//念のため 
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
      //}
     // console.log(k);  
  }
