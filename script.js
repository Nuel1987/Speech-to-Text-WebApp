const transcriptionDiv = document.getElementById('transcription');
const startStopBtn = document.getElementById('startStopBtn');

let recognition;
let isRecording = false;

// Check for browser support
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    transcriptionDiv.textContent = "Listening...";
    startStopBtn.textContent = "Stop Recording";
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcriptionDiv.textContent = transcript.trim();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    isRecording = false;
    startStopBtn.textContent = "Start Recording";
  };
} else {
  transcriptionDiv.textContent = "Speech Recognition not supported in this browser.";
  startStopBtn.disabled = true;
}

// Start/Stop Recording
startStopBtn.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
    isRecording = true;
  }
});
