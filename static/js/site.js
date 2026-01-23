function initSiteUI() {

    /* --------------------
       Hamburger menu
    -------------------- */
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        // Remove any old listeners to avoid duplicates
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('.hamburger');

        newHamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    /* --------------------
       Active menu item
    -------------------- */
    const links = document.querySelectorAll('.nav-list a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    /* --------------------
       Sticky header shadow
    -------------------- */
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    /* --------------------
       Language switcher
    -------------------- */
    const langLinks = document.querySelectorAll('.language-switcher a');
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const currentLang = pathParts[0] === 'ka' ? 'ka' : 'en';
    const page = pathParts[1] || 'index.html';

    langLinks.forEach(link => {
        link.classList.remove('active-lang');
        const lang = link.dataset.lang;
        if (lang === currentLang) link.classList.add('active-lang');
        link.href = `/${lang}/${page}`;
    });

    /* --------------------
    Sort publications by year (DESC)
    -------------------- */
    document.querySelectorAll('.publication-list').forEach(list => {
        const items = Array.from(list.children);

        items
            .sort((a, b) => {
                const yearA = parseInt(a.dataset.year, 10);
                const yearB = parseInt(b.dataset.year, 10);
                return yearB - yearA; // newest first
            })
            .forEach(item => list.appendChild(item));
    });

}

