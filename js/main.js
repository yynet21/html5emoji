
var canvas = document.getElementById('visualizer');
var ctx = canvas.getContext('2d');
canvas.width =1280;
canvas.height=800;
ObjectP=[];
var a=0.4;
init();
animate();

function init(){
  var arg={
			'name':"気圧傾度力",
			'color':"#ff0000",    
			'vec':$("#p1").val()*10,
			'ang':0.75
      
		};
    
  ObjectP.push(new Arrow(arg));
  var arg={
			'name':"摩擦力",
			'color':"#00ff00",
			'vec':$("#f1").val()*10,
      'ang':a+0.25
		};
    
  ObjectP.push(new Arrow(arg));
  var arg={
			'name':"コリオリ力",
			'color':"#0000ff",
			'vec':100,
      'ang':a
		};
    
  ObjectP.push(new Arrow(arg));
}
var f=4;
ctx.lineWidth=10;
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  frameCount = requestAnimationFrame(animate);//描画開始から何フレーム目か分かる。
  updateParam();
 // console.log(ObjectP[0].vec);
}

function updateParam() {
  ObjectP.forEach(function(e){e.update()});
}


