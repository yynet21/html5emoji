function Analyzer(cl,ct,dr){
  this.cl=cl;
  this.height=ct[0];
  this.width=ct[1];
  this.dr=dr[0];
  this.ini=dr[1];
  this.size=(this.width/this.cl)|0;
  this.ex=[];
  this.hue=[];
    if (this.ini){
          this.ini([this.cl,this.ex,this.hue,this.pos,this.size]);
    }
}
Analyzer.prototype.update=function(){
    this.dr([this.cl,this.ex,this.hue,this.pos,this.size]);
}
