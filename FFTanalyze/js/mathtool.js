function random(v1,v2,v3,v4){
  if (arguments.length===1){
    return v1*Math.random();
  }
  else if (arguments.length===2){
    return v1+(v2-v1)*Math.random();
  }
  else{
    var tmp= (v4-v3+v2-v1)*Math.random();
    if (tmp>v2-v1) return v3+(tmp-(v2-v1));
    else{return v1+tmp;}
  }
}
function sin(t){
  return Math.sin(t*Math.PI*2);
}

function cos(t){
  return Math.cos(t*Math.PI*2);
}

function abs(t){
  return Math.abs(t);
}
function step(a,b,time,now,c,d){
  if (now<0) return a;
  if (now>time) return b;
  var  s=now*1.0/time;
  var x=b-a;
  if (typeof d !=="undefined"){
    return (1-Math.pow(d,now))/(1-Math.pow(d,time))*x+a;
  }
  if (c==0)return s*x+a;
  else if (c==1)return s*s*x+a;
  else if (c==2)return (1-(1-s)*(1-s))*x+a;
  else if (c==3)return s*s*s*x+a;
  else if (c==4)return (1-(1-s)*(1-s)*(1-s))*x+a;
  else if (c===10){
    s *= 2;if (s < 1) return a+x/2*s*s;
    else{s--;return a-x/2*(s*(s-2)-1)};
  }
  else {return s*(b-a)+a;}
}
function step2(a,b,time,now,c,d){
  var tmp=0;
  if (c%1!==0){tmp=c%1;c=c|0;}
  if (now<0) return a;
  if (now>time*(1-tmp)) return b;
  var  s=now/(1-tmp)/time;
  var x=b-a;
  if (c==0)return s*x+a;
  else if (c==1)return s*s*x+a;
  else if (c==2)return (1-(1-s)*(1-s))*x+a;
  else if (c==12){/*
    s *= 2;if (s < 1) return a+x/2*s*s;
    else{s--;return a-x/2*(s*(s-2)-1)};*/
  }
  else if (c==3)return s*s*s*x+a;
  else if (c==4)return (1-(1-s)*(1-s)*(1-s))*x+a;
  else if (c===10){
    s *= 2;if (s < 1) return a+x/2*s*s;
    else{s--;return a-x/2*(s*(s-2)-1)};//0-1  -1 -2
  }
  else if (c===11){
    s *= 2;if (s < 1) return a+x/2*(1-(1-s)*(1-s));
    else{s--;return a+x/2+x/2*s*s};
  }
  else {return s*x+a;}
}

function mod(i, j) {
    return (i % j) < 0 ? (i % j) + 0 + (j < 0 ? -j : j) : (i % j + 0);
}
//module.exports = {random,sin,cos,abs,step,step2,mod};
