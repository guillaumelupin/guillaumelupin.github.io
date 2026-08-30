const photo = document.getElementById("photo");
const gallery = document.getElementById("gallery");
const previousButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let images = [];
let currentIndex = -1;
let timer = null;

let touchStartX = 0;
let touchStartY = 0;


// Get all photos from the GitHub folder
async function loadImages() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/guillaumelupin/guillaumelupin.github.io/contents/photo-files"
    );

    if (!response.ok) {
      throw new Error("Could not load photos");
    }

    const files = await response.json();

    images = files
      .filter(file => file.type === "file")
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name))
      .map(file => file.download_url);

    // Random order
    images.sort(() => Math.random() - 0.5);

    if (images.length > 0) {
      showNext();
    }

  } catch (error) {
    console.error("Photo loading error:", error);
  }
}


// Random number
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


// Show photo
function showImage(index) {

  if (!images.length) return;

  currentIndex = (index + images.length) % images.length;

  photo.style.opacity = "0";

  setTimeout(() => {

    photo.src = images[currentIndex];

    // Random size
    const scale = randomNumber(0.88, 1);

    // Small random movement
    const x = randomNumber(-3, 3);
    const y = randomNumber(-3, 3);

    // Small random rotation
    const rotation = randomNumber(-2.5, 2.5);

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


// Automatic scrolling
function scheduleNext() {

  clearTimeout(timer);

  // Random delay between 5 and 11 seconds
  const delay = randomNumber(5000, 11000);

  timer = setTimeout(showNext, delay);
}


// Desktop arrows
nextButton.addEventListener("click", showNext);
previousButton.addEventListener("click", showPrevious);


// Mobile swipe
gallery.addEventListener("touchstart", event => {

  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;

}, { passive: true });


gallery.addEventListener("touchend", event => {

  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Ignore vertical movement
  if (
    Math.abs(deltaX) < 50 ||
    Math.abs(deltaX) < Math.abs(deltaY)
  ) {
    return;
  }

  if (deltaX < 0) {
    showNext();
  } else {
    showPrevious();
  }

});


// Start
loadImages();
