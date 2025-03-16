document.addEventListener("DOMContentLoaded", function() {
    let popups = document.querySelectorAll(".popup");
    let openButtons = document.querySelectorAll("[data-popup-target]");
    let closeButtons = document.querySelectorAll(".popup-close");

    // Open pop-up
    openButtons.forEach(button => {
        button.addEventListener("click", function() {
            let popupId = this.getAttribute("data-popup-target");
            let popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add("active");
            }
        });
    });

    // Close pop-up when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.closest(".popup").classList.remove("active");
        });
    });

    // Close pop-up when clicking outside of it
    window.addEventListener("click", function(event) {
        popups.forEach(popup => {
            if (event.target === popup) {
                popup.classList.remove("active");
            }
        });
    });

    // Close pop-up when pressing Escape
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            popups.forEach(popup => popup.classList.remove("active"));
        }
    });
});
