document.addEventListener("DOMContentLoaded", function() {
    // Dropdown Menu Toggle
    document.querySelectorAll(".dropdown-button").forEach(button => {
        button.addEventListener("click", function() {
            let dropdown = this.nextElementSibling;
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
    });

    // Pop-Up Trigger
    document.querySelectorAll(".popup-trigger").forEach(trigger => {
        trigger.addEventListener("click", function() {
            let popup = document.getElementById(this.dataset.target);
            popup.style.display = "block";
        });
    });

    // Pop-Up Close
    document.querySelectorAll(".popup-overlay").forEach(popup => {
        popup.addEventListener("click", function(event) {
            if (event.target === popup || event.target.classList.contains("close")) {
                popup.style.display = "none";
            }
        });
    });
});
