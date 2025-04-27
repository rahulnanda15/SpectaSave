// @input SceneObject left
// @input SceneObject right
// @input SceneObject imageObject
// @input float threshold = 10.0
// @input Component.AudioComponent audioTrack // ✅ Add an Audio Component input

function getWorldPosition(obj) {
    var t = obj.getTransform();
    return t.getWorldPosition();
}

function checkDistance() {
    var leftPos = getWorldPosition(script.left);
    var rightPos = getWorldPosition(script.right);

    if (!leftPos || !rightPos) {
        return;
    }

    var distance = leftPos.distance(rightPos);

    print("Distance between right and left hand: " + distance); // << DEBUG line

    // Show or hide the image
    if (distance < script.threshold) {
        script.imageObject.enabled = true;
        
        // ✅ Play the audio if not already playing
        if (!script.audioTrack.isPlaying()) {
            script.audioTrack.play(1); // Play once
        }

    } else {
        script.imageObject.enabled = false;

        // ✅ Stop the audio if playing
        if (script.audioTrack.isPlaying()) {
            script.audioTrack.stop(false); // false = stop immediately
        }
    }
}

// Update every frame
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(checkDistance);