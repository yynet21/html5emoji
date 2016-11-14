var ImageSaveNumber=1;
function saveimg(id){

	var _file ="save"+("0000"+ImageSaveNumber).slice(-4)+".png";
	ImageSaveNumber++;
  var canvas =document.getElementById(id);
	canvas.toBlob(function (_blob){
			if( /*@cc_on ! @*/ false )
		{	// IE�̏ꍇ
			window.navigator.msSaveBlob(_blob, _file);
		}
    else
    {
        var url = (window.URL || window.webkitURL);
        var data = url.createObjectURL(_blob);
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.href = data;
        a.download = _file;
        a.dispatchEvent(e);
    }

	});
    //var base64 = canvas.toDataURL();    // firfox�Ȃ�toblob�Œ���blob�ɂ��ĕۑ��ł��܂��B
   // var blob = Base64toBlob(base64);
   //saveBlob(blob,"default.png");
}
