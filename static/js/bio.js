fetch('content/bio.txt')
    .then(response => response.text())
    .then(text => {
        const container = document.getElementById('bio-content');
        container.innerHTML = formatBio(text);
    })
    .catch(() => {
        document.getElementById('bio-content').innerHTML =
            '<p>Biography could not be loaded.</p>';
    });

function formatBio(text) {
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    lines.forEach((line, index) => {
        line = line.trim();

        if (!line) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            return;
        }

        // Section headers (Title Case or UPPERCASE)
        if (!line.startsWith('-') && line === line.toUpperCase()) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h2>${line}</h2>`;
            return;
        }

        // Bullet points
        if (line.startsWith('-')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${line.substring(1).trim()}</li>`;
            return;
        }

        // Paragraphs
        if (inList) {
            html += '</ul>';
            inList = false;
        }
        html += `<p>${line}</p>`;
    });

    if (inList) html += '</ul>';

    return html;
}
