/**
 * DIYA - Shared GSAP Animation Utilities
 * Provides reusable animation presets and page transition functions
 */

// Initialize GSAP with defaults
gsap.defaults({
    ease: "power3.out",
    duration: 0.8
});

// Register ScrollTrigger plugin
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animation Presets
 */
const DIYA = {
    // Durations
    duration: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.0
    },

    // Easing
    ease: {
        smooth: "power3.out",
        bounce: "elastic.out(1, 0.5)",
        snap: "power4.out",
        gentle: "power2.inOut"
    },

    /**
     * Fade in element with optional slide
     */
    fadeIn: (element, options = {}) => {
        const {
            direction = 'up',
            distance = 30,
            delay = 0,
            duration = 0.6
        } = options;

        const fromVars = { opacity: 0 };
        if (direction === 'up') fromVars.y = distance;
        if (direction === 'down') fromVars.y = -distance;
        if (direction === 'left') fromVars.x = distance;
        if (direction === 'right') fromVars.x = -distance;

        return gsap.from(element, {
            ...fromVars,
            duration,
            delay,
            ease: "power3.out"
        });
    },

    /**
     * Stagger animation for multiple elements
     */
    staggerIn: (elements, options = {}) => {
        const {
            direction = 'up',
            distance = 40,
            stagger = 0.1,
            delay = 0,
            duration = 0.6
        } = options;

        const fromVars = { opacity: 0 };
        if (direction === 'up') fromVars.y = distance;
        if (direction === 'down') fromVars.y = -distance;
        if (direction === 'left') fromVars.x = distance;
        if (direction === 'right') fromVars.x = -distance;

        return gsap.from(elements, {
            ...fromVars,
            duration,
            delay,
            stagger,
            ease: "power3.out"
        });
    },

    /**
     * Scale and fade animation
     */
    scaleIn: (element, options = {}) => {
        const {
            scale = 0.9,
            delay = 0,
            duration = 0.6
        } = options;

        return gsap.from(element, {
            opacity: 0,
            scale,
            duration,
            delay,
            ease: "power3.out"
        });
    },

    /**
     * Hero title animation with character split
     */
    heroTitle: (element, options = {}) => {
        const { delay = 0.2 } = options;
        const text = element.textContent;
        element.innerHTML = '';

        // Create character spans
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.className = 'char';
            element.appendChild(span);
        });

        const chars = element.querySelectorAll('.char');
        return gsap.from(chars, {
            opacity: 0,
            y: 80,
            rotateX: -90,
            stagger: 0.05,
            duration: 0.8,
            delay,
            ease: "power4.out"
        });
    },

    /**
     * Button hover effect
     */
    buttonHover: (button) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.02,
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    },

    /**
     * Card hover effect with glow
     */
    cardHover: (card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -4,
                boxShadow: "0 20px 40px rgba(74, 222, 128, 0.15)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    },

    /**
     * Input focus animation
     */
    inputFocus: (input) => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.01,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    },

    /**
     * Page transition - fade out current, fade in new
     */
    pageTransition: (targetUrl) => {
        const tl = gsap.timeline();

        tl.to('body', {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = targetUrl;
            }
        });

        return tl;
    },

    /**
     * Loader animation with dots
     */
    loaderDots: (container) => {
        const dots = container.querySelectorAll('.loader-dot');
        return gsap.to(dots, {
            y: -15,
            stagger: {
                each: 0.15,
                repeat: -1,
                yoyo: true
            },
            duration: 0.4,
            ease: "power2.inOut"
        });
    },

    /**
     * Progress bar animation
     */
    progressBar: (element, options = {}) => {
        const { to = 100, duration = 2 } = options;
        return gsap.to(element, {
            width: `${to}%`,
            duration,
            ease: "power2.inOut"
        });
    },

    /**
     * Morphing text animation
     */
    morphText: (element, texts, options = {}) => {
        const { interval = 2000 } = options;
        let index = 0;

        const animate = () => {
            gsap.to(element, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => {
                    element.textContent = texts[index];
                    index = (index + 1) % texts.length;
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        };

        return setInterval(animate, interval);
    },

    /**
     * Float animation (for decorative elements)
     */
    float: (element, options = {}) => {
        const { distance = 10, duration = 3 } = options;
        return gsap.to(element, {
            y: distance,
            duration,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    },

    /**
     * Pulse animation
     */
    pulse: (element, options = {}) => {
        const { scale = 1.05, duration = 1 } = options;
        return gsap.to(element, {
            scale,
            duration,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    },

    /**
     * Initialize page with common animations
     */
    initPage: () => {
        // Animate header
        gsap.from('.header', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });

        // Setup button hovers
        document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-get-started').forEach(btn => {
            DIYA.buttonHover(btn);
        });

        // Setup card hovers
        document.querySelectorAll('.card, .selectable-card').forEach(card => {
            DIYA.cardHover(card);
        });

        // Setup input focus animations
        document.querySelectorAll('.form-input, input, textarea').forEach(input => {
            DIYA.inputFocus(input);
        });

        // Setup page transition links
        document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"])').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                DIYA.pageTransition(link.href);
            });
        });
    },

    /**
     * Toggle switch animation
     */
    toggleSwitch: (toggle, options = {}) => {
        const { onColor = '#4ADE80', offColor = '#CBD5E1' } = options;
        let isOn = false;

        toggle.addEventListener('click', () => {
            isOn = !isOn;
            const knob = toggle.querySelector('.toggle-knob');
            const track = toggle.querySelector('.toggle-track') || toggle;

            gsap.to(knob, {
                x: isOn ? 20 : 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(track, {
                backgroundColor: isOn ? onColor : offColor,
                duration: 0.3
            });
        });
    },

    /**
     * Shake animation for errors
     */
    shake: (element) => {
        return gsap.to(element, {
            x: [-10, 10, -8, 8, -5, 5, 0],
            duration: 0.5,
            ease: "power2.out"
        });
    },

    /**
     * Success checkmark animation
     */
    checkmark: (element) => {
        return gsap.from(element, {
            scale: 0,
            rotation: -45,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    }
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        if (typeof DIYA !== 'undefined') {
            DIYA.initPage();
        }
    }, 100);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DIYA;
}
