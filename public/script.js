const form = document.getElementById('text-form');
const input = document.getElementById('text-input');
const submitButton = document.getElementById('submit-button');
const recordButton = document.getElementById('record-button');
const recognizedText = document.getElementById('recognized-text');


//SPEAKING STARTS HERE
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const text = input.value;
  console.log("frontend value being sent: ", text);

  fetch("/process-text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"

    },
    body: JSON.stringify({text})  })
  .then(response => response.json())
  .then(data => {

    console.log("backend response 1: ", data.message);
    console.log("backend response 2: ", data.processedText);

  })
  .catch(error => {
    console.error("Error", error);
  })


  // // Create a SpeechSynthesisUtterance object
  // const msg = new SpeechSynthesisUtterance();
  // msg.text = text;

  // // Call the speech synthesis API to generate speech
  // window.speechSynthesis.speak(msg);

  // Clear the input
  input.value = '';
});



//LISTENING STARTS HERE
recordButton.addEventListener('click', function() {
  // Enumerate available audio input devices and populate the dropdown
  navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
          const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
          if (audioInputDevices.length === 0) {
              // console.log('No audio input devices available.');
              alert('No audio input devices available.')

          } else {
              // console.log('Available audio input devices:');
              // audioInputDevices.forEach(device => console.log(device.label));
              const selectedDeviceId = audioInputDevices[0].deviceId; // Select the first device by default
              startRecognitionWithSelectedDevice(selectedDeviceId);
          }
      })
      .catch(function(err) {
          console.error('Error enumerating media devices:', err);
          alert('Error enumerating media devices: ' + err);
      });

  // Function to start speech recognition with the selected input device
  function startRecognitionWithSelectedDevice(deviceId) {
      const constraints = { audio: { deviceId: { exact: deviceId } } };

      // Get user media stream with the selected device
      navigator.mediaDevices.getUserMedia(constraints)
          .then(function(stream) {
              // Use the selected stream for annyang
              annyang.start({ autoRestart: false, continuous: false, stream: stream });

               // Start recognition using annyang library
    annyang.start({ autoRestart: false, continuous: false });
  
    // Update UI when recognition starts
    recordButton.disabled = true;
    recordButton.textContent = 'Recording...';
    recognizedText.textContent = '';
  
    // Set a timer to stop recognition after 10 seconds
    const recognitionTimeout = setTimeout(function() {
      stopRecognition();
    }, 3000); // 10 seconds in milliseconds
  
    // Process recognized result
    const resultCallback = function(phrases) {
      const transcript = phrases[0];
  
      // Display recognized text
      recognizedText.textContent = `Recognized Text: ${transcript}`;
      // updating innerHTML for text input
      document.getElementById('text-input').value = transcript;
      // console.log("here is the phrase: ");
      // console.log(transcript);
      // document.getElementById('submit-button').click(); //speaking
  
      // Stop recognition and clear the timeout
      stopRecognition();
    };
  
    annyang.addCallback('result', resultCallback);
  
    function stopRecognition() {
      annyang.abort(); // Stop recognition
      clearTimeout(recognitionTimeout); // Clear the recognition timeout
  
      // Remove the 'result' callback to avoid adding duplicates
      annyang.removeCallback('result', resultCallback);
  
      // Update UI after recognition stops
      recordButton.disabled = false;
      recordButton.textContent = 'Record';
    }
          })
          .catch(function(err) {
              console.error('Error accessing user media:', err);
          });
  }
});  
