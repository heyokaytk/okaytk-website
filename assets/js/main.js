// Mobile Menu Toggle
window.onload = function() {
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
};

// // Navbar Background Change on Scroll
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('nav');
//     if (window.scrollY > 50) {
//         navbar.classList.add('bg-black', 'bg-opacity-90', 'shadow-lg');
//         navbar.classList.remove('bg-transparent');
//     // Optionally, change text color here
//     } else {
//         navbar.classList.remove('bg-black', 'bg-opacity-90', 'shadow-lg');
//         navbar.classList.add('bg-transparent');
//     // Optionally, revert text color here
//     }
// });


// function updateNavHeight() {
//     const nav = document.querySelector('#navbar');
//     const navHeight = nav.offsetHeight;
//     document.documentElement.style.setProperty('--nav-height', `${navHeight + 10}px`);
// }
  
// // // Update the variable on load and on window resize
// window.addEventListener('load', updateNavHeight); 
// window.addEventListener('resize', updateNavHeight);

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


    
    // Fetch data and build the list dynamically
async function fetchCloudcasts() {
    try {
        const response = await fetch('https://api.mixcloud.com/heyokaytk/cloudcasts/');
        const data = await response.json();
        const cloudcasts = data.data.slice(0, 6);
        const listContainer = document.getElementById('cloudcast-list');
        
        // Clear the container before adding new content
        listContainer.innerHTML = '';

        cloudcasts.forEach(entry => {
            const tags = entry.tags.slice(0, 3).map(tag => `<span class="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded">${tag.name}</span>`).join(' ');
            
            const title = entry.name.split('-').map(part => `<p class="calligraffitti-regular text-[clamp(1rem, 5vw, 3rem)] flex justify-center">${part}</p>`).join('');

            console.log(title);

            const html = `
<!-- Cassette Body -->
<div class="relative w-[500px] h-[260px] rounded-lg shadow-lg" style="background-image: url('${entry.pictures.medium}');">
  
  <!-- Label Background -->
  <div class="absolute top-5 left-5 w-[460px] h-[134px] rounded-md z-50" style="background-color: rgba(255, 255, 255, 0.80);></div>
  
  <!-- Label Lines -->
  <div class="absolute top-[30px] left-20 w-[250px] border-t border-gray-400 z-0"></div>
  <div class="absolute top-[50px] left-20 w-[250px] border-t border-gray-400 z-0"></div>
  <div class="absolute top-[70px] left-20 w-[250px] border-t border-gray-400 z-0"></div>

  <!-- Text on Label Lines -->
  <div class="absolute top-[12px] left-2 w-[450px] text-sm z-60">
    ${title}
  </div>
  <div class="absolute top-[40px] left-20 w-[250px] text-sm font-semibold text-black z-30 calligraffitti-regular">
    <!-- Additional Text Here -->
  </div>
  <div class="absolute top-[60px] left-20 w-[250px] text-sm font-semibold text-black z-30 calligraffitti-regular">
    <!-- Additional Text Here -->
  </div>

  <!-- Screw Holes -->
  <div class="absolute bottom-[50px] left-10 w-5 h-5 bg-white rounded-full z-10"></div>
  <div class="absolute bottom-[50px] right-10 w-5 h-5 bg-white rounded-full z-10"></div>

  <!-- Tape Reels -->
  <div class="absolute top-[130px] left-[100px] w-[90px] h-[90px] bg-gray-200  rounded-full flex items-center justify-center z-10">
    <div class="w-[40px] h-[40px] border-2 bg-white rounded-full"></div>
  </div>
  <div class="absolute top-[130px] right-[100px] w-[90px] h-[90px] bg-gray-200 border-gray-700 rounded-full flex items-center justify-center z-10">
    <div class="w-[40px] h-[40px] border-2 bg-white rounded-full"></div>
  </div>

  <!-- Bottom Holes -->
  <div class="absolute bottom-[10px] left-[100px] w-5 h-2 bg-white z-10"></div>
  <div class="absolute bottom-[10px] left-[160px] w-5 h-2 bg-white z-10"></div>
  <div class="absolute bottom-[10px] left-[220px] w-16 h-2 bg-white z-10"></div>
  <div class="absolute bottom-[10px] left-[300px] w-5 h-2 bg-white z-10"></div>
  <div class="absolute bottom-[10px] left-[360px] w-5 h-2 bg-white z-10"></div>
</div>
`;





     


            listContainer.insertAdjacentHTML('beforeend', html);
        });
    } catch (error) {
        console.error('Error fetching cloudcasts:', error);
    }
}

    // Load cloudcasts on page load
document.addEventListener('DOMContentLoaded', fetchCloudcasts);



document.addEventListener("DOMContentLoaded", function() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  
  // Select all event cards
  document.querySelectorAll(".event-card").forEach(card => {
    const eventDate = card.getAttribute("data-date");

    // Hide events with a date before today
    if (eventDate < today) {
      card.style.display = "none";
    }
  });
});