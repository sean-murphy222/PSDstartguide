console.log("✅ menu.js is loaded and running, waiting for the footer...");

// Ensure the menu is initialized only when the footer is loaded
function initializeMenu() {
    console.log("🔧 Initializing menu system...");

    const openMenu = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");
    const slideoutMenu = document.getElementById("slideout-menu");
    const universalOverlay = document.getElementById("universal-overlay");
    const sectionToggles = document.querySelectorAll(".section-toggle");

    // Info Pop-up Elements
    const openInfo = document.getElementById("open-info");
    const closeInfo = document.getElementById("close-info");
    const infoPopup = document.getElementById("info-popup");

    // Tab Switching Elements
    const tabs = document.querySelectorAll(".info-tab");
    const sections = document.querySelectorAll(".info-section");

    // Verify that all required elements exist
    if (!openMenu || !closeMenu || !slideoutMenu || !universalOverlay || !openInfo || !closeInfo || !infoPopup) {
        console.warn("⚠️ Footer or menu elements not found. Retrying...");
        setTimeout(initializeMenu, 100);
        return;
    }

    console.log("✅ Footer detected. Initializing menu script.");

    function updateOverlay() {
        if (slideoutMenu.classList.contains("open") || infoPopup.classList.contains("open")) {
            universalOverlay.classList.add("open");
        } else {
            universalOverlay.classList.remove("open");
        }
    }

    // Toggle Submenus
    sectionToggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            console.log(`📂 Toggling submenu for ${this.textContent.trim()}`);
            const submenu = this.nextElementSibling;

            if (submenu && submenu.classList.contains("submenu")) {
                const isOpen = submenu.classList.contains("open");

                // Close all other submenus
                document.querySelectorAll(".submenu").forEach(sub => sub.classList.remove("open"));
                document.querySelectorAll(".section-toggle").forEach(btn => btn.classList.remove("open"));

                // Toggle the clicked one
                if (!isOpen) {
                    submenu.classList.add("open");
                    this.classList.add("open");
                }
            }
        });
    });

    // Open & Close Menu
    openMenu.addEventListener("click", function () {
        console.log("🏠 Home button clicked! Opening menu.");
        slideoutMenu.classList.add("open");
        updateOverlay();
    });

    closeMenu.addEventListener("click", function () {
        console.log("❌ Close button clicked! Closing menu.");
        slideoutMenu.classList.remove("open");
        updateOverlay();
    });

    // Open & Close Info Pop-up
    openInfo.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("ℹ️ Info button clicked! Opening pop-up.");
        infoPopup.classList.add("open");
        updateOverlay();
    });

    closeInfo.addEventListener("click", function () {
        console.log("❌ Close Info button clicked! Closing pop-up.");
        infoPopup.classList.remove("open");
        updateOverlay();
    });

    // Click outside to close menu OR modal separately
    universalOverlay.addEventListener("click", function () {
        console.log("🌑 Clicked on overlay.");

        if (slideoutMenu.classList.contains("open")) {
            console.log("Closing menu.");
            slideoutMenu.classList.remove("open");
        }
        if (infoPopup.classList.contains("open")) {
            console.log("Closing info pop-up.");
            infoPopup.classList.remove("open");
        }

        updateOverlay();
    });

    // Tab Switching Inside Modal
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            console.log(`🔄 Switching to ${this.dataset.target}`);

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            // Activate the clicked tab and corresponding section
            this.classList.add("active");
            document.getElementById(this.dataset.target).classList.add("active");
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Page Navigation Script Running...");

    // Define the correct order of pages
    const pageOrder = [
        "landing.html",
        "general-info.html",
        "operation.html",
        "operation-proc.html",
        "troubleshooting.html",
        "pmcs.html",
        "maintenance.html",
        "rpstl.html",
        "supporting-info.html"
    ];

    // Extract the full path and filename
    let fullPath = window.location.pathname;
    let currentPage = fullPath.split("/").pop();

    console.log(`📂 Full Path: ${fullPath}`);
    console.log(`📄 Extracted Current Page: ${currentPage}`);

    if (!currentPage) {
        console.error("❌ ERROR: No current page detected.");
        return;
    }

    // Find the Next button
    let nextButton = document.getElementById("next-button");

    if (!nextButton) {
        console.error("❌ ERROR: Next button not found in the footer.");
        return;
    }

    console.log("✅ Next button found!");

    // Find the current page index
    let currentIndex = pageOrder.indexOf(currentPage);
    console.log(`🔢 Current Page Index: ${currentIndex}`);

    if (currentIndex === -1) {
        console.error(`❌ ERROR: The current page "${currentPage}" is NOT in pageOrder. Check filenames!`);
        return;
    }

    // If there's a next page, update the Next button
    if (currentIndex < pageOrder.length - 1) {
        let nextPage = pageOrder[currentIndex + 1];

        console.log(`➡️ Setting Next Button Link to: ${nextPage}`);
        nextButton.setAttribute("href", nextPage);
    } else {
        console.warn("🚫 No next page available. Hiding button.");
        nextButton.style.display = "none";
    }
});



// Ensure the menu is initialized only when the footer is loaded
initializeMenu();
