'use strict';

/**
 * Sweet Creme - Brand Page Interactive Logic
 * Handles animations, form submissions, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initScrollAnimations();
    initFlavorInteractions();
    initNewsletterForm();
});

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Fade-in Animations
 * Replicates the "joyful movement" requested in the architecture
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Once animated, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections and cards
    const animateElements = document.querySelectorAll('.flavor-card, section h2, .hero-content');
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        observer.observe(el);
    });

    // Helper class added via JS to trigger CSS transitions
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Flavor Gallery Interactions
 */
function initFlavorInteractions() {
    const cards = document.querySelectorAll('.flavor-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle haptic-like scale effect handled by CSS, 
            // but we could add sound or particle effects here
        });

        card.addEventListener('click', () => {
            const flavorName = card.querySelector('h3').textContent;
            console.log(`User interested in: ${flavorName}`);
            // Future: Open a modal with ingredients/details
        });
    });
}

/**
 * Newsletter Form Handling (P2 Requirement)
 */
function initNewsletterForm() {
    const form = document.querySelector('#newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.textContent;

        if (!validateEmail(emailInput.value)) {
            showFormMessage('Please enter a valid email address 🍦', 'error');
            return;
        }

        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';

        try {
            // Simulated API call - In a real Next.js app, this would hit /api/subscribe
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormMessage('You\'re on the list! Stay sweet! ✨', 'success');
            form.reset();
        } catch (error) {
            showFormMessage('Oops! Something went wrong. Try again?', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

/**
 * Simple Email Validator
 */
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]