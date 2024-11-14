// Mobile Menu Toggle
window.onload = function() {
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
};
    
// Fetch data and build the list dynamically
async function fetchCloudcasts() {
    try {
        const response = await fetch('https://api.mixcloud.com/heyokaytk/cloudcasts/');
        const data = await response.json();
        const cloudcasts = data.data.slice(0, 6);
        const listContainer = document.getElementById('cloudcast-list');
        
        // Clear the container before adding new content
        listContainer.innerHTML = '';

        console.log(cloudcasts);

        cloudcasts.forEach(entry => {
            const tags = createTagSpans(entry.tags.slice(0, 3));
                  
            console.log(entry);

            const html = mixtapeHTMLContent({
              url: entry.url,
              imageSrc: entry.pictures.extra_large,
              bgImage: entry.pictures.small,
              title: entry.name,
              tags: tags,
              audioLength: entry.audio_length,
              createdTime: entry.created_time
          });

          listContainer.insertAdjacentHTML('beforeend', html);

        });
    } catch (error) {
        console.error('Error fetching cloudcasts:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
  // Load cloudcasts on page load
  fetchCloudcasts();

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


function mixtapeHTMLContent({ url, imageSrc, bgImage, title, tags, audioLength, createdTime }) {
  // Optionally, format audioLength and createdTime into human-readable formats

  const formattedAudioLength = formatAudioLength(audioLength);
  const formattedCreatedTime = formatCreatedTime(createdTime);

  const html = `
  <a target="_blank" href="${url}" class="flex flex-col bg-white border md:min-w-xl border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100" style="background-image: url('${bgImage}'); background-repeat: repeat;">
        <img class="object-cover w-full h-48 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${imageSrc}" alt="">
        <div class="relative flex flex-col justify-between p-4 leading-normal w-full bg-white/[.06]">        
            <div class="relative p-4 backdrop-blur-sm rounded-lg" style="background-color: rgba(255, 255, 255, 0.80);">
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-black-800">${title}</h5>
                <div class="flex items-center text-sm text-gray-600 mb-3">
                    <span class="mr-2">${formattedAudioLength}</span>
                    <span class="mr-2">&bull;</span>
                    <span>${formattedCreatedTime}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                    ${tags}
                </div>        
            </div>
        </div>
    </a>`;

  return html;
}

function formatAudioLength(audioLength) {
  // Convert audioLength (in seconds) to a human-readable format (e.g., "5 mins 30 secs")
  const minutes = Math.floor(audioLength / 60);
  const seconds = audioLength % 60;
  return `${minutes} mins`;
}

function formatCreatedTime(createdTime) {
  // Convert createdTime (ISO string) to a human-readable date string
  const now = new Date(createdTime);
  return sinceWhen(now);
}

function createTagSpans(tagsArray) {
  return tagsArray
      .slice(0, 3)
      .map(tag => `<span class="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded">${tag.name}</span>`)
      .join(' ');
}

function sinceWhen(createdTime) {
  const now = new Date();
  const date = new Date(createdTime);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
      return 'just now';
  } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}




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

