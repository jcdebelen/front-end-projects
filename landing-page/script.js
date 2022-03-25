var video = document.getElementById("video");
video.addEventListener("canplay", function() {
  setTimeout(function() {
    video.play();
  }, 1500);
});

document.querySelector('video').playbackRate = 0.8;

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

// function myFunction(x) {
//   x.classList.toggle("change");
// }