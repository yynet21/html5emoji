function TimeLineM(arg,fn){
  this.arg=arg;
  this.dr=fn[0];
  this.ini=fn[1];
  this.size=(this.arg.width/this.arg.size)|0;
  this.ex=[];
  this.col=[];
  this.arg.value=[];
  for (var i=0;i<this.arg.size;i++){
    this.arg.value[i]=[];
    for (var j=0;j<this.arg.size;j++){
        this.arg.value[i][j]=0;
    }
  }
    if (this.ini){
          this.ini.call(this.arg,this.ex,this.col);
    }
}
TimeLineM.prototype.update=function(){
    this.dr.call(this.arg,this.ex,this.col,this.size);
}
