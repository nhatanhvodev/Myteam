// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Typing animation
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = 'Xin chào, tôi là';
    const speed = 100;
    let i = 0;
    typingText.textContent = '';
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    setTimeout(typeWriter, 500);
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('skill-card')) animateSkillBar(entry.target);
            if (entry.target.classList.contains('stat-item')) animateCounter(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-item, .about-card, .contact-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

function animateSkillBar(skillCard) {
    const progressBar = skillCard.querySelector('.progress-bar');
    if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width + '%';
        }, 200);
    }
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    updateCounter();
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !subject || !message) return showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        if (!emailRegex.test(email)) return showNotification('Email không hợp lệ!', 'error');
        showNotification('Đang gửi tin nhắn...', 'info');
        setTimeout(() => {
            showNotification('Cảm ơn bạn đã gửi tin nhắn! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'}; color: white; padding: 1rem 1.5rem; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease; max-width: 350px;`;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    notification.querySelector('.notification-close').addEventListener('click', () => hideNotification(notification));
    setTimeout(() => { if (document.body.contains(notification)) hideNotification(notification); }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
}

// Scroll to top
let scrollToTopBtn;
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) createScrollToTopButton();
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 50%; cursor: pointer; font-size: 1.2rem; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); transition: all 0.3s ease; opacity: 0; pointer-events: none; z-index: 1000;`;
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-3px)';
        scrollToTopBtn.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
    });
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0)';
        scrollToTopBtn.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
    });
    document.body.appendChild(scrollToTopBtn);
}

// Parallax shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
        const speed = 0.5 + (i * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Active link styles
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: #667eea !important; } .nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(style);

// Project card hover
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `<div class="loader-content"><div class="loader-spinner"></div><p>Đang tải...</p></div>`;
    loader.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; display: flex; align-items: center; justify-content: center; z-index: 10000; opacity: 1; transition: opacity 0.5s ease;`;
    const loaderSpinner = document.createElement('style');
    loaderSpinner.textContent = `.loader-spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } .loader-content { text-align: center; color: #333; }`;
    document.head.appendChild(loaderSpinner);
    document.body.appendChild(loader);
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) document.body.removeChild(loader);
        }, 500);
    }, 1000);
});

// Init animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
    });
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => scrollObserver.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    ['.about-card', '.skill-card', '.timeline-item', '.project-card', '.contact-item'].forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.setAttribute('data-aos', 'fade-up');
            el.style.animationDelay = `${i * 0.1}s`;
        });
    });
});

// Debounce
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    // You can put expensive scroll operations here
}, 100);

window.addEventListener('scroll', handleScroll);
