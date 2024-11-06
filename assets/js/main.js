// Mobile Menu Toggle
window.onload = function() {
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
};

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black', 'bg-opacity-90', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
    // Optionally, change text color here
    } else {
        navbar.classList.remove('bg-black', 'bg-opacity-90', 'shadow-lg');
        navbar.classList.add('bg-transparent');
    // Optionally, revert text color here
    }
});


function updateNavHeight() {
    const nav = document.querySelector('#navbar');
    const navHeight = nav.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', `${navHeight + 10}px`);
}
  
// Update the variable on load and on window resize
window.addEventListener('load', updateNavHeight); 
window.addEventListener('resize', updateNavHeight);

/*  window.addEventListener('scroll', () => {
    const vinyl = document.querySelector('#vinyl');
    const scrollPos = window.scrollY;
    vinyl.style.transform = `rotate(${scrollPos}deg)`;
});

const vinyl = document.getElementById('vinyl');
let startY = 0;
let scrollStart = 0;

// Function to start dragging
function startDrag(event) {
  event.preventDefault();
  startY = event.clientY || event.touches[0].clientY;
  scrollStart = window.scrollY;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);
}

// Function to handle dragging
function onDrag(event) {
  const currentY = event.clientY || event.touches[0].clientY;
  const deltaY = currentY - startY;
  window.scrollTo(0, scrollStart - deltaY * 2); // Adjust the scroll speed by modifying the multiplier
}

// Function to stop dragging
function stopDrag() {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
}

vinyl.addEventListener('mousedown', startDrag);
vinyl.addEventListener('touchstart', startDrag);  */

/*  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }  */
