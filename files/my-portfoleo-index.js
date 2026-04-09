/* =============================================
   my-portfoleo-index.js
   Portfolio JS — scroll effects, nav, reveals
============================================= */

// ── Navbar scroll shadow ──────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile hamburger ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
});

// ── Smooth scroll with nav offset ────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
};
window.addEventListener('scroll', activateLink);

// ── Scroll reveal ──────────────────────────────
const revealEls = document.querySelectorAll(
    '.sound-text, .sound-img-wrap, .services-inner, .about-inner, .contact-inner, .services-list li'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Stagger services list items ───────────────
document.querySelectorAll('.services-list li').forEach((li, i) => {
    li.style.transitionDelay = (i * 0.07) + 's';
});

// ── Cursor glow dot (desktop only) ───────────
if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed; top: 0; left: 0; width: 8px; height: 8px;
        background: rgb(190,44,44); border-radius: 50%; pointer-events: none;
        z-index: 9999; transform: translate(-50%,-50%);
        transition: transform 0.12s ease, opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(dot);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.opacity = '1';
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(3)'; });
        el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
    });
}

// ── Float label parallax (work / hiring) ─────
const floatLabels = document.querySelectorAll('.float-label');
window.addEventListener('scroll', () => {
    floatLabels.forEach(label => {
        const rect = label.closest('section').getBoundingClientRect();
        const pct  = (window.innerHeight / 2 - rect.top) / window.innerHeight;
        label.style.transform = `translateX(${pct * 40}px)`;
    });
});
