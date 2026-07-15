/**
 * Animation Module
 * Handles all scroll animations and visual effects
 */

// ============ Scroll Animation Observer ============

class ScrollAnimationObserver {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
            duration: options.duration || 0.8
        };
        
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });

        // Observe all elements with data-aos attribute
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => this.observer.observe(el));
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || '0';
        
        element.style.animationDelay = delay + 'ms';
        element.classList.add('aos-animate');
        
        // Stop observing after animation
        this.observer.unobserve(element);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// ============ Parallax Scroll Effect ============

class ParallaxEffect {
    constructor(selector, speed = 0.5) {
        this.element = document.querySelector(selector);
        this.speed = speed;
        
        if (this.element) {
            this.handleScroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', throttle(this.handleScroll, 100));
        }
    }

    handleScroll() {
        const rect = this.element.getBoundingClientRect();
        const yOffset = window.pageYOffset;
        const elementOffset = rect.top + yOffset;
        const distance = elementOffset - window.innerHeight;
        
        if (yOffset > distance) {
            const parallaxValue = (yOffset - distance) * this.speed;
            this.element.style.transform = `translateY(${parallaxValue}px)`;
        }
    }
}

// ============ Counter Animation ============

class CounterAnimation {
    constructor(element, endValue, duration = 2000) {
        this.element = element;
        this.endValue = parseInt(endValue) || 0;
        this.duration = duration;
        this.currentValue = 0;
        this.isAnimating = false;
    }

    animate() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const startTime = Date.now();
        const startValue = 0;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function (ease-out)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.currentValue = Math.floor(startValue + (this.endValue - startValue) * easeProgress);
            this.element.textContent = formatNumber(this.currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.element.textContent = formatNumber(this.endValue);
                this.isAnimating = false;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// ============ Text Typing Animation ============

class TypingAnimation {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    stop() {
        this.currentIndex = this.text.length;
    }
}

// ============ Smooth Scroll Navigation ============

class SmoothScrollNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('navMenu');
            if (mobileMenu && hasClass(mobileMenu, 'active')) {
                removeClass(mobileMenu, 'active');
                const hamburger = document.getElementById('hamburger');
                if (hamburger) removeClass(hamburger, 'active');
            }
        }
    }
}

// ============ Navbar Scroll Effect ============

class NavbarScrollEffect {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    }

    handleScroll() {
        if (!this.navbar) return;
        
        const scrollY = window.pageYOffset;
        
        if (scrollY > this.scrollThreshold) {
            addClass(this.navbar, 'scrolled');
        } else {
            removeClass(this.navbar, 'scrolled');
        }
    }
}

// ============ Mobile Menu Toggle ============

class MobileMenuToggle {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggle());
        }
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    toggle() {
        toggleClass(this.hamburger, 'active');
        toggleClass(this.navMenu, 'active');
    }

    close() {
        if (this.hamburger && hasClass(this.hamburger, 'active')) {
            removeClass(this.hamburger, 'active');
        }
        if (this.navMenu && hasClass(this.navMenu, 'active')) {
            removeClass(this.navMenu, 'active');
        }
    }
}

// ============ Fade In on Scroll ============

class FadeInOnScroll {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.offset = options.offset || 100;
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fadeIn(entry.target, 500);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: `0px 0px -${this.offset}px 0px`
        });

        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ============ Scale on Hover ============

class ScaleOnHover {
    constructor(selector, scale = 1.05) {
        this.elements = document.querySelectorAll(selector);
        this.scale = scale;
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = `scale(${this.scale})`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });
        });
    }
}

// ============ Ripple Effect ============

class RippleEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// ============ Scroll to Top Button ============

class ScrollToTopButton {
    constructor() {
        this.button = null;
        this.threshold = 300;
        this.init();
    }

    init() {
        // Create button if it doesn't exist
        if (!document.querySelector('.scroll-to-top')) {
            this.createButton();
        }
        
        this.button = document.querySelector('.scroll-to-top');
        
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
        
        if (this.button) {
            this.button.addEventListener('click', () => this.scrollToTop());
        }
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #6C63FF, #FF6B6B);
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 999;
            display: none;
        `;
        document.body.appendChild(button);
    }

    handleScroll() {
        if (!this.button) return;
        
        const scrollY = window.pageYOffset;
        
        if (scrollY > this.threshold) {
            this.button.style.display = 'flex';
            this.button.style.alignItems = 'center';
            this.button.style.justifyContent = 'center';
            setTimeout(() => {
                this.button.style.opacity = '1';
            }, 10);
        } else {
            this.button.style.opacity = '0';
            setTimeout(() => {
                this.button.style.display = 'none';
            }, 300);
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============ Animation Initialization ============

function initializeAnimations() {
    // Initialize scroll animations
    new ScrollAnimationObserver({
        threshold: 0.1,
        duration: 0.8
    });
    
    // Initialize navbar scroll effect
    new NavbarScrollEffect();
    
    // Initialize smooth scroll navigation
    new SmoothScrollNavigation();
    
    // Initialize mobile menu toggle
    new MobileMenuToggle();
    
    // Initialize scale on hover for cards
    new ScaleOnHover('.feature-card', 1.03);
    new ScaleOnHover('.testimonial-card', 1.03);
    new ScaleOnHover('.step', 1.03);
    
    // Initialize scroll to top button
    new ScrollToTopButton();
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    initializeAnimations();
}
