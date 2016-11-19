//CSVファイルを読み込む関数getCSV()の定義
function getCSV(file){
  var result = []; // 最終的な二次元配列を入れるための配列
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", file, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
      var tmp = req.responseText.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
      for(var i=0;i<tmp.length;++i){
          result[i] = tmp[i].split(',');
      }
    }

    return result;
}
