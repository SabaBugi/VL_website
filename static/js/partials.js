(function() {

    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const currentLang = pathParts[0] === 'ka' ? 'ka' : 'en';
    const basePath = '../partials/';

    const partials = [
        { id: 'header-placeholder', file: `header-${currentLang}.html` },
        { id: 'footer-placeholder', file: `footer-${currentLang}.html` }
    ];

    partials.forEach(p => {
        fetch(basePath + p.file)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load partial: ' + p.file);
                return res.text();
            })
            .then(html => {
                const container = document.getElementById(p.id);
                if (!container) throw new Error('Missing placeholder: ' + p.id);
                container.innerHTML = html;

                // ✅ Only run initSiteUI AFTER header/footer exists
                initSiteUI();
            })
            .catch(err => console.error(err));
    });

})();
