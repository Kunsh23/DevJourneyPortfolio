document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            console.log('Menu icon clicked');
            navMenu.classList.add('show-menu');
        });
    }

    // HIDING MENU
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // REMOVE MOBILE MENU
    const navLink = document.querySelectorAll('.nav__link');

    const linkAction = () => {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show-menu');
    };

    navLink.forEach(n => n.addEventListener('click', linkAction));

    // SHADOW HEADER
    const shadowHeader = () => {
        const header = document.getElementById('header')
        window.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header')
    }
    window.addEventListener('scroll', shadowHeader)

    // EMAIL JS
    const contactForm = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message')
    const sendEmail = (e) => {
        e.preventDefault()

        // service id - template id - form - public key
        emailjs.sendForm('service id', 'template id', 'form', 'public key')
            .then(() => {
                // Show message after sending message
                contactMessage.textContent = 'Message sent successfully ✅'

                // Remove message after 5 seconds
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 5000)

                // Clear input after sending
                contactForm.reset()
            }, () => {
                // Show error message
                contactMessage.textContent = 'Message not sent (service error) ❌'
            })
    }
    contactForm.addEventListener('submit', sendEmail)

    // SHOW SCROLLUP
    const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up');
        window.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
    };

    window.addEventListener('scroll', scrollUp);

    // SCROLL SECTION ACTIVE LINK 
    const sections = document.querySelectorAll('section[id]')
    const scrollActive = () => {
        const scrollDown = window.scrollY

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        })
    }
    window.addEventListener('scroll', scrollActive)

    // DARK LIGHT THEME
    const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'
    const iconTheme = 'ri-sun-line'

    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })

    // SCROLL REVEAL ANIMATION
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        // reset: true
    })

    sr.reveal('.home__perfil, .about__image, .contact__mail', { origin: 'right' })
    sr.reveal('.home__name, .home__info, .about__container .section__title-1, .about__info, .contact__social, .contact__data', { origin: 'left' })
    sr.reveal('.services__card, .projects__card', { interval: 100 })
    sr.reveal('.faq-question', { interval: 100 })
    sr.reveal('.certification__card', { interval: 100 })

    // Remove 'show-menu' class on load
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
});
