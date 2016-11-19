function InputFiles(id,fn){
  document.getElementById(id).addEventListener('change',function (e){
    for (var i = 0, f; f = e.target.files[i]; i++){
      fn.call(f);//汎用性が高くなるコードs
    }
  }, false);
}
