$(document).ready(function () {
    let firstProjectLoaded = false;
    let firstExperienceLoaded = false;

    function loadDefaultContent(container, selector, dataAttr, firstLoadFlag) {
        if (!firstLoadFlag) {
            let defaultItem = $(selector).first();
            if (defaultItem.length > 0) {
                let defaultData = defaultItem.data(dataAttr);
                console.log("Auto-loading default:", defaultData);

                $(container).data("current", defaultData);
                $(container).load(defaultData);
            }
            return true; // Mark as loaded
        }
        return firstLoadFlag;
    }

   function handleSelection(container, selector, dataAttr) {
    $(selector).click(function () {
        let newContent = $(this).data(dataAttr);
        let currentContent = $(container).data("current");

        if (currentContent === newContent) {
            console.log("Content already loaded, skipping...");
            return;
        }

        $(container).data("current", newContent);
        $(container).fadeOut(150, function () {
            $(container).load(newContent, function (response, status, xhr) {
                if (status === "error") {
                    $(container).html('<div class="text-danger"><p>Error loading content. Please try again.</p></div>');
                    console.error("Error loading:", newContent, xhr.statusText);
                }
                $(container).fadeIn(150);
            });
        });
    });
}


    // Load default content only once when the page loads
    if (!sessionStorage.getItem("projectLoaded")) {
        firstProjectLoaded = loadDefaultContent("#project-content", ".project-link", "project", firstProjectLoaded);
        sessionStorage.setItem("projectLoaded", "true");
    }

    if (!sessionStorage.getItem("experienceLoaded")) {
        firstExperienceLoaded = loadDefaultContent("#experience-content", ".experience-link", "experience", firstExperienceLoaded);
        sessionStorage.setItem("experienceLoaded", "true");
    }

    // Handle menu selection changes
    handleSelection("#project-content", ".project-link", "project");
    handleSelection("#experience-content", ".experience-link", "experience");
});
