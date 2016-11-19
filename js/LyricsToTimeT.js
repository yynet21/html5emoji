function LyricsToTextT(file){
  this.l=[];
  this.tag=[];
  //sthis.l[0]={start:}
  /*歌詞の性質上時間と歌詞は一対一対応するべきである*/
  var array = new Uint8Array(file);
 // 文字コードを取得
 switch (Encoding.detect(array)) {
 case 'UTF16':
     // 16ビット符号なし整数値配列と見なす
     array = new Uint16Array(file);
     break;
 case 'UTF32':
     // 32ビット符号なし整数値配列と見なす
     array = new Uint32Array(file);
     break;
  };
     // Unicodeの数値配列に変換
    var unicodeArray = Encoding.convert(array, 'UNICODE');
     // Unicodeの数値配列を文字列に変換
    var  text = Encoding.codeToString(unicodeArray);
    var lyric = text.split(/\r\n|\r|\n/);
/*考えとしては歌詞分割にはそこまで時間がかからないので即時に実行*/
      var flag=true;
      for (var i=0;i<lyric.length;i++){
       var tmp ="";
       var time="";
        for (var j=0;j<lyric[i].length;j++){
             if (lyric[i][j]=="[" || lyric[i][j]=="]"){
               flag =(lyric[i][j]=="[") ? false :true;
               continue;
             }
             if (flag)tmp+=lyric[i][j];
             else{time+=lyric[i][j];}
        }
            //なんかイマイチな実装
          //  console.log(time);
           var seconds;
            if (time.match(/^([0-9][0-9]):([0-5][0-9])[:.]([0-9][0-9])$/)){
               seconds=(time.substring(0,2) | 0)*60+(time.substring(3,5)|0)+(time.substring(6,8)|0)/100;
               if(this.l.length&&!this.l[this.l.length-1].end)this.l[this.l.length-1].end=seconds;//console.log(seconds);
               if (tmp)this.l.push({start:seconds,lyrics:tmp,end:null});
          }
            else if (time.match(/^([0-9][0-9]):([0-5][0-9])$/)){
               seconds=(time.substring(0,2) | 0)*60+(time.substring(3,5)|0);
            //console.log(time,seconds);
               if (this.l.length&&!this.l[this.l.length-1].end)this.l[this.l.length-1].end=seconds;//console.log(seconds);
               if (tmp)this.l.push({start:seconds,lyrics:tmp,end:null});
           }else if(time.substring(0,3)==="ti:"||time.substring(0,3)==="ar:"||time.substring(0,3)==="al:"){
             this.tag[time.substring(0,2)]=time.substring(3,time.length);
           }
           else{

             if (tmp)this.l.push({start:null,lyrics:tmp,end:null});
           }
    }
    for (var i=0;i<this.l;i++){
      if (this.l[i].start){this.l[i].start=-1;}
      if (this.l[i].end){this.l[i].end=-1;}

    }
    console.log(this.l,this.tag);

}
