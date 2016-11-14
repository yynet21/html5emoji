function reset(){
    if (!flag[1])
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cancelAnimationFrame(myReq);
    $('#pauseB').text("　再生　");
    flag[1] =true;
}
function pause(){
  if (!flag[0]&&!flag[1]){
	_time("p");
    cancelAnimationFrame(myReq);
    $('#pauseB').text("　再生　");
    flag[0] =true;
  }
  else if (flag[0]&&!flag[1]) {
	_time("r");
    requestAnimationFrame(render);
    $('#pauseB').text("一時停止");
    flag[0] =false;
  }
  else if (flag[1]){
    init();
	_time=getElapsed();
    requestAnimationFrame(render);
    $('#pauseB').text("一時停止");
    flag[0] =false;flag[1] =false;
  }
}

function getElapsed(s){
	var a=new Date();
	var pausing=0;
	return function(s){
		if (typeof s==="undefined"){
			//console.log(((new Date()).getTime()-a.getTime()-pausing));
			return ((new Date()).getTime()-a.getTime()-pausing)/1000;
		}
		else if (s==="p"){
			b=new Date();
			return (b.getTime()-a.getTime()-pausing)/1000;
		}
		else if (s==="r"){
			tmp=(new Date()).getTime();
			pausing+=tmp-b.getTime();
			return (tmp-a.getTime()-pausing)/1000;
		}
	}
}
