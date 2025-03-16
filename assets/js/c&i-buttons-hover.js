/* eslint-env browser */

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".interactive-layer");

    buttons.forEach(button => {
        button.classList.add("unhovered");

        button.addEventListener("mouseenter", function () {
            button.classList.remove("unhovered"); // Remove highlight on hover

            let tooltip = document.createElement("div");
            tooltip.classList.add("custom-tooltip");
            tooltip.innerText = button.getAttribute("data-tooltip");
            document.body.appendChild(tooltip);

            let rect = button.getBoundingClientRect();
            let tooltipRect = tooltip.getBoundingClientRect();

            let top = rect.top - tooltipRect.height - 10;
            let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) top = rect.bottom + 10;

            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;

            button.tooltipElement = tooltip;
        });

        button.addEventListener("mouseleave", function () {
            if (button.tooltipElement) {
                button.tooltipElement.remove();
                button.tooltipElement = null;
            }
        });
    });
});
