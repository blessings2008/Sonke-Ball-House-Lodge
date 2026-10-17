const menuButton = document.getElementById('menuButton');
const nav = document.querySelector('.bottom-nav');
const form = document.getElementById('bookingForm');
const message = document.getElementById('formMessage');

menuButton.addEventListener('click', () => {
  nav.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const checkin = data.get('checkin');
  const checkout = data.get('checkout');

  if (!checkin || !checkout || new Date(checkout) <= new Date(checkin)) {
    message.textContent = 'Please choose a valid check-in and check-out date.';
    return;
  }

  message.textContent = 'Thanks — your dates are ready. Connect with Sonke Ball House & Lodge to confirm availability.';
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.bottom-nav a')];

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { threshold: [0.15, 0.35, 0.6], rootMargin: '-15% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));
