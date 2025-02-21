function getVideo() {
  return document.querySelector('video');
}

function speedDouble() {
  getVideo().playbackRate = 2.0;
}

function speedNormal() {
  getVideo().playbackRate = 1.0;
}

function togglePlayPause() {
  getVideo().paused ? getVideo().play() : getVideo().pause();
}

const controlKey = 'Space';
let keyPressTimer = null;
let isSpeeding = false;

function isInputField(event) {
  return event.target.matches(
    'input[type="text"], textarea, [contenteditable]'
  );
}

function keyDownHandler(event) {
  if (event.code === controlKey) {
    event.stopImmediatePropagation();

    // allow input fields to work normally
    if (!isInputField(event)) event.preventDefault();

    if (!isSpeeding) {
      keyPressTimer = setTimeout(() => {
        speedDouble();
        isSpeeding = true;
      }, 200);
    }
  }
}

function keyUpHandler(event) {
  if (event.code === controlKey) {
    event.stopImmediatePropagation();

    // allow input fields to work normally
    if (!isInputField(event)) event.preventDefault();

    if (isSpeeding) {
      speedNormal();
      isSpeeding = false;
    } else {
      if (!isInputField(event)) togglePlayPause();
    }

    clearTimeout(keyPressTimer);
  }
}

// Remove existing event listeners to avoid duplicates
document.removeEventListener('keydown', keyDownHandler, true);
document.removeEventListener('keyup', keyUpHandler, true);

document.addEventListener('keydown', keyDownHandler, true);
document.addEventListener('keyup', keyUpHandler, true);
