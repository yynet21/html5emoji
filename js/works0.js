window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(cb) {setTimeout(cb, 17);};
$('#pauseB').on('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	mp.click();
});
$('#resetB').on('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	mp.reset();
});
$('#saveimg').on('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	saveimg("visualizer0");
});

 