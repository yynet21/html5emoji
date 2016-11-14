
var reader;
var progress = document.querySelector('.percent');
window.URL = window.URL || window.webkitURL;


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

  for (var i = 0, f; f = files[i]; i++) {

     if (f.type.match('text.*')||f.name.slice(-4)===".lrc"||f.name.slice(-4)===".kar") {

      var text;
      var reader = new FileReader();
      //読込終了後の処理
      reader.onload = function(e){

        var array = new Uint8Array(e.target.result);


      };
      reader.readAsArrayBuffer(f);//まずはここで処理！
    }
  }
}
 function split_kasi(kasi){

     ObjectL.push(new LyricsP(time_l,kasi_l));
 }
document.getElementById('files').addEventListener('click', function(e){
  e.stopPropagation();
}, false);
document.getElementById('files').addEventListener('change', function(e){
	handleFileSelect(e);
}, false);
