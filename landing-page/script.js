var video = document.getElementById("video");
video.addEventListener("canplay", function() {
  setTimeout(function() {
    video.play();
  }, 1500);
});

document.querySelector('video').playbackRate = 0.8;