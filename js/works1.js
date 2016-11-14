		//	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
﻿var frameCount;
var ObjectP=[];
var ObjectL=[];
var renderer, scene, camera, controls;
var flg=false;//マウスで移動可能か
var mouseX = 0, mouseY = 0;
var z,stats;
var windowWidth, windowHeight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var canvas,canvas2,ctx,src_canvas,src_ctx;
var Video_src,Img_src,Audio_src;
var mp=new MusicPlayP();
var _t;
 var directionalLight=[];
//console.log(mouseX,mouseY);
init();
animate();
function init(){
  canvas = document.getElementById('visualizer'); //オブジェクトなので0という形で指定
  Video_src = document.createElement("video");
  Img_src = document.createElement("img");
  Audio_src = document.createElement("audio");

    src_canvas = document.getElementById("visualizer2");
     src_ctx = src_canvas.getContext("2d");
  if (canvas.getContext){ ctx = canvas.getContext('2d');}
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  src_canvas.width=window.innerWidth;
  src_canvas.height=window.innerHeight;

  scene = new THREE.Scene();

        var  container = document.getElementById( 'container' );

  				canvas2 = document.createElement( 'canvas' );
  				canvas2.width = 128;
  				canvas2.height = 128;

  				var context = canvas2.getContext( '2d' );
    // canvasのサイズを指定
	//var canvas2 = document.getElementById('canvas');
	//WebGLRendererの設定
  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.id = 'visualizer0';
	container.appendChild(renderer.domElement);
  //renderer.shadowMap = true;
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  //  document.body.appendChild(renderer.domElement);

	// レンダラーの背景色の設定
	//renderer.setClearColor(`hsl(${noise(0,0,t)*360}, 40%, 75%)`, 1.0);


   //ライトの位置＋シーンに追加
  //  directionalLight[0] = new THREE.PointLight(0xffffff, 10,10000,0.1);
   //directionalLight[0].position.set(0, 7, 10);


  // var spotLightShadowHelper = new THREE.CameraHelper( directionalLight[0].shadow.camera);
   //scene.add( spotLightShadowHelper);
  // var spotLightHelper = new THREE.SpotLightHelper( directionalLight[0]);
   //scene.add( spotLightHelper);

   //directionalLight[0].castShadow = true;
   //scene.add(directionalLight[0]);
   /*
   var pointLight = new THREE.PointLight(0xffffff, 2, 1500);
   //pointLight = new THREE.PointLight(0xffffff, 1);
   pointLight.position.set(0, 1000, -100);
   pointLightHelper = new THREE.PointLightHelper(pointLight, 1);

   var pointLight2 = new THREE.PointLight(0xffff00, 2, 1000);
   pointLight2.position.set(300, 300, 300);

   var pointLight3 = new THREE.PointLight(0xff00ff, 2, 1000);
   pointLight3.position.set(-300, -300, 300);
   scene.add(pointLight);
   scene.add(pointLight2);
   scene.add(pointLight3);*/
	//環境光の設定
//	var ambient = new THREE.AmbientLight(0xffffff);
  //scene.add(ambient);

  //きりの設定
  scene.fog = new THREE.Fog(0x111111, 1000,2000);

 //地面の設定
 	var pgeometry = new THREE.PlaneGeometry(300,3000);
	var pmaterial = new THREE.MeshLambertMaterial({color:"#0096d6",side:THREE.DoubleSide});
	var plane = new THREE.Mesh(pgeometry, pmaterial);
	plane.position.set(0,0,0);
	plane.rotation.x = 90 * Math.PI / 180;
	//scene.add(plane);
  var grid = new THREE.GridHelper(5000, 50);
  for (var i=0;i<1000;i++){
  ObjectP.push(new CubeU((random(2)>=1)?random(30,300):random(-300,-30),random(0,600),random(-10000,-500)));
}
  //シーンオブジェクトに追加
  scene.add(grid);
	//camera.position.set(0, 0, 800);
  //camera.position.y = 100;
 controls= new THREE.OrbitControls(camera, renderer.domElement);

  /*駅などの設置
  */
  //ObjectP.push(new LyricsP([15.39,20.00,38.78],["人の金で","焼肉を","食べたい"]));
    stats = new Stats();
    stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
    stats.domElement.style.position = "fixed";
    stats.domElement.style.left     = "5px";
    stats.domElement.style.top      = "600px";
    container.appendChild(stats.domElement);
    /*stats = new Stats();
				container.appendChild( stats.dom );*/
  //ObjectP.push(new Stations());
  //ObjectP.push(new KochP(0,0,0));
  ObjectP.push(new FractalRoot(0,0,0));
  document.addEventListener( 'click', onDocumentMouseClick, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
  _t=getElapsed();
}

  function updateAll(){
  	//if(frameCount%6===1)saveimg("visualizer0");
    z= -_t()*100;//パソコンの奥がマイナスの方向
  	var offset =-600+0*cos(z/1000);
    //camera.updateCamera( camera, scene, mouseX, mouseY );
  	camera.position.set(0, 250, z);
    //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    //camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  	camera.lookAt(new THREE.Vector3(mouseX, -mouseY+250, z+offset));
    //camera.rotation.z = _t();
    //console.log(mouseX,mouseY);
  	  	//var l=(noise(0,0,z/5)*20)|0;
    renderer.setClearColor(`hsl(0, 0%, ${5}%)`, 1.0);
    //directionalLight[0].position.z=camera.position.z-100;
          //console.log(l,noise(-z/100),z);
   // renderer.setClearColor(`hsl(${noise(0,0,frameCount*0.01)*180+180}, 40%, 75%)`, 1.0);
  //  if (frameCount%10===0)ObjectP.push(new CubeU((random(2)>=1)?random(30,400):random(-400,-30),random(0,600),random(z+offset*1,z+offset*2)));
   // if (frameCount%100===0)ObjectP.push(new Plane((random(2)>=1)?random(30,400):random(-400,-30),100,random(z+offset*3,z+offset*2)));

    if (frameCount%1===0){
      ObjectP.forEach(function(e){
        e.draw();
      });
      ObjectL.forEach(function(e){
        e.draw();
        });
/*歌詞は追加するときだけObjectP.oushすれば良い*/
    }
 // if (mp.time!==-1)console.log(mp.time());

  }


function update2() {
    /*ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 400, 0, 2*Math.PI, false);
    ctx.stroke();
    for (var i=0;i<1000;i++){
      var tmp =i/100;
      var j=tmp-Math.sqrt(tmp);
      j*=100;
      //console.log(j);
      ctx.fillRect(i,j,1,1);
    }

    console.log(noise(0,0,frameCount)*360,frameCount);*/
}

    function animate() {
       frameCount = requestAnimationFrame(animate);//描画開始から何フレーム目か分かる。
        updateAll();
      //  controls.update();
        renderer.render(scene, camera);
        update2();
        stats.update();
        //console.log(noise(0,0,frameCount)*360,frameCount);
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
    function onWindowResize() {

      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
      src_canvas.width=window.innerWidth;
      src_canvas.height=window.innerHeight;

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
