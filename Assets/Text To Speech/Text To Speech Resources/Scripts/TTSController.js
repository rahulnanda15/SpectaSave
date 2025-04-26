// TextToSpeechController.js
// Modified to provide CPR audio guidance
// Version: 1.0.0

// @input Asset.TextToSpeechModule tts {"label": "Text To Speech"}
// @input Component.AudioComponent audio
// @input float voicePace {"widget":"slider", "min":0.75, "max":1.50, "step":0.25}

// CPR Emergency Variables
var isEmergencyActive = false;
var cprInstructions = [
    "Person unresponsive. Begin emergency procedure.",
    "First: Check for breathing. Look for chest movement, listen for breath sounds.",
    "No normal breathing detected. Second: Call emergency services immediately.",
    "Third: Position person on back on firm surface. Kneel beside them.",
    "Fourth: Place heel of one hand on center of chest, other hand on top.",
    "Fifth: Push hard and fast. Compress chest 2 inches deep at 100-120 beats per minute.",
    "Continue compressions until help arrives or person revives."
].join(" ");

function playCPRInstructions() {
    if (!isEmergencyActive) {
        isEmergencyActive = true;
        getTTSResults(cprInstructions);
    }
}

function playTTSAudio(audioTrackAsset, audioComponent) {
    if (audioComponent.isPlaying()) {
        audioComponent.stop();
    }
    audioComponent.audioTrack = audioTrackAsset;
    audioComponent.play(1);
}

function getTTSResults(text) {
    var options = TextToSpeech.Options.create();
    options.voiceName = "Sam";
    options.voicePace = script.voicePace * 100;
    
    script.tts.synthesize(text, options, 
        function(audioTrackAsset) {
            playTTSAudio(audioTrackAsset, script.audio);
        }, 
        function(error, desc) {
            print("TTS Error: " + error + " - " + desc);
        }
    );
}

// Connect to emergency detection system
script.createEvent("UpdateEvent").bind(function() {
    if (global.emergencyState && global.emergencyState.type === "cardiac_arrest") {
        playCPRInstructions();
    } else {
        isEmergencyActive = false;
    }
});

// Initialize component
function initialize() {  
    if (!script.tts) print("ERROR: Missing TTS module");
    if (!script.audio) print("ERROR: Missing Audio Component");
}

initialize();
