/**
 * Main Application File
 * Core functionality and app initialization
 */

// ============ App Configuration ============

const AppConfig = {
    name: 'DesignAI',
    version: '1.0.0',
    apiUrl: 'http://localhost:5000/api',
    debug: true,
    animation: {
        enabled: true,
        duration: 300
    }
};

// ============ App Logger ============

const Logger = {
    log: function(message, data = null) {
        if (AppConfig.debug) {
            console.log(`[${AppConfig.name}] ${message}`, data || '');
        }
    },
    
    error: function(message, error = null) {
        console.error(`[${AppConfig.name}] ERROR: ${message}`, error || '');
    },
    
    warn: function(message, data = null) {
        if (AppConfig.debug) {
            console.warn(`[${AppConfig.name}] WARNING: ${message}`, data || '');
        }
    },
    
    info: function(message, data = null) {
        console.info(`[${AppConfig.name}] INFO: ${message}`, data || '');
    }
};

// ============ Form Validation ============

const FormValidator = {
    /**
     * Validate contact form
     */
    validateContactForm: function(formData) {
        const errors = {};
        
        // Validate name
        if (!formData.name || formData.name.trim() === '') {
            errors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        
        // Validate email
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = 'Valid email is required';
        }
        
        // Validate message
        if (!formData.message || formData.message.trim() === '') {
            errors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    },
    
    /**
     * Validate login form
     */
    validateLoginForm: function(formData) {
        const errors = {};
        
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = 'Valid email is required';
        }
        
        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    },
    
    /**
     * Validate register form
     */
    validateRegisterForm: function(formData) {
        const errors = {};
        
        if (!formData.name || formData.name.trim() === '') {
            errors.name = 'Name is required';
        }
        
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = 'Valid email is required';
        }
        
        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    },
    
    /**
     * Display validation errors
     */
    displayErrors: function(errors, formElement) {
        if (!formElement) return;
        
        // Clear previous errors
        const errorElements = formElement.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Display new errors
        Object.keys(errors).forEach(field => {
            const fieldElement = formElement.querySelector(`[name="${field}"]`);
            if (fieldElement) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errors[field];
                errorDiv.style.cssText = `
                    color: #FF6B6B;
                    font-size: 0.85rem;
                    margin-top: 0.25rem;
                `;
                fieldElement.parentNode.insertBefore(errorDiv, fieldElement.nextSibling);
            }
        });
    }
};

// ============ API Handler ============

const API = {
    /**
     * Make API request
     */
    request: async function(endpoint, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        const url = `${AppConfig.apiUrl}${endpoint}`;
        
        try {
            Logger.log(`API Request: ${finalOptions.method} ${endpoint}`);
            
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            
            const data = await response.json();
            Logger.log(`API Response: ${endpoint}`, data);
            
            return { success: true, data };
        } catch (error) {
            Logger.error(`API Error: ${endpoint}`, error);
            return { success: false, error: error.message };
        }
    },
    
    /**
     * GET request
     */
    get: function(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },
    
    /**
     * POST request
     */
    post: function(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    /**
     * PUT request
     */
    put: function(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    /**
     * DELETE request
     */
    delete: function(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

// ============ User Manager ============

const UserManager = {
    /**
     * Get current user
     */
    getCurrentUser: function() {
        return getFromStorage('currentUser');
    },
    
    /**
     * Set current user
     */
    setCurrentUser: function(user) {
        saveToStorage('currentUser', user);
    },
    
    /**
     * Clear current user
     */
    clearCurrentUser: function() {
        removeFromStorage('currentUser');
    },
    
    /**
     * Check if user is logged in
     */
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },
    
    /**
     * Get auth token
     */
    getToken: function() {
        return getFromStorage('authToken');
    },
    
    /**
     * Set auth token
     */
    setToken: function(token) {
        saveToStorage('authToken', token);
    },
    
    /**
     * Clear auth token
     */
    clearToken: function() {
        removeFromStorage('authToken');
    }
};

// ============ Event Manager ============

const EventManager = {
    events: {},
    
    /**
     * Subscribe to event
     */
    on: function(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },
    
    /**
     * Unsubscribe from event
     */
    off: function(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    },
    
    /**
     * Emit event
     */
    emit: function(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    },
    
    /**
     * Clear all events
     */
    clear: function() {
        this.events = {};
    }
};

// ============ Notification Manager ============

const NotificationManager = {
    /**
     * Show notification
     */
    show: function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${this.getBackgroundColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },
    
    /**
     * Get background color based on type
     */
    getBackgroundColor: function(type) {
        const colors = {
            success: '#4ECDC4',
            error: '#FF6B6B',
            warning: '#FFE66D',
            info: '#6C63FF'
        };
        return colors[type] || colors.info;
    },
    
    /**
     * Show success notification
     */
    success: function(message, duration = 3000) {
        this.show(message, 'success', duration);
    },
    
    /**
     * Show error notification
     */
    error: function(message, duration = 3000) {
        this.show(message, 'error', duration);
    },
    
    /**
     * Show warning notification
     */
    warning: function(message, duration = 3000) {
        this.show(message, 'warning', duration);
    }
};

// ============ Performance Monitoring ============

const PerformanceMonitor = {
    /**
     * Log performance metrics
     */
    logMetrics: function() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const metrics = {
                'DOM Content Loaded': timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
                'Page Load Time': timing.loadEventEnd - timing.loadEventStart,
                'Time to First Byte': timing.responseStart - timing.requestStart,
                'DOM Interactive': timing.domInteractive - timing.navigationStart
            };
            
            Logger.info('Performance Metrics:', metrics);
        }
    },
    
    /**
     * Measure function execution time
     */
    measureFunction: function(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        Logger.log(`Function "${name}" executed in ${(end - start).toFixed(2)}ms`);
        
        return result;
    }
};

// ============ App Initialization ============

class App {
    constructor() {
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        Logger.log('Initializing application...');
        
        this.setupEventListeners();
        this.setupNavigation();
        this.checkUserSession();
        
        Logger.log('Application initialized successfully');
        PerformanceMonitor.logMetrics();
        
        this.initialized = true;
    }
    
    setupEventListeners() {
        // Listen for user login
        EventManager.on('user:login', (user) => {
            Logger.log('User logged in:', user);
            NotificationManager.success('Welcome!');
        });
        
        // Listen for user logout
        EventManager.on('user:logout', () => {
            Logger.log('User logged out');
        });
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                Logger.log('Navigation to:', href);
            });
        });
    }
    
    checkUserSession() {
        const user = UserManager.getCurrentUser();
        if (user) {
            Logger.log('User session found:', user);
        }
    }
}

// ============ Initialize App ============

let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
        app.init();
    });
} else {
    app = new App();
    app.init();
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppConfig,
        Logger,
        FormValidator,
        API,
        UserManager,
        EventManager,
        NotificationManager,
        PerformanceMonitor,
        App
    };
}
