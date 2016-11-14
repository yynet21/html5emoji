
$(function(){
  var text;        //$("#res").text("reader.result");
  $("#file2").change(function(e){
      var reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);

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
  });
});

/** カタカナをひらがなに変換する関数
 * @param {String} src - カタカナ
 * @returns {String} - ひらがな
 */

 /*
 現時点ではLRCフォーマットのみに対応->１行に一つのタイムタグ対応？
 */


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

function katakanaToHiragana(src) {
	return src.replace(/[\u30a1-\u30f6]/g, function(match) {
		var chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
}
