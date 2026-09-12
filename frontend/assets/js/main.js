// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== NAVBAR SHRINK ON SCROLL =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.padding = '12px 6%';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.padding = '20px 6%';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ===== TRACK CARD CLICK -> GO TO SIGNUP WITH TRACK PRESELECTED =====
document.querySelectorAll('.track-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const trackName = card.textContent.trim();
    localStorage.setItem('preselectedTrack', trackName);
    window.location.href = 'pages/signup.html';
  });
});

// ===== SIMPLE FADE-IN ON SCROLL FOR SECTIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tracks, .features').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(section);
});