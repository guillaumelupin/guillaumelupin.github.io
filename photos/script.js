const photo = document.getElementById("photo");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

const photos = [
  "photo-files/215403813.jpg",
  "photo-files/215542180.jpg",
  "photo-files/220347599.jpg"
];

let current = -1;
let timer;


// Random number
function random(min, max) {
  return Math.random() * (max - min) + min;
}


// Randomize order
photos.sort(() => Math.random() - 0.5);


// Show photo
function showPhoto(index) {

  current = (index + photos.length) % photos.length;

  photo.style.opacity = "0";

  setTimeout(() => {

    photo.src = photos[current];

    const scale = random(0.9, 1);
    const x = random(-2, 2);
    const y = random(-2, 2);
    const rotation = random(-1.5, 1.5);

    photo.style.transform =
      `translate(${x}vw, ${y}vh)
       rotate(${rotation}deg)
       scale(${scale})`;

    photo.onload = () => {
      photo.style.opacity = "1";
    };

  }, 300);

  clearTimeout(timer);

  timer = setTimeout(() => {
    showPhoto(current + 1);
  }, random(5000, 10000));
}


// Next
next.addEventListener("click", () => {
  showPhoto(current + 1);
});


// Previous
previous.addEventListener("click", () => {
  showPhoto(current - 1);
});


// Start
showPhoto(0);


// Mobile swipe
let startX = 0;

document.addEventListener("touchstart", event => {
  startX = event.touches[0].clientX;
});

document.addEventListener("touchend", event => {

  const endX = event.changedTouches[0].clientX;

  const distance = endX - startX;

  if (Math.abs(distance) < 50) {
    return;
  }

  if (distance < 0) {
    showPhoto(current + 1);
  } else {
    showPhoto(current - 1);
  }

});
