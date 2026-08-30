```javascript
const photo = document.getElementById("photo");
const gallery = document.getElementById("gallery");
const previousButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");


// YOUR PHOTOS
const images = [
  "photo-files/215403813.jpg",
  "photo-files/215542180.jpg",
  "photo-files/220347599.jpg"
];


let currentIndex = -1;
let timer = null;

let touchStartX = 0;


// Random number
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


// Random order
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


// Shuffle photos when page opens
let photoOrder = shuffle(images);


// Display a photo
function showImage(index) {

  if (photoOrder.length === 0) return;

  currentIndex =
    (index + photoOrder.length) % photoOrder.length;

  photo.style.opacity = "0";

  setTimeout(() => {

    photo.src = photoOrder[currentIndex];

    const scale = randomNumber(0.88, 1);
    const x = randomNumber(-3, 3);
    const y = randomNumber(-3, 3);
    const rotation = randomNumber(-2, 2);

    photo.style.transform =
      `translate(${x}vw, ${y}vh)
       rotate(${rotation}deg)
       scale(${scale})`;

    photo.onload = () => {
      photo.style.opacity = "1";
    };

  }, 250);

  scheduleNext();
}


// Next photo
function showNext() {
  showImage(currentIndex + 1);
}


// Previous photo
function showPrevious() {
  showImage(currentIndex - 1);
}


// Automatic change
function scheduleNext() {

  clearTimeout(timer);

  const delay =
    randomNumber(5000, 11000);

  timer =
    setTimeout(showNext, delay);
}


// Arrows
nextButton.addEventListener(
  "click",
  showNext
);

previousButton.addEventListener(
  "click",
  showPrevious
);


// Mobile swipe
gallery.addEventListener(
  "touchstart",
  event => {
    touchStartX =
      event.touches[0].clientX;
  },
  { passive: true }
);


gallery.addEventListener(
  "touchend",
  event => {

    const touchEndX =
      event.changedTouches[0].clientX;

    const difference =
      touchEndX - touchStartX;

    if (Math.abs(difference) < 50) {
      return;
    }

    if (difference < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }
);


// Start
showNext();
```
