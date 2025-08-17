// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const contactForm = document.getElementById('contact-form');

// ===== NAVIGATION FUNCTIONALITY =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== THEME TOGGLE =====
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Load saved theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== SMOOTH SCROLLING =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Dark theme navbar
    if (body.getAttribute('data-theme') === 'dark') {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
}

// ===== ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== PROJECT CARD HOVER EFFECTS =====
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SKILL ITEM ANIMATIONS =====
function initializeSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== CONTACT FORM HANDLING =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// ===== LOADING ANIMATION =====
function initializeLoadingAnimations() {
    const loadingElements = document.querySelectorAll('.hero-text, .hero-image, .project-card, .skill-category');
    
    loadingElements.forEach((element, index) => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 200);
    });
}

// ===== PARALLAX EFFECT =====
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
    animateOnScroll();
    handleSphereAnimations();
}, 10));

window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
}, 250));

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadTheme();
    
    // Initialize animations
    initializeLoadingAnimations();
    initializeProjectCards();
    initializeSkillItems();
    
    // Create scroll to top button
    createScrollToTopButton();
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add active class to current nav link
    updateActiveNavLink();
    
    // Initialize mobile-specific features
    handleMobileTouch();
    
    // Initialize sphere animations
    initializeSphereAnimations();
});

// ===== SPHERE INITIALIZATION =====
function initializeSphereAnimations() {
    const spheres = document.querySelectorAll('.sphere');
    
    // Add initial random positions and delays
    spheres.forEach((sphere, index) => {
        // Random initial position offset
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        sphere.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Random animation delay
        sphere.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add hover effects for desktop
        if (!isMobileDevice()) {
            sphere.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.filter = 'blur(20px)';
            });
            
            sphere.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'blur(40px)';
            });
        }
    });
    
    // Start sphere animations
    handleSphereAnimations();
}

// ===== PERFORMANCE OPTIMIZATION =====
// Use Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form');
    animatedElements.forEach(el => observer.observe(el));
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add focus management for mobile menu
navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }
});

// ===== HEMISPHERICAL BACKGROUND CONTROL =====
let lastScrollY = 0;
let scrollDirection = 'down';
let sphereEffects = ['morph', 'pulse', 'wave', 'ripple', 'twist', 'bounce', 'glow'];
let currentEffectIndex = 0;

function handleSphereAnimations() {
    const spheres = document.querySelectorAll('.sphere');
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    // Determine scroll direction
    scrollDirection = scrollDelta > 0 ? 'down' : 'up';
    
    // Calculate scroll percentage
    const scrollPercentage = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // Apply different effects based on scroll position and direction
    spheres.forEach((sphere, index) => {
        // Remove all effect classes
        sphere.classList.remove('morph', 'pulse', 'wave', 'ripple', 'twist', 'bounce', 'glow');
        
        // Apply effects based on scroll position
        if (scrollPercentage < 15) {
            // First section - morph effect
            if (index % 2 === 0) {
                sphere.classList.add('morph');
            }
        } else if (scrollPercentage < 30) {
            // Second section - pulse effect
            if (index % 2 === 1) {
                sphere.classList.add('pulse');
            }
        } else if (scrollPercentage < 45) {
            // Third section - wave effect
            sphere.classList.add('wave');
        } else if (scrollPercentage < 60) {
            // Fourth section - ripple effect
            sphere.classList.add('ripple');
        } else if (scrollPercentage < 75) {
            // Fifth section - twist effect
            sphere.classList.add('twist');
        } else if (scrollPercentage < 90) {
            // Sixth section - bounce effect
            sphere.classList.add('bounce');
        } else {
            // Final section - glow effect
            sphere.classList.add('glow');
        }
        
        // Dynamic positioning based on scroll
        const speed = 0.5 + (index * 0.1);
        const xOffset = Math.sin(scrollY * 0.001 * speed) * 50;
        const yOffset = Math.cos(scrollY * 0.001 * speed) * 30;
        
        sphere.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + scrollPercentage * 0.001})`;
        
        // Dynamic opacity based on scroll
        const opacity = 0.3 + (scrollPercentage * 0.005);
        sphere.style.opacity = Math.min(opacity, 0.8);
        
        // Dynamic blur based on scroll speed
        const blurAmount = 40 + Math.abs(scrollDelta) * 0.1;
        sphere.style.filter = `blur(${Math.min(blurAmount, 80)}px)`;
    });
    
    // Change sphere colors based on scroll
    const hue = (scrollPercentage * 3.6) % 360; // 360 degrees of hue
    const saturation = 50 + (scrollPercentage * 0.5);
    const lightness = 60 + (scrollPercentage * 0.2);
    
    document.documentElement.style.setProperty('--sphere-color', `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`);
    document.documentElement.style.setProperty('--sphere-color-dark', `hsla(${hue + 30}, ${saturation}%, ${lightness}%, 0.15)`);
    
    lastScrollY = scrollY;
}

// ===== MOBILE-SPECIFIC IMPROVEMENTS =====
// Handle mobile touch events
function handleMobileTouch() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Improve mobile scrolling performance
    let ticking = false;
    function updateScroll() {
        handleNavbarScroll();
        animateOnScroll();
        handleSphereAnimations();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

// Mobile-specific optimizations
if (isMobileDevice()) {
    // Reduce animation complexity on mobile
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform';
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// ===== SERVICE WORKER REGISTRATION (FOR PWA FEATURES) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
