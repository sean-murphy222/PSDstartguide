document.addEventListener("DOMContentLoaded", function() {
    fetch("config.xml")
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            let theme = data.querySelector("settings theme").textContent;
            let themeFile = "../assets/css/styles.css"; // Default to dark theme

            switch(theme) {
                case "light":
                    themeFile = "../assets/css/theme-light.css";
                    break;
                case "blue":
                    themeFile = "../assets/css/theme-blue.css";
                    break;
                case "green":
                    themeFile = "../assets/css/theme-green.css";
                    break;
            }

            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = themeFile;
            document.head.appendChild(link);
        })
        .catch(error => console.error("Error loading config.xml:", error));
});
