var canvas,ctx,stage,shape,frameCount;
var windowHalfX,windowHalfY ;
var flg=false;
var ObjectP=[];
var Str=[];
var img=[new Image()];
	img[0].src = "./img/flower0.png";
  img[0].onload =function (){
init();
animate();
  };
function init(){
/*@Set Canvas */
canvas = document.getElementById('visualizer');
ctx = canvas.getContext('2d');
canvas.width =1280;
canvas.height=800;
//canvas.width=window.innerWidth;
//canvas.height=window.innerHeight;
//windowHalfX = window.innerWidth / 2;
//windowHalfY = window.innerHeight / 2;
//ctx.fillStyle='#fff';
//ctx.font='normal normal 32px/40px san-serif';
//ctx.textAling='left';
//ctx.textBaseline='top';

/*
stage = new createjs.Stage("visualizer");

// オブジェクトの作成
shape = new createjs.Shape();
shape.graphics.beginFill("DarkRed");
shape.graphics.drawCircle(0, 0, 40);
stage.addChild(shape);

// tick イベントを登録する
createjs.Ticker.addEventListener("tick", handleTick);*/
ObjectP.push(new CirclePP(ctx));
//ObjectP.push(new CirclePP(ctx));
/*
Str.push(new StringtoImage("ああ",200));
Str.push(new StringtoImage("★",200));
Str.push(new StringtoImage("●",200));
Str.push(new StringtoImage("▽",200));
Str.push(new StringtoImage("🔷",200));

Str.push(new StringtoImage("早めの調整",100));
*/
//Str.push(new StringtoImage("This",200));
Str.push(new StringtoImage("🍎",200));

//Str.push(new StringtoImage("✒︎",200));
Str.push(new StringtoImage("🍍",200));
Str.push(new StringtoImage("💢",200));
Str.push(new StringtoImage("🌟",200));
Str.push(new StringtoImage("💉",200));
Str.push(new StringtoImage("💉Java",100));
Str.push(new StringtoImage("🍀",200));
Str.push(new StringtoImage("❄️",200));
Str.push(new StringtoImage("✒︎🍍🍎✒︎",100));
//Str.push(new StringtoImage("あばば",200));

//ObjectP.push(new FractalRoot(ctx,{x:640,y:400}));
//ObjectP.push(new HexagonF(ctx,{x:640,y:400}));
//console.log("xx");
//document.addEventListener( 'click', onDocumentMouseClick, false );
//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
//window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
  //if (frameCount%6===1){saveimg("visualizer")}
  //if (frameCount%2==1)ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.clearRect(0,0,canvas.width,canvas.height);

   frameCount = requestAnimationFrame(animate);//描画開始から何フレーム目か分かる。
    //stats.update();

    if (frameCount===10){
			//for (var i=0;i<Str.length;i++){
			ObjectP[0].srandom(false);
			for (var i=0;i<Str.length;i++){
				var to=[];
				to=Str[i].getrandom(ObjectP[0].amount);
				ObjectP[0].setf([to],[random(300,700)|0]);
			}
					//var to=[];

						//	to=Str[random(Str.length)|0].getrandom(ObjectP[0].amount);

					//ObjectP[0].srandom(false);

					//ObjectP[0].setf([to],[random(300,700)|0],(Math.random()>0.9));
					//ObjectP[1].srandom(false);

					//ObjectP[1].setf([to],[random(100,500)|0],(Math.random()>0.9));

			//}
      //var from=[],to=[];
			//var to=[];
                //var tmp={x:random(1260),y:random(780)};
                //var tmp2={x:random(1260),y:random(780)};
			//var tmp=random(Str.length)|0;
      //for (var i=0;i<ObjectP[0].amount;i++){
          //from[i]={x:random(frameCount,frameCount+10),y:random(100,700)};
          //var c=Math.random();
          //to[i]={x:tmp.x*c+tmp2.x*(1-c),y:tmp.y*c+tmp2.y*(1-c)};
			//		to[i]=Str[tmp].getrandom();
    //  }
      //ObjectP[0].setf([to],[200],(Math.random()>0.9));
    }
    updateParam();
		//ctx.fillStyle='#f00';
		//ctx.fillText('🍍', 120, 240);
}

function updateParam() {
  ObjectP.forEach(function(e){e.update()});
//  console.log("OK");
}


function onDocumentMouseMove( event ) {
  if (flg){
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  }
}
function onDocumentMouseClick( event ) {
  if (flg){
  mouseX = 0;
  mouseY = 0;
  flg=false;
  }
  else{
    flg=true;
  }
}

function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function handleTick(event) {
    // マウス座標を取得する
    var mx = stage.mouseX;
    var my = stage.mouseY;
    // シェイプをマウスに追随させる
    shape.x = mx;
    shape.y = my;

    // 画面を更新する
    stage.update();
}
$('#saveimg').on('click',function(e){
  e.stopPropagation();
	e.preventDefault();
	saveimg("visualizer");
});
