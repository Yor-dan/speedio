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

function keyDownHandler(event) {
  if (event.code === controlKey) {
    event.stopImmediatePropagation();

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

    if (isSpeeding) {
      speedNormal();
      isSpeeding = false;
    } else {
      togglePlayPause();
    }

    clearTimeout(keyPressTimer);
  }
}

document.addEventListener('keydown', keyDownHandler, true);
document.addEventListener('keyup', keyUpHandler, true);
