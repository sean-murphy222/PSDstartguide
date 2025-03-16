document.addEventListener("DOMContentLoaded", function () {
    let textElement = document.getElementById("welcome-text");
    let logoElement = document.getElementById("welcome-logo");
    let flashEffect = document.getElementById("flash-effect");

    let words = "Mission Start...";
    let index = 0;

    // Get audio elements
    let staticAudio = document.getElementById("static-audio");
    let beepAudio = document.getElementById("beep-audio");
    let missionAudio = document.getElementById("mission-audio");

    // Play radio static effect when the page loads
    staticAudio.play();

    // Typing effect with sound
    function typeEffect() {
        if (index < words.length) {
            textElement.textContent += words[index];
            index++;

            // Play beep sound for each letter
            beepAudio.currentTime = 0;
            beepAudio.play();

            setTimeout(typeEffect, 100);
        } else {
            // After text finishes, wait a moment and fade it out
            setTimeout(() => {
                textElement.classList.add("fading-out");

                // Show the logo after text disappears
                setTimeout(() => {
                    logoElement.classList.add("show-logo");

                    // Play confirmation sound and transition after logo appears
                    setTimeout(() => {
                        missionAudio.play();

                        // Fade the whole screen before redirecting
                        document.body.classList.add("fading-out");

                        setTimeout(() => {
                            window.location.href = "/pages/landing.html"; // Redirect smoothly
                        }, 1500);
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }

    // Start typing effect after radio static ends
    setTimeout(typeEffect, 500);
});
