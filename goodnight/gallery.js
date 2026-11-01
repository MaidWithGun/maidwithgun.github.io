const screenshots = [...document.querySelectorAll('.shot')];
const lightbox = document.querySelector('.lightbox');
const image = lightbox.querySelector('.lightbox-image');
const counter = document.querySelector('#image-counter');
let current = 0;

function showScreenshot(index) {
  current = (index + screenshots.length) % screenshots.length;
  image.src = screenshots[current].href;
  image.alt = screenshots[current].querySelector('img').alt;
  counter.textContent = `${current + 1} / ${screenshots.length}`;
}

screenshots.forEach((link, index) => {
  link.addEventListener('click', (event) => {
    if (!lightbox.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showScreenshot(index);
    lightbox.showModal();
  });
});

lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.previous').addEventListener('click', () => showScreenshot(current - 1));
lightbox.querySelector('.next').addEventListener('click', () => showScreenshot(current + 1));
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showScreenshot(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
lightbox.addEventListener('click', (event) => {
  const bounds = lightbox.getBoundingClientRect();
  if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
});
