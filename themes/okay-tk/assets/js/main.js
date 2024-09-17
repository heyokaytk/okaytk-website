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