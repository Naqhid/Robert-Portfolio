// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  function updateHeader() {
    const navLinks = document.querySelectorAll('.nav-link');
    const siteLogo = document.querySelector('.site-logo');

    if (window.scrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
      // Change nav links to blue when scrolled
      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-blue-900');
      });
      // Change logo color when scrolled
      siteLogo.classList.remove('text-white');
      siteLogo.classList.add('text-blue-900');
    } else {
      header.classList.remove('header-scrolled');
      // Change nav links back to white when at top
      navLinks.forEach(link => {
        link.classList.add('text-white');
        link.classList.remove('text-blue-900');
      });
      // Change logo color back to white when at top
      siteLogo.classList.add('text-white');
      siteLogo.classList.remove('text-blue-900');
    }
  }

  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Initialize on page load

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const yOffset = -80; // Header height offset
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach(slide => {
      slide.classList.add('hidden');
    });

    testimonialDots.forEach(dot => {
      dot.classList.remove('active');
    });

    testimonialSlides[index].classList.remove('hidden');
    testimonialDots[index].classList.add('active');
    currentSlide = index;
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
    });
  });

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    let nextSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(nextSlide);
  }, 5000);

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.service-card, .case-study-card, .expertise-item');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Initialize element styles for animations
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
  });

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // Form validation
  const contactForm = document.querySelector('form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic form validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;

      if (!nameInput.value.trim()) {
        markInvalid(nameInput);
        isValid = false;
      } else {
        markValid(nameInput);
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        markInvalid(emailInput);
        isValid = false;
      } else {
        markValid(emailInput);
      }

      if (!messageInput.value.trim()) {
        markInvalid(messageInput);
        isValid = false;
      } else {
        markValid(messageInput);
      }

      if (isValid) {
        // Here you would normally send the form data
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      }
    });
  }

  function markInvalid(element) {
    element.style.borderColor = '#EF4444';
    element.style.backgroundColor = '#FEF2F2';
  }

  function markValid(element) {
    element.style.borderColor = '#10B981';
    element.style.backgroundColor = '#ECFDF5';
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
