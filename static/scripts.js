function loadMarkdown(chapter) {
    fetch(chapter)
        .then(response => response.text())
        .then(data => {
            // Convert Markdown to HTML and insert into main content
            document.getElementById('main-content').innerHTML = marked.parse(data);
            
            // Highlight code in all <pre><code> blocks
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });

            // Add copy button to all <pre> tags
            document.querySelectorAll('pre').forEach((preTag) => {
                // Create copy button
                const copyButton = document.createElement('span');
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                copyButton.classList.add('copy-button');
                preTag.style.position = 'relative';
                preTag.appendChild(copyButton);

                // Event for copy button click
                copyButton.addEventListener('click', () => {
                    const code = preTag.querySelector('code').textContent;

                    navigator.clipboard.writeText(code).then(() => {
                        copyButton.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    }).catch(err => {
                        console.error('Error copying:', err);
                    });
                });
            });
            
            // Mark the corresponding navigation link as active
            const chapterNumber = chapter.match(/(\d+)/)[0]; // Extract chapter number
            document.querySelectorAll('.sidebar ul li a').forEach((link) => {
                link.classList.remove('active'); // Remove active class from all links
                if (link.textContent.includes(chapterNumber)) {
                    link.classList.add('active'); // Add active class to the current link
                }
            });
        })
        .catch(error => console.error('Error loading the markdown file:', error));
}

window.onload = function () {
    // Load default chapter when the page loads
    loadMarkdown('chapters/chap1.md');
};
