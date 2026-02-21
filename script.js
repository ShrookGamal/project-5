const header = document.querySelector('.main-header');
const menuBtn = document.getElementById('menuToggle');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const galleryItems = document.querySelectorAll('.gallery-item');
const whyCards = document.querySelectorAll('.why-card');
const orderForm = document.querySelector('.order-form');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });

    const reveals = document.querySelectorAll('[data-reveal="bottom"]');
    reveals.forEach((el, index) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            setTimeout(() => {
                el.classList.add('revealed');
            }, index * 100);
        }
    });

    galleryItems.forEach((item, index) => {
        if (item.getBoundingClientRect().top < window.innerHeight - 50) {
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, index * 100);
        }
    });

    whyCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < window.innerHeight / 5 * 4) {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 150);
        }
    });
});

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        mobileOverlay.classList.toggle('active');
        this.classList.toggle('open');
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('open');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

galleryItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease-out";
});

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = "تم الإرسال بنجاح <i class='fas fa-check'></i>";
        btn.style.background = "#25D366";
        
        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalText;
            btn.style.background = "";
        }, 3000);
    });
}

window.dispatchEvent(new Event('scroll'));