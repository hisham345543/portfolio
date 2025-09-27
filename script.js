// script.js

// Theme switching functionality
const themeButtons = document.querySelectorAll('.theme-button');
const body = document.body;

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    themeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    body.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
    button.style.transform = 'scale(1.2)';
    setTimeout(() => (button.style.transform = ''), 200);
  });
});

const savedTheme = localStorage.getItem('preferred-theme') || 'minimal';
body.setAttribute('data-theme', savedTheme);
document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.about, .contact, #hero-text').forEach(section => observer.observe(section));

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }
});

// Contact form handling with EmailJS
const form = document.querySelector('.contact-form');
const submitButton = document.querySelector('.form-submit');

// Initialize EmailJS
    emailjs.init('vX_S7PJ0ycIFDWI6q'); // Replace with your EmailJS public key

form?.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent normal form submission

  // Get form values
  const name = form.name.value.trim();
  let email = form.email.value.trim();
  const message = form.message.value.trim();

  // Basic validation
  if (!message) {
    form.message.focus();
    form.message.style.borderColor = 'var(--primary-red)';
    return;
  }
  form.message.style.borderColor = 'transparent';

  // Fallback to anonymous email if empty
  if (!email) {
    email = 'anonymous@mysite.com';
  }

  // Prepare EmailJS payload
  const templateParams = {
    from_name: name || 'Anonymous',
    reply_to: email,
    message: message
  };

  // Disable submit button and show sending state
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  // Send email via EmailJS
  emailjs.send('service_1g6mqcr', 'template_791cbfc', templateParams)
    .then(() => {
      alert('Message sent successfully!');
      form.reset();
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      alert('Failed to send message. Check console for details.');
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});


// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
