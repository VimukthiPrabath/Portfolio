// =============== PRELOADER ===============
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// =============== HEADER SCROLL EFFECT ===============
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);

// =============== MOBILE MENU ===============
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    });
});

// =============== ACTIVE LINK ===============
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__link[href*="${sectionId}"]`).classList.add('active-link');
        } else {
            document.querySelector(`.nav__link[href*="${sectionId}"]`).classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', setActiveLink);

// =============== SCROLL UP ===============
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 200) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// =============== DARK/LIGHT THEME ===============
const themeButton = document.getElementById('theme-button');
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('ri-moon-line');
    themeIcon.classList.add('ri-sun-line');
}

// Toggle theme
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('ri-moon-line');
        themeIcon.classList.add('ri-sun-line');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('ri-sun-line');
        themeIcon.classList.add('ri-moon-line');
        localStorage.setItem('theme', 'light');
    }
});

// =============== FORM SUBMISSION ===============
const internshipForm = document.getElementById('internshipForm');
if (internshipForm) {
    internshipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const inputs = this.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Show success alert
                alert('Thank you for your message! I will get back to you soon.');
            }, 2000);
        }
    });
}

// =============== CURRENT YEAR IN FOOTER ===============
document.getElementById('currentYear').textContent = new Date().getFullYear();

// =============== SCROLL REVEAL ANIMATIONS ===============
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    setTimeout(animateOnScroll, 100);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// =============== SKILL LEVEL HOVER EFFECT ===============
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const level = this.querySelector('.skill-level');
        if (level.textContent === 'Advanced') {
            level.style.background = 'var(--primary-color)';
            level.style.color = 'white';
            level.style.borderColor = 'var(--primary-color)';
        } else if (level.textContent === 'Intermediate') {
            level.style.background = 'var(--secondary-color)';
            level.style.color = 'white';
            level.style.borderColor = 'var(--secondary-color)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const level = this.querySelector('.skill-level');
        level.style.background = '';
        level.style.color = '';
        level.style.borderColor = '';
    });
});

// =============== SMOOTH SCROLL FOR ANCHOR LINKS ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// =============== PROJECT CARD HOVER EFFECT ===============
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const links = this.querySelectorAll('.project-link');
        links.forEach(link => {
            link.style.transform = 'rotate(360deg)';
        });
    });
    
    card.addEventListener('mouseleave', function() {
        const links = this.querySelectorAll('.project-link');
        links.forEach(link => {
            link.style.transform = 'rotate(0deg)';
        });
    });
});

// =============== INTERNSHIP FORM ENHANCEMENT ===============
const subjectSelect = document.querySelector('select[name="subject"]');
if (subjectSelect) {
    subjectSelect.addEventListener('change', function() {
        if (this.value === 'internship') {
            this.style.background = 'rgba(37, 99, 235, 0.1)';
            this.style.borderColor = 'var(--primary-color)';
        } else {
            this.style.background = '';
            this.style.borderColor = '';
        }
    });
}