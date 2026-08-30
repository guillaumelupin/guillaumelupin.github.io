const photo = document.getElementById("photo");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

const photos = [
  "photo-files/215403813.jpg",
  "photo-files/215542180.jpg",
  "photo-files/220347599.jpg"
];

let current = 0;
let timer;


// Random number
function random(min, max) {
  return Math.random() * (max - min) + min;
}


// Show a photo
function showPhoto(index) {

  current = (index + photos.length) % photos.length;

  photo.style.opacity = "0";

  setTimeout(function () {

    photo.src = photos[current];

    const scale = random(0.9, 1);
    const x = random(-2, 2);
    const y = random(-2, 2);
    const rotation = random(-1.5, 1.5);

    photo.style.transform =
      "translate(" + x + "vw, " +
      y + "vh) rotate(" +
      rotation + "deg) scale(" +
      scale + ")";

    photo.onload = function () {
      photo.style.opacity = "1";
    };

  }, 300);

  clearTimeout(timer);

  timer = setTimeout(function () {
    showPhoto(current + 1);
  }, random(5000, 10000));
}


// Next
next.onclick = function () {
  showPhoto(current + 1);
};


// Previous
previous.onclick = function () {
  showPhoto(current - 1);
};


// Start
showPhoto(0);
