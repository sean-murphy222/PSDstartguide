document.getElementById("button1").addEventListener("click", function() {
    let statusText = document.getElementById("statusText");

    // Change the image on click
    this.src = "button-on.png";

    // Change status text
    statusText.textContent = "Button Pressed!";

    // Reset after 0.3s
    setTimeout(() => {
        this.src = "button-off.png";
        statusText.textContent = "Status: Ready";
    }, 300);
});

