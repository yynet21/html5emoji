$('#file').on('change',function(e){
	var file =e.target.files[0];
	var reader= new FileReader();

	if (!flag[1]){//曲の再生中に曲を入れ替えた場合
	source.stop(0);
	pause();
	}

	reader.onload = function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		var successCallback =function(data){
			buffer = audioContext;
			analyser.fftSize =2048;
			spectrums = new Uint8Array(analyser.frequencyBinCount);
			len =spectrums.length;
			$('#pauseB').html('PLAY');
			source = audioContext.createBufferSource();
			//bufferプロパティにAudioBufferインスタンスを設定
			source.buffer = buffer;
			//ループ
			source.loop = false;
			//AudioBufferSourceNodeインスタンスをdestinationプロパティに接続
			source.connect(audioContext.destination);
			source.connect(analyser);
			//GainNodeを作成する
			gainNode = audioContext.createGain();
			//sourceをGainNodeへ接続する
			source.connect(gainNode);
			//GainNodeをAudioDestinationNodeに接続
			gainNode.connect(audioContext.destination);
			gainNode.gain.value = 1;
			source.start = source.start || source.noteOn;
			source.stop  = source.stop  || source.noteOff;
      source.start(0,_time());
		};

		var errorCallback = function(){
			$('#pauseB').html('エラーが発生しました　音楽ファイルか確認してください。');
		};

		audioContext.decodeAudioData(reader.result, successCallback,errorCallback);

	};

	reader.readAsArrayBuffer(file);
	$('#pauseB').html('Loading...');
});
