let showAllMode = false;
let csvData = [["Step Content", "Choice", "Timestamp"]]; // CSV Header

// Handles troubleshooting step transitions and logs decisions
function nextTshootStep(choice) {
    let timestamp = new Date().toISOString();
    let currentStep = document.querySelector('.tshoot-step.active');
    let nextStep = document.getElementById(choice);

    if (!nextStep) {
        console.error(`Step ID "${choice}" not found.`);
        return;
    }

    let stepContent = extractTextFromElement(currentStep);

    // Log the decision
    logDecision(stepContent, choice, timestamp);

    // If "show all mode" is enabled, just reveal the step without hiding others
    if (showAllMode) {
        nextStep.classList.add('active');
    } else {
        if (currentStep) {
            currentStep.classList.remove('active');
            currentStep.classList.add('fade-out');
            
            setTimeout(() => {
                currentStep.style.display = 'none';
                nextStep.style.display = 'block';
                
                setTimeout(() => {
                    nextStep.classList.add('active');
                }, 50);
            }, 500);
        } else {
            nextStep.style.display = 'block';
            nextStep.classList.add('active');
        }
    }
}

// Extracts and cleans text content from the step
function extractTextFromElement(element) {
    return element ? element.innerText.trim().replace(/\s+/g, " ") : "Unknown Step";
}

// Logs decision data to CSV format
function logDecision(stepContent, choice, timestamp) {
    csvData.push([stepContent, choice, timestamp]);
    console.log(`Logged: "${stepContent}" -> ${choice} at ${timestamp}`);
}

// Toggle Initial Setup Box visibility and triangle rotation
function toggleSetup() {
    let setupBox = document.getElementById("setupBox");
    setupBox.classList.toggle("open");
}


// Toggles between single-step mode and show-all mode
function toggleViewMode() {
    showAllMode = !showAllMode;
    document.body.classList.toggle('show-all', showAllMode);

    if (showAllMode) {
        document.querySelectorAll('.tshoot-step').forEach(step => {
            step.style.display = 'block';
            step.classList.add('active');
        });
    } else {
        document.querySelectorAll('.tshoot-step').forEach(step => {
            if (!step.classList.contains('active')) {
                step.style.display = 'none';
            }
        });
    }
}
