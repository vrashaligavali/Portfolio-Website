// script.js
// Purpose: Scroll reveal effects, smooth navigation, and interactive 3D card tilt

// -----------------------------
// Scroll-reveal animation
// -----------------------------
(function() {
    // Observe elements with .reveal-on-scroll and add .visible when in view
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
        // Fallback: show immediately
        revealItems.forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    revealItems.forEach(el => observer.observe(el));
})();

// Subtle stagger for timeline items for a nicer cascade
(function(){
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;
    items.forEach((item, idx) => {
        item.style.transitionDelay = `${Math.min(idx * 80, 300)}ms`;
    });
})();

// -----------------------------
// Smooth scroll to Overview
// -----------------------------
// Smooth scroll for all header anchors pointing to in-page sections
// (function(){
//     const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
//     navLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             const hash = link.getAttribute('href');
//             const target = document.querySelector(hash);
//             if (target) {
//                 e.preventDefault();
//                 target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//         });
//     });
// })();
(function(){
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// -----------------------------
// 3D tilt interaction on cards
// -----------------------------
(function(){
    const cards = document.querySelectorAll('.overview-card');
    const maxTiltDeg = 15; // intensity of tilt for half-rotate feel

    cards.forEach(card => {
        // Movement handler applies perspective-based rotation and slight scale
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -2 * maxTiltDeg; // invert so top tilts back
            const rotateY = ((x / rect.width) - 0.5) * 2 * maxTiltDeg;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
        };

        // Reset transition back to neutral pose
        const enter = () => {
            // Ensure a visible tilt even if the mouse doesn't move after entering
            card.style.transform = 'perspective(1000px) rotateY(12deg) scale3d(1.03,1.03,1.03)';
        };

        const reset = () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        };

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', reset);
        card.addEventListener('blur', reset);
        card.addEventListener('touchend', reset, { passive: true });
    });
})();


