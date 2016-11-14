function getElapsed(s){
	var a=performance.now();
	var pausing=0,pause_prev=0;
  var b,tmp;
  var flg=true;
	return function(s){
		if (typeof s==="undefined"){
      tmp=performance.now();
			if (flg){return (tmp-a-pausing)/1000;}
			else {return (b-a-pausing)/1000;} 
		}
		else if (s==="p"){
			b=performance.now();
      flg=false;
			return (b-a-pausing)/1000;
		}
		else if (s==="r"){
      tmp=performance.now();
	    if (flg) return (tmp-a-pausing)/1000;  
      flg=true;
      pause_prev=tmp-b;
			pausing+=pause_prev;
			return (tmp-a-pausing)/1000;
		}
		else if (s==="get"){
			return pausing/1000;
		}
    
	}
  
}
