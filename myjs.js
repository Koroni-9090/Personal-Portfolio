// 1. THEME TOGGLE
const themeBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    const icon = themeBtn.querySelector('i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('koroni-theme', newTheme);
});

const savedTheme = localStorage.getItem('koroni-theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeBtn.querySelector('i').className = 'fas fa-sun';
    }
}

// 2. SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3. SKILL BARS — animate on scroll into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-line span[data-width]').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);

// 4. CONTACT FORM: opens the visitor's email app with the message pre-filled
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = contactForm.elements;
        const subject = encodeURIComponent('Portfolio message from ' + f.name.value);
        const body = encodeURIComponent(f.message.value + '\n\nFrom: ' + f.name.value + ' (' + f.email.value + ')');
        window.location.href = 'mailto:sirajack9090@gmail.com?subject=' + subject + '&body=' + body;
        contactForm.reset();
    });
}

// 5. PROJECT LINKS — prevent default for placeholder hrefs
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// 6. BACK-TO-TOP + ACTIVE NAV LINK
const backTop = document.getElementById('back-top');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
