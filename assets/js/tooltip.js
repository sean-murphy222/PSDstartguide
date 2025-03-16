document.addEventListener("DOMContentLoaded", function() {
    let tooltips = document.querySelectorAll(".tooltip");

    tooltips.forEach(function(tooltip) {
        tooltip.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevents unwanted closing
            tooltip.classList.toggle("active");
        });
    });

    document.addEventListener("click", function() {
        tooltips.forEach(function(tooltip) {
            tooltip.classList.remove("active");
        });
    });
});
