// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const navToggle = document.createElement('button');
navToggle.textContent = 'Menu';
navToggle.style.display = 'none';
navToggle.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});
document.querySelector('.nav-container').appendChild(navToggle);

if (window.innerWidth <= 768) {
    navToggle.style.display = 'block';
}
