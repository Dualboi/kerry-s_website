document.addEventListener("DOMContentLoaded", function () {
    // Utility to load an HTML file and inject just its <body> content
    function loadHtmlFragment(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Remove duplicate global scripts (e.g., Bootstrap, jQuery) but
                // keep content-specific ones like TikTok embeds.
                doc.querySelectorAll("script[src]").forEach(script => {
                    const src = script.getAttribute("src") || "";
                    if (src.includes("bootstrap") || src.includes("jquery")) {
                        script.remove();
                    }
                });

                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = doc.body ? doc.body.innerHTML : html;
                }
            })
            .catch(error => console.error("Error loading fragment", url, error));
    }

    // Load Header
    fetch("Formatting/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));

    // Load Footer
    fetch("Formatting/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

    // Load all project pages as static sections on the main page
    loadHtmlFragment("Projects/Project4_experience.html", "project4-container");
    loadHtmlFragment("Projects/Project3_education.html", "project3-container");
    loadHtmlFragment("Projects/Project2_tiktok.html", "project2-container");
    loadHtmlFragment("Projects/Project1_writing.html", "project1-container");
});
