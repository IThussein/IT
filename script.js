
// ========================================
// IT HUSSEIN - Optimized JavaScript
// ========================================

// القائمة المتحركة
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.setAttribute('aria-expanded', 'false');

    function closeMenu() {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');

        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');

        menuToggle.setAttribute('aria-expanded', String(isOpen));

        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-times', isOpen);
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
}

// ========================================
// تأثير الكتابة المتحركة
// ========================================

const typingText = document.querySelector('.typing-text');

if (typingText) {
    const texts = [
        'اختبار الاختراق',
        'الأمن السيبراني',
        'الحلول التقنية'
    ];

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
        typingText.textContent = texts[0];
    } else {
        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];

            if (!deleting) {
                charIndex++;
                typingText.textContent =
                    currentText.substring(0, charIndex);

                if (charIndex >= currentText.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

                setTimeout(typeEffect, 100);
            } else {
                charIndex--;
                typingText.textContent =
                    currentText.substring(0, charIndex);

                if (charIndex <= 0) {
                    deleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeEffect, 500);
                    return;
                }

                setTimeout(typeEffect, 50);
            }
        }

        setTimeout(typeEffect, 1000);
    }
}

// ========================================
// نموذج التواصل
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = this.querySelector(
            'button[type="submit"]'
        );

        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

        setTimeout(() => {
            alert(
                'هذا النموذج تجريبي حالياً. لم يتم إرسال رسالتك إلى خادم.'
            );

            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ========================================
// تحديث السنة تلقائياً
// ========================================

const currentYearSpan = document.getElementById('currentYear');

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ========================================
// التمرير السلس
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            const top =
                targetElement.getBoundingClientRect().top +
                window.scrollY - 80;

            window.scrollTo({
                top,
                behavior: window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                ).matches ? 'auto' : 'smooth'
            });
        }
    });
});

// ========================================
// مراقبة ظهور العناصر عند التمرير
// ========================================

const animatedElements = document.querySelectorAll(
    '.skill-card, .about-content, .contact-wrapper > div'
);

const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // إيقاف مراقبة العنصر بعد ظهوره
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
} else {
    animatedElements.forEach(element => {
        element.classList.add('animate');
    });
}
