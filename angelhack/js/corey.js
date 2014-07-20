  function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;
  var input;

  function startUserMedia(stream) {
    input = audio_context.createMediaStreamSource(stream);
    //__log('Media stream created.');
    

    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    //recorder = new Recorder(input);
    //__log('Recorder initialised.');
  }

  function startRecording(button) {
    var audioGain = audio_context.createGain();
    audioGain.gain.value = 0;
    input.connect(audioGain);
    audioGain.connect(audio_context.destination);
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    //__log('Recorder initialised.');

    recorder.record();
    //button.disabled = true;
    //button.nextElementSibling.disabled = false;
    document.getElementById("realstop").disabled = false;
    document.getElementById("start").innerHTML = "Pause";
    document.getElementById("start").id = "pause";
    document.getElementById("pause").onclick = function(){ stopRecording(); };
    //__log('Recording...');
  }

  function resumeRecording(button) {
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    //recorder = new Recorder(input);
    //__log('Recorder initialised.');

    recorder.record();
    //button.disabled = true;

    //button.nextElementSibling.disabled = false;


    //document.getElementById("pause").disabled = false;
    document.getElementById("realstop").disabled = false;
    //document.getElementById("realstop").disabled = false;
    document.getElementById("resume").innerHTML = "Pause";
    document.getElementById("resume").id = "pause";
    document.getElementById("pause").onclick = function(){ stopRecording(); };
    //__log('Recording...');
  }

  function stopRecording(button) {
    //input.disconnect();
    //alert('dfdfd');
    recorder.stop();
    //button.disabled = true;
    //button.previousElementSibling.disabled = false;
    //document.getElementById("start").disabled = false;
    document.getElementById("realstop").disabled = false;
    document.getElementById("pause").innerHTML = "Resume";
    document.getElementById("pause").id = "resume";
    document.getElementById("resume").onclick = function(){ resumeRecording(); };
    __log('Pause!');
    
    // create WAV download link using audio data blob
  }

  function realStopRecording(button) {
    input.disconnect();
    recorder.stop();
    button.disabled = true;
    //document.getElementById("start").disabled = false;
    //button.previousElementSibling.disabled = true;
    __log('Done!');
    
    // create WAV download link using audio data blob
    createDownloadLink();
    recorder.clear();
  }

  function createDownloadLink() {
      //alert('penisssss');
      recorder && recorder.exportWAV(function(blob) {
      __log('Blahhhhh');
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      //alert('ghosadiofj');

      
      au.controls = false;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      //console.log('hf.download hit');
      //document.getElementById("downish").download = hf.download;
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }

  window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      __log('Real niggas set');
      __log('Fashoooo, ' + (navigator.getUserMedia ? 'you ready.' : 'yous a bitch its not gon work!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      __log('No live audio input: ' + e);
    });


  };