/**
 * Utility Functions
 * Helper functions for common operations
 */

// ============ DOM Utilities ============

/**
 * Query single element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
function query(selector) {
    return document.querySelector(selector);
}

/**
 * Query multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function queryAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {Element|null}
 */
function getId(id) {
    return document.getElementById(id);
}

/**
 * Add event listener
 * @param {Element} element - DOM element
 * @param {string} event - Event type
 * @param {Function} callback - Event callback
 */
function addEventListener(element, event, callback) {
    if (element) {
        element.addEventListener(event, callback);
    }
}

/**
 * Remove event listener
 * @param {Element} element - DOM element
 * @param {string} event - Event type
 * @param {Function} callback - Event callback
 */
function removeEventListener(element, event, callback) {
    if (element) {
        element.removeEventListener(event, callback);
    }
}

/**
 * Add class to element
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 */
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remove class from element
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 */
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Toggle class on element
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Check if element has class
 * @param {Element} element - DOM element
 * @param {string} className - Class name
 * @returns {boolean}
 */
function hasClass(element, className) {
    if (element) {
        return element.classList.contains(className);
    }
    return false;
}

/**
 * Set element styles
 * @param {Element} element - DOM element
 * @param {Object} styles - Style object
 */
function setStyles(element, styles) {
    if (element) {
        Object.assign(element.style, styles);
    }
}

/**
 * Get element's computed style
 * @param {Element} element - DOM element
 * @param {string} property - CSS property
 * @returns {string}
 */
function getComputedStyle(element, property) {
    if (element) {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
    return '';
}

// ============ Animation Utilities ============

/**
 * Smooth scroll to element
 * @param {string} selector - Target element selector
 */
function smoothScrollTo(selector) {
    const element = query(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Smooth scroll to coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function smoothScrollToCoordinates(x, y) {
    window.scrollTo({
        left: x,
        top: y,
        behavior: 'smooth'
    });
}

/**
 * Fade in element
 * @param {Element} element - DOM element
 * @param {number} duration - Duration in milliseconds
 */
function fadeIn(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

/**
 * Fade out element
 * @param {Element} element - DOM element
 * @param {number} duration - Duration in milliseconds
 */
function fadeOut(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.opacity = '0';
    }, 10);
}

/**
 * Slide down element
 * @param {Element} element - DOM element
 * @param {number} duration - Duration in milliseconds
 */
function slideDown(element, duration = 300) {
    if (!element) return;
    
    element.style.maxHeight = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.maxHeight = element.scrollHeight + 'px';
    }, 10);
}

/**
 * Slide up element
 * @param {Element} element - DOM element
 * @param {number} duration - Duration in milliseconds
 */
function slideUp(element, duration = 300) {
    if (!element) return;
    
    element.style.maxHeight = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `max-height ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.maxHeight = '0';
    }, 10);
}

// ============ String Utilities ============

/**
 * Capitalize first letter
 * @param {string} str - Input string
 * @returns {string}
 */
function capitalize(str) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Slugify string
 * @param {string} str - Input string
 * @returns {string}
 */
function slugify(str) {
    if (typeof str !== 'string') return '';
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncate string
 * @param {string} str - Input string
 * @param {number} length - Max length
 * @returns {string}
 */
function truncate(str, length) {
    if (typeof str !== 'string') return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
}

// ============ Validation Utilities ============

/**
 * Validate email
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
function isValidPhone(phone) {
    const phoneRegex = /^[0-9\-\+\s()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
}

/**
 * Validate URL
 * @param {string} url - URL string
 * @returns {boolean}
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// ============ Number Utilities ============

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string}
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string}
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Round number to decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Decimal places
 * @returns {number}
 */
function roundNumber(num, decimals = 2) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// ============ Array Utilities ============

/**
 * Check if array contains value
 * @param {Array} arr - Array to check
 * @param {*} value - Value to find
 * @returns {boolean}
 */
function arrayContains(arr, value) {
    return Array.isArray(arr) && arr.includes(value);
}

/**
 * Remove duplicates from array
 * @param {Array} arr - Input array
 * @returns {Array}
 */
function removeDuplicates(arr) {
    return Array.isArray(arr) ? [...new Set(arr)] : [];
}

/**
 * Shuffle array
 * @param {Array} arr - Array to shuffle
 * @returns {Array}
 */
function shuffleArray(arr) {
    if (!Array.isArray(arr)) return [];
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// ============ Storage Utilities ============

/**
 * Save to local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Storage error:', error);
    }
}

/**
 * Get from local storage
 * @param {string} key - Storage key
 * @returns {*}
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Storage error:', error);
        return null;
    }
}

/**
 * Remove from local storage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Storage error:', error);
    }
}

/**
 * Clear all storage
 */
function clearStorage() {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Storage error:', error);
    }
}

// ============ Time Utilities ============

/**
 * Get current timestamp
 * @returns {number}
 */
function getCurrentTimestamp() {
    return Date.now();
}

/**
 * Format date
 * @param {Date} date - Date object
 * @param {string} format - Format string (default: 'MM/DD/YYYY')
 * @returns {string}
 */
function formatDate(date, format = 'MM/DD/YYYY') {
    if (!(date instanceof Date)) return '';
    
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get time difference
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Object} Object with days, hours, minutes, seconds
 */
function getTimeDifference(startDate, endDate) {
    const diff = Math.abs(endDate - startDate);
    
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
    };
}

// ============ Misc Utilities ============

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
function debounce(func, wait = 300) {
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

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Deep copy object
 * @param {Object} obj - Object to copy
 * @returns {Object}
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean}
 */
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Generate random ID
 * @returns {string}
 */
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
