function StringtoImage(str,size){
    this.table=[];this.width=0;this.height=0;  this.num=[];this.color=[];
  //  if (str==="")return;
  	this.str =str;
    var StrCanvas = document.createElement('canvas');
    var    StrCtx = StrCanvas.getContext('2d');
	this.fontsize =size;
  //this.fontStyle = this.fontsize + 'px Century Gothic,"Hiragino Kaku Gothic ProN"';
  this.fontStyle = this.fontsize + 'px sans-serif';
  StrCanvas.width = this.fontsize*this.str.length;
  StrCanvas.height = this.fontsize*1.5;//this.strHeight(this.str,this.fontsize,"sans-serif");
  StrCtx.font = this.fontStyle;
  StrCtx.textBaseline = "top";

  //StrCtx.font="80px MSゴシック";//this.fontStyle;


	this.width =(StrCtx.measureText(this.str).width)|0;
//  console.log(StrCtx.font);
//	this.height=this.strHeight(this.str,this.fontStyle);//割りと残しておくべき情報だった
//  console.log(this.width,this.height);

//  StrCtx.font = this.fontStyle;
  //StrCtx.textBaseline = "top";
	//StrCtx.clearRect(0,0,StrCanvas.width,StrCanvas.height);
  StrCtx.fillStyle="#00f";
	StrCtx.fillText(this.str, 0, StrCanvas.height*0.05);

  //var k=0;
	var imgdata = StrCtx.getImageData(0, 0, this.width, StrCanvas.height);
  //console.log(StrCtx.textBaseline,"hjkl;",this.fontStyle,StrCtx.font,this.width,imgdata);
	 for (var i=0;i<StrCanvas.height;i++){
		 this.table[i]=[];
		 for (var j=0;j<this.width;j++){
       var tmp=(this.width * i + j) * 4 ;
       var list=[];
       for (var k=0;k<4;k++)list[k] = imgdata.data[tmp+ k];
			//this.table[i][j]=alpha;
      //console.log(alpha);
      if (list[3]>128){this.num.push({x:j,y:i});this.color.push(list);}
		 }
	 }
//  console.log(this.num[0],this.color[0]);
}

StringtoImage.prototype.getrandom =function (num){
  /*
    var ans=[];
  var tmpx=random(200);
  var tmpy=random(100);

  for (var i=0;i<num;i++){
    //  var tmp=(Math.random()*this.num.length)|0;
    //var tmp=((i*(114547+Math.random()))%this.num.length)|0;
    var tmp=((random(1)+37*i/num*this.num.length)|0)%this.num.length;
      //console.log(this.table,this.number,tmp,this.number.length,this.number[0]);// 45 20
    //  console.log(tmp);
      var x=(this.num[tmp].x+0.5-Math.random())*2+tmpx;
      var y=(this.num[tmp].y+0.5-Math.random())*2+tmpy;

      ans[i]={x:x,y:y,color:this.color[tmp]};
  }
	return ans;*/
  var ans=[];
var tmpx=random(200);
var tmpy=random(100);

for (var i=0;i<num;i++){
  //  var tmp=(Math.random()*this.num.length)|0;
  //var tmp=((i*(114547+Math.random()))%this.num.length)|0;
  var tmp=((random(1)+37*i/num*this.num.length)|0)%this.num.length;
    //console.log(this.table,this.number,tmp,this.number.length,this.number[0]);// 45 20
    var x=(this.num[tmp].x+0.5-Math.random())*2+tmpx;
    var y=(this.num[tmp].y+0.5-Math.random())*2+tmpy;
    ans[i]={x:x,y:y,color:this.color[tmp]};
}
  return ans;
}

StringtoImage.prototype.strHeight =function (str,size,fa) {
  var e = document.getElementById("ruler");
  e.style.fontSize= size;
  e.style.fontFamily=fa;
  e.innerHTML=str;
  var height = e.offsetHeight;
  e.innerHTML="";
  //console.log(height);
  return height;
}
