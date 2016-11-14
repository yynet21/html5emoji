/*
時間の管理をどうにかしなければならない

例えば一時停止したらどうなるのかなど
f(_t())->x,y,zが良い
歌詞の配置はどうなるか？
基本はカメラの位置が意味を持つと考える
カメラからの相対座標
しかし、この場合カメラが回転しなければz座標を負に加えるだけで良いが
カメラの法線ベクトルを考える必要がある。
*/
var reader;
var progress = document.querySelector('.percent');
window.URL = window.URL || window.webkitURL;
//var Video_src = document.getElementById("thumb");

function abortRead() {
  reader.abort();
}

function errorHandler(evt) {
  switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      alert('An error occurred reading this file.');
  };
}

function updateProgress(evt) {
  console.log("update");
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
function updateonLoadS(){
    document.getElementById('progress_bar').className = 'loading';
}
function updateonLoad(){
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
}
function handleFileSelect(e) {

  var files = e.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (f.type.match('video.*')) {
          var mime = "video/mp4";
           if(Video_src.src){
              Video_src.pause();
              window.URL.revokeObjectURL(Video_src.src) ;
            }
          Video_src.onloadeddata = function(){

              // 最大横幅を640にする
              var size = 640;
              if(Video_src.videoWidth > size){
                var aspectratio = Video_src.videoWidth / size;
                var another = Math.round(Video_src.videoHeight / aspectratio);

                Video_src.width  = size;
                Video_src.height = another;
              }else{
                Video_src.width  = Video_src.videoWidth;
                Video_src.height = Video_src.videoHeight;
              }

                tick();
              // 再生
              Video_src.play();
              for (var i=0;i<3;i++)
                for (var j=0;j<3;j++){
              //ObjectP.push(new Television(-300+Video_src.width/3*j,-100+Video_src.height*i/3,-600,Video_src,j/3,i/3,1/3,1/3));
              //ObjectP.push(new Television(-300+Video_src.width/3*j,-100+Video_src.height*i/3,-600,Video_src));
              }
                ObjectP.push(new FractalRoot(0,0,-1000));
            };
        function tick(){
          //console.log(Video_src.currentTime);         
          //requestAnimationFrame(tick);
          /*$('#visualizer2') .css({opacity: 0.7});;
        src_ctx.drawImage(Video_src,100,0,Video_src.width,Video_src.height);
        src_ctx.drawImage(Video_src,1100,600,Video_src.width,Video_src.height);
        src_ctx.drawImage(Video_src,600,300,Video_src.width,Video_src.height);
        src_ctx.drawImage(Video_src,100,600,Video_src.width,Video_src.height);
        src_ctx.drawImage(Video_src,1100,0,Video_src.width,Video_src.height);*/
        }
        
        Video_src.src = window.URL.createObjectURL(new Blob([f], { type: mime }));

    //  continue;
    }
    console.log(f.name.slice(-4));
     if (f.type.match('text.*')||f.name.slice(-4)===".lrc"||f.name.slice(-4)===".kar") {

      var text;
      var reader = new FileReader();
      //読込終了後の処理
      reader.onload = function(e){

        var array = new Uint8Array(e.target.result);

         // 文字コードを取得
         switch (Encoding.detect(array)) {
         case 'UTF16':
             // 16ビット符号なし整数値配列と見なす
             array = new Uint16Array(e.target.result);
             break;
         case 'UTF32':
             // 32ビット符号なし整数値配列と見なす
             array = new Uint32Array(e.target.result);
             break;
         }

         // Unicodeの数値配列に変換
        var unicodeArray = Encoding.convert(array, 'UNICODE');
         // Unicodeの数値配列を文字列に変換
          text = Encoding.codeToString(unicodeArray);


        var kasi = text.split(/\r\n|\r|\n/);

      split_kasi(kasi);
      //setImage();

      };
      reader.readAsArrayBuffer(f);//まずはここで処理！
    }/*
    else if (!f.type.match('text.*')) {
      continue;
    }*/

    else if (f.type.match('audio.*')) {
        progress.style.width = '0%';
        progress.textContent = '0%';
      	mp.add(f);
    }

  //  var reader = new FileReader();
//document.querySelector("#thumb").style.display = "none";
    // Closure to capture the file information.
  //  reader.onload = function(ev) {
      //return function(e) {
        // Render thumbnail.
        /*var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);*/
      //  var audio = document.querySelector('');
    //var context = new AudioContext();
  //document.querySelector("#thumb").src = ev.target.result;
  //console.log(ev.target.result);
  //document.querySelector("#thumb").style.display = "block";
    //var source = context.createMediaElementSource(ev.target.result);
    //source.connect(context.destination);
    //audio.play();
    //Video_src.src = URL.createObjectURL(ev.target.result);
  //  console.log(x);
    //  };
  //  })(f);
/*
    // Read in the image file as a data URL.
      var context = new AudioContext();
      var source = context.createMediaElementSource(f);
      source.connect(context.destination);
      f.play();}*/
  //  reader.readAsArrayBuffer(f);
  }
}
 function split_kasi(kasi){
   var time_l=[];
   var kasi_l=[];
	 var flag=true;
	 for (var i=0;i<kasi.length;i++){
		var tmp ="";
		var time="";
		 for (var j=0;j<kasi[i].length;j++){
			if (kasi[i][j]=="[" || kasi[i][j]=="]"){
				flag =(kasi[i][j]=="[") ? false :true;
				continue;
			}
			if (flag)tmp+=kasi[i][j];
			else{time+=kasi[i][j];}
		 }
		 //console.log(time);
		var time_kasi,byo;
		 if (time.match(/^([0-9][0-9]):([0-5][0-9])[:.]([0-9][0-9])$/)){
				byo=(time.substring(0,2) | 0)*60+(time.substring(3,5)|0)+(time.substring(6,8)|0)/100;
				time_l.push(byo);//console.log(byo);
				kasi_l.push(tmp);
		}
		 if (time.match(/^([0-9][0-9]):([0-5][0-9])$/)){
			 	byo=(time.substring(0,2) | 0)*60+(time.substring(3,5)|0);
				time_l.push(byo);//console.log(byo);
				kasi_l.push(tmp);
		}
    //ObjectP.push(new LyricsP([15.39,20.00,38.78],["人の金で","焼肉を","食べたい"]));


		 //console.log(tmp);
	 }

     ObjectL.push(new LyricsP(time_l,kasi_l));
 }
document.getElementById('files').addEventListener('click', function(e){
  e.stopPropagation();
}, false);
document.getElementById('files').addEventListener('change', function(e){
	handleFileSelect(e);
}, false);