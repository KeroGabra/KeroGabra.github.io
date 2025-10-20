// script.js — KeroGabra interactive behavior (red-team tuned)
// Author: Generated for KeroGabra
// Keeps all original features and updates project data, typing lines, and a couple of small UX improvements.

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
    initProjectModals();
    initContactForm();
    initScrollAnimations();
    initActiveNavigation();
    initTypingEffect();
    initAccessibility();
    console.log('KeroGabra portfolio initialized');
});

/* THEME TOGGLE */
function initThemeToggle() {
    const themeToggle = document.getElementById('darkModeToggle');
    if (!themeToggle) return;
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // default to dark red theme unless user saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('light-mode');
        icon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.className = 'fas fa-sun';
        } else {
            localStorage.setItem('theme', 'dark');
            icon.className = 'fas fa-moon';
        }
        themeToggle.animate([{ transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 160 });
    });
}

/* MOBILE NAV */
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // close on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

/* SMOOTH SCROLL */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId.startsWith('#') || targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (!target) return;
            const headerH = document.querySelector('.header').offsetHeight;
            const top = target.offsetTop - headerH - 18;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* PROJECT MODALS */
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');

    // updated projects reflecting offensive tooling and demos
    const projectData = {
        scanner: {
            title: 'Web Vulnerability Scanner',
            tech: ['Python', 'HTTP Requests', 'OWASP', 'Automation'],
            description: 'Automated scanner focusing on SQLi and XSS detection with structured reporting and payload tuning.',
            features: [
                'Multi-payload SQLi scanner with detection heuristics',
                'XSS detection and contextual payloads',
                'Concurrent scanning & throttling controls',
                'Exportable reports (JSON / HTML)',
                'False-positive reduction via response fingerprinting'
            ],
            github: 'https://github.com/KeroGabra/Web-Vulnerability-Scanner',
            demo: '#'
        },
        blockchain: {
            title: 'Blockchain POC (Secure Comms)',
            tech: ['Node.js','SHA256','P2P'],
            description: 'Proof-of-concept chain used to validate cryptographic integrity and P2P messaging patterns.',
            features: [
                'Proof-of-work simulation',
                'Peer discovery & synchronization',
                'Transaction signing & verification',
                'Minimalist API for experimentation'
            ],
            github: 'https://github.com/KeroGabra/Blockchain-POC',
            demo: '#'
        }
    };

    // safety checks
    if (!modal) return;

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const key = this.getAttribute('data-project');
            const project = projectData[key];
            if (!project) return;
            populateModal(project);
            openModal();
        });
    });

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        const content = modal.querySelector('.modal-content');
        content.style.transform = 'scale(.96)';
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.transition = 'all .28s ease';
            content.style.transform = 'scale(1)';
            content.style.opacity = '1';
        }, 12);
    }

    function closeModal() {
        const content = modal.querySelector('.modal-content');
        content.style.transform = 'scale(.96)';
        content.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 240);
    }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'block') closeModal(); });

    function populateModal(p) {
        document.getElementById('modalTitle').textContent = p.title;
        document.getElementById('modalDescription').textContent = p.description;
        document.getElementById('modalTech').innerHTML = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        document.getElementById('modalFeatures').innerHTML = `<h4>Key Features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
        const g = document.getElementById('modalGithub');
        const d = document.getElementById('modalDemo');
        g.href = p.github || '#';
        d.href = p.demo || '#';
        d.style.display = (p.demo && p.demo !== '#') ? 'inline-flex' : 'none';
    }
}

/* CONTACT FORM */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    const successMessage = document.getElementById('formSuccess');

    // debounce helper
    function validateField(field, errorId, validator) {
        const errorEl = document.getElementById(errorId);
        const result = validator(field.value || '');
        if (result.isValid) {
            field.style.borderColor = 'var(--success-color)';
            errorEl.textContent = '';
            errorEl.classList.remove('show');
            return true;
        } else {
            field.style.borderColor = 'var(--error-color)';
            errorEl.textContent = result.message;
            errorEl.classList.add('show');
            return false;
        }
    }

    // validators
    const validateName = name => {
        const n = (name || '').trim();
        if (!n) return {isValid:false,message:'Name required'};
        if (n.length<2) return {isValid:false,message:'Too short'};
        return {isValid:true};
    };
    const validateEmail = email => {
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return {isValid:false,message:'Email required'};
        if (!rx.test(email)) return {isValid:false,message:'Invalid email'};
        return {isValid:true};
    };
    const validateSubject = s => {
        if (!s.trim()) return {isValid:false,message:'Subject required'};
        if (s.trim().length<4) return {isValid:false,message:'Subject too short'};
        return {isValid:true};
    };
    const validateMessage = m => {
        if (!m.trim()) return {isValid:false,message:'Message required'};
        if (m.trim().length < 8) return {isValid:false,message:'Message too short'};
        return {isValid:true};
    };

    // live blur validation
    nameField && nameField.addEventListener('blur', () => validateField(nameField, 'nameError', validateName));
    emailField && emailField.addEventListener('blur', () => validateField(emailField, 'emailError', validateEmail));
    subjectField && subjectField.addEventListener('blur', () => validateField(subjectField, 'subjectError', validateSubject));
    messageField && messageField.addEventListener('blur', () => validateField(messageField, 'messageError', validateMessage));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = validateField(nameField,'nameError',validateName) &
                   validateField(emailField,'emailError',validateEmail) &
                   validateField(subjectField,'subjectError',validateSubject) &
                   validateField(messageField,'messageError',validateMessage);
        if (!ok) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        const old = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // simulate async send (you can hook an API here)
        setTimeout(() => {
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent. Thanks!';
            successMessage.classList.add('show');
            form.reset();
            submitBtn.innerHTML = old;
            submitBtn.disabled = false;
            setTimeout(() => successMessage.classList.remove('show'), 5000);
        }, 1400);
    });
}

/* SCROLL ANIMATIONS */
function initScrollAnimations() {
    const options = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
    const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(ent => {
            if (ent.isIntersecting) {
                ent.target.classList.add('fade-in-up');
                o.unobserve(ent.target);
            }
        });
    }, options);
    const els = document.querySelectorAll('.skill-category, .project-card, .blog-card, .timeline-item, .about-stats .stat, .contact-item');
    els.forEach(el => obs.observe(el));
}

/* NAV HIGHLIGHT */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    function update() {
        const pos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const h = section.offsetHeight;
            const id = section.getAttribute('id');
            if (pos >= top && pos < top + h) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                active && active.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', debounce(update, 50));
    update();
}

/* TYPING EFFECT */
function initTypingEffect() {
    const heroSub = document.querySelector('.hero-subtitle');
    if (!heroSub) return;
    const titles = [
        'Jr Cybersecurity Engineer — Offensive Security',
        'Penetration Testing & Vulnerability Assessment',
        'Red Team Tools & Recon Specialist',
        'Exploit Development (self-study)'
    ];
    let tIndex = 0, cIndex = 0, deleting = false;
    function tick() {
        const title = titles[tIndex];
        if (deleting) {
            cIndex = Math.max(0, cIndex - 1);
            heroSub.textContent = title.slice(0, cIndex);
        } else {
            cIndex = Math.min(title.length, cIndex + 1);
            heroSub.textContent = title.slice(0, cIndex);
        }
        let delay = deleting ? 40 : 90;
        if (!deleting && cIndex === title.length) { delay = 1500; deleting = true; }
        if (deleting && cIndex === 0) { deleting = false; tIndex = (tIndex + 1) % titles.length; delay = 400; }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 800);
}

/* UTILITIES */
function debounce(fn, wait=100){ let t; return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a), wait) } }

/* ACCESSIBILITY: skip link and other bits */
function initAccessibility(){
    // skip link already added by generated index; ensure main has id 'main'
    const main = document.querySelector('main'); if (main && !main.id) main.id = 'main';
}

/* PRELOAD */
(function preload(){ const imgs = []; /* add critical image sources if any */ })();
