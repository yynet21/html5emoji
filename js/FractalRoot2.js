function FractalRoot(x,y,z,sides,angle)  {						
  this.strutFactor = 0.5;
  this.strutNoise=random(10);
  this.x=x;				
  this.y=y;
  this.z=z;
  this.sides=sides||5;
  this.angle=angle||0;
  this.Par=new THREE.Group();
  this.objects=[];
  this.pointArr = [];			
  for (var i = 0; i<this.sides; i++) {		
    var x = this.x +(400 * cos(this.angle+i/this.sides));
    var y = this.y +(400 * sin(this.angle+i/this.sides));
    this.pointArr[i] = new Point3D(x, y,this.z);		
  }
  this.obj=[];
  this.obj[0]={outerPoints:this.pointArr,midPoints:null,projPoints:null,lev:0,num:0};this.maxlevel=2;
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
		

FractalRoot.prototype.draw=function() {
  this.Par.position.z=camera.position.z-1000;
  this.strutNoise += 0.001;
  this.strutFactor = noise(this.strutNoise) * 1.3;
  this.obj=[];
  this.obj[0]={outerPoints:this.pointArr,midPoints:null,projPoints:null,lev:0,num:0};this.calc();
  this.update();
}						

FractalRoot.prototype.calc=function() {//点の位置の計算
    for (var i=0;i<this.a[this.maxlevel];i++){
         //console.log(i,this.obj[i].outerPoints.length);
         this.obj[i].midPoints = this.calcMidPoints(i);
         this.obj[i].projPoints = this.calcStrutPoints(i);
         if (this.obj[i].lev==this.maxlevel)continue;
         else{
            this.obj.push({outerPoints:this.obj[i].projPoints,
                        midPoints:null,
                        projPoints:null,
                        lev:this.obj[i].lev+1,num:0});
                        //consol.e.
           for (var k = 0; k < this.obj[i].outerPoints.length; k++) {
             var nextk = k-1;
             if (nextk < 0) { nextk += this.obj[i].outerPoints.length; }
             var newPoints = [  this.obj[i].projPoints[k], this.obj[i].midPoints[k], this.obj[i].outerPoints[k], this.obj[i].midPoints[nextk], this.obj[i].projPoints[nextk] ];
             this.obj.push({outerPoints:newPoints,
                        midPoints:null,
                        projPoints:null,
                        lev:this.obj[i].lev+1,num:k+1});
            //console.log(i,k,this.obj[i]);            
           } 
         }
      }
    //console.log(this.a[this.maxlevel],this.obj.length);
}
  
  FractalRoot.prototype.calcMidPoints=function(k) {						
     var mpArray = [];		
     for (var i = 0; i < this.obj[k].outerPoints.length; i++) {			
       var nexti = i+1;						
       if (nexti == this.obj[k].outerPoints.length) { nexti = 0; }		
       var  thisMP = this.calcMidPoint(this.obj[k].outerPoints[i],this.obj[k].outerPoints[nexti]);	
       mpArray[i] = thisMP;						
     } 							
     return mpArray;						
  }							
    
  FractalRoot.prototype.calcMidPoint=function(a,b) {		
      return new Point3D((a.x+b.x)/2, (a.y+b.y)/2,(a.z+b.z)/2);			
  }
	
  FractalRoot.prototype.calcStrutPoints=function(k) {
    var strutArray =[];
    for (var i = 0; i < this.obj[k].midPoints.length; i++) {
      var nexti = i+3;
      if (nexti >= this.obj[k].midPoints.length) { nexti -= this.obj[k].midPoints.length; }
      var thisSP = this.calcProjPoint(this.obj[k].midPoints[i], this.obj[k].outerPoints[nexti]); 
      strutArray[i] = thisSP;
    } 
    return strutArray;
  }
    
  FractalRoot.prototype.calcProjPoint=function (mp, op) {
    return new Point3D(mp.x+(op.x - mp.x)* this.strutFactor, mp.y+(op.y - mp.y)* this.strutFactor,mp.z+(op.z - mp.z)* this.strutFactor);  
  }
		
  
    FractalRoot.prototype.add =function() {//配置
        /*var src=Video_src;
        var texture =new THREE.VideoTexture(src);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;

        var geometry = new THREE.PlaneBufferGeometry(200,200);
          var material = new THREE.MeshBasicMaterial({
            //color:"#ff0000",
            map: texture,
            //blending:THREE.NoBlending
          });*/
       for (var i=0;i<this.obj.length;i++){
       var tmp=[];
       for (var j = 0; j < this.obj[i].outerPoints.length; j++) {
          var geometry = new THREE.Geometry();
          var nextj=(j+1)%this.obj[i].outerPoints.length;
    //頂点座標の追加
    geometry.vertices.push( new THREE.Vector3( this.obj[i].outerPoints[j].x, this.obj[i].outerPoints[j].y, 0)  ); 
    geometry.vertices.push( new THREE.Vector3( this.obj[i].outerPoints[nextj].x, this.obj[i].outerPoints[nextj].y, 0)  ); 

    //線オブジェクトの生成	
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) );    line.geometry.verticesNeedUpdate = true;
          //var tv = new THREE.Mesh(geometry, material);
              /*tv.position.set(this.obj[i].outerPoints[j].x,this.obj[i].outerPoints[j].y,random(10));*/
              tmp.push(line);
              this.Par.add(line);

       } 	
       for (var j = 0; j < this.obj[i].midPoints.length; j++) {
          var geometry = new THREE.Geometry();
          //var nextj=(j+1)%this.obj[i].midPoints.length;
    //頂点座標の追加
    geometry.vertices.push( new THREE.Vector3( this.obj[i].midPoints[j].x, this.obj[i].midPoints[j].y, 0)  ); 
    geometry.vertices.push( new THREE.Vector3( this.obj[i].projPoints[j].x, this.obj[i].projPoints[j].y, 0)  ); 

    //線オブジェクトの生成	
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) );                  line.geometry.verticesNeedUpdate = true;
    tmp.push(line);
              this.Par.add(line);
       }
        this.objects.push(tmp);
      }

      scene.add(this.Par);
    }
 FractalRoot.prototype.update =function() {//値の変更
     for (var i=0;i<this.objects.length;i++){
       for (var j=0;j<this.objects[i].length;j++){
        this.objects[i][j].geometry.verticesNeedUpdate = true;
       }
    }
    //console.log(this.obj[40]);
      
     for (var i=0;i<this.objects.length;i++){
        var k=0;
        for (var j = 0; j < this.obj[i].outerPoints.length; j++) {
         //this.objects[i][k].position.x=this.obj[i].outerPoints[j].x;
         //this.objects[i][k].position.y=this.obj[i].outerPoints[j].y;
                   var nextj=(j+1)%this.obj[i].outerPoints.length;
         this.objects[i][k].geometry.vertices[0]=this.obj[i].outerPoints[j];
         this.objects[i][k].geometry.vertices[1]=this.obj[i].outerPoints[nextj];
         k++;
       } 	
       for (var j = 0; j < this.obj[i].midPoints.length; j++) {
         //this.objects[i][k].position.x=this.obj[i].projPoints[j].x;
         //this.objects[i][k].position.y=this.obj[i].projPoints[j].y;
         this.objects[i][k].geometry.vertices[0]=this.obj[i].midPoints[j];
         this.objects[i][k].geometry.vertices[1]=this.obj[i].projPoints[j];
         k++;
       }
     }
}