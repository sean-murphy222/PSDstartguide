document.addEventListener("DOMContentLoaded", function() {
    // Load the Header
    fetch("../templates/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error("Error loading header:", error));

    // Load the Footer
    fetch("../templates/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
            console.log("✅ Footer loaded successfully.");

            // NOW Load `menu.js` since the footer exists
            const script = document.createElement("script");
            script.src = "../assets/js/menu.js";
            document.body.appendChild(script);
        })
        .catch(error => console.error("Error loading footer:", error));
});