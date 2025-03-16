document.addEventListener("DOMContentLoaded", function () {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let currentTrack = null;
    let gainNode = audioContext.createGain(); // Volume Control
    let bassEQ = audioContext.createBiquadFilter(); // Bass Control
    let trebleEQ = audioContext.createBiquadFilter(); // Treble Control
    let panNode = audioContext.createStereoPanner(); // Balance Control

    // Set EQ Types
    bassEQ.type = "lowshelf";
    trebleEQ.type = "highshelf";

    // Connect Nodes
    bassEQ.connect(trebleEQ);
    trebleEQ.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    let state = {
        power: false,
        mute: false,
        dbfb: false,
        surround: false,
        selectedSource: null,
        knobRotations: {
            bass: 0,
            treble: 0,
            balance: 0,
            volume: 0
        },
        stepIndex: 0,
        steps: Array.from(document.querySelectorAll("#instructions li")),
        showAllSteps: false
    };

    function showInstruction() {
        document.querySelectorAll("#instructions li").forEach((step, index) => {
            step.style.display = state.showAllSteps || index === state.stepIndex ? "list-item" : "none";
        });
    }

    function highlightElement(elementId) {
        let elements = Array.isArray(elementId) ? elementId.map(id => document.getElementById(id)) : [document.getElementById(elementId)];
        elements.forEach(el => {
            if (el) {
                el.style.outline = "3px solid yellow";
                setTimeout(() => el.style.outline = "", 2000);
            }
        });
    }

    function waitForUserAction() {
        let currentStep = state.steps[state.stepIndex];
        let elementId = currentStep.getAttribute("data-element").split(",");
        let targetElements = elementId.map(id => document.getElementById(id.trim()));
        let timer = setTimeout(() => {
            highlightElement(elementId);
        }, 40000);
        targetElements.forEach(el => {
            if (el) {
                el.addEventListener("mousedown", function handler() {
                    clearTimeout(timer);
                    el.removeEventListener("mousedown", handler);
                    nextStep();
                });
            }
        });
    }

    function nextStep() {
        if (state.stepIndex < state.steps.length - 1) {
            state.stepIndex++;
            showInstruction();
            waitForUserAction();
        }
    }

    function prevStep() {
        if (state.stepIndex > 0) {
            state.stepIndex--;
            showInstruction();
            waitForUserAction();
        }
    }

    function toggleSteps() {
        state.showAllSteps = !state.showAllSteps;
        showInstruction();
    }

    // Attach event listeners to existing buttons in html
    document.getElementById("prevStepButton").addEventListener("click", prevStep);
    document.getElementById("nextStepButton").addEventListener("click", nextStep);
    document.getElementById("toggleStepsButton").addEventListener("click", function () {
        toggleSteps();
        document.getElementById("toggleStepsButton").textContent = state.showAllSteps ? "Show One Step at a Time" : "Show All Steps";
    });

    showInstruction();
    waitForUserAction();







    const buttons = {
        power: document.getElementById("powerButton"),
        mute: document.getElementById("muteButton"),
        dbfb: document.getElementById("dbfButton"),
        surround: document.getElementById("surroundButton"),
    };

    const screens = {
        video: document.getElementById("screenVideo"),
        tape: document.getElementById("screenTape"),
        cd: document.getElementById("screenCD"),
        tuner: document.getElementById("screenTuner"),
        phono: document.getElementById("screenPhono"),
    };

    const lights = {
        dbfb: document.getElementById("DBFBlight"),
        mute: document.getElementById("muteLight"),
        surround: document.getElementById("surroundLight"),
    };

    const knobs = {
        bass: document.getElementById("bassKnob"),
        treble: document.getElementById("trebleKnob"),
        balance: document.getElementById("balanceKnob"),
        volume: document.getElementById("volumeON"),
    };

    const sources = {
        video: "../assets/audio/video.wav",
        tape: "../assets/audio/tape.wav",
        cd: "../assets/audio/cd.wav",
        tuner: "../assets/audio/tuner.mp3",
        phono: "../assets/audio/phono.wav",
    };

    function updateUI() {
        Object.values(screens).forEach(screen => screen.style.display = "none");
        Object.values(lights).forEach(light => light.style.display = "none");

        if (!state.power) {
            document.getElementById("volumeON").style.display = "none";
            document.getElementById("volumeOFF").style.display = "block";
        
            // Stop all audio when power is turned off
            if (currentTrack) {
                console.log("Stopping and disconnecting audio track"); // Debugging log
                currentTrack.stop();
                currentTrack.disconnect();
                currentTrack = null;
            }
        
            // Instead of fully disconnecting, set gain to 0 to mute audio
            gainNode.gain.value = 0; 
        
            return;
        }
        
        // Restore volume when power is turned back on
        gainNode.gain.value = 1;
        

        document.getElementById("volumeON").style.display = "block";
        document.getElementById("volumeOFF").style.display = "none";

        if (state.selectedSource) {
            screens[state.selectedSource].style.display = "block";
        }

        if (state.dbfb) {
            lights.dbfb.style.display = "block";
        }

        if (state.mute) {
            lights.mute.style.display = "block";
        }

        if (state.surround) {
            lights.surround.style.display = "block";
        }
    }

    function playAudio(source) {
        if (currentTrack) {
            currentTrack.stop();
        }
        
        fetch(source)
            .then(response => response.arrayBuffer())
            .then(data => audioContext.decodeAudioData(data))
            .then(buffer => {
                currentTrack = audioContext.createBufferSource();
                currentTrack.buffer = buffer;
                currentTrack.loop = true;
                currentTrack.connect(bassEQ);
                currentTrack.start();
            });
    }

    buttons.power.addEventListener("click", function () {
        state.power = !state.power;
        updateUI();
    });

    Object.keys(screens).forEach(key => {
        document.getElementById(`${key}Button`).addEventListener("click", function () {
            if (!state.power) return;
            state.selectedSource = key;
            playAudio(sources[key]);
            updateUI();
        });
    });

    buttons.mute.addEventListener("click", function () {
        if (!state.power) return;
        state.mute = !state.mute;
        gainNode.gain.value = state.mute ? 0 : 1;
        updateUI();
    });

    buttons.dbfb.addEventListener("click", function () {
        if (!state.power) return;
        state.dbfb = !state.dbfb;
        bassEQ.gain.value = state.dbfb ? 10 : 0;
        updateUI();
    });

    buttons.surround.addEventListener("click", function () {
        if (!state.power) return;
        state.surround = !state.surround;
        trebleEQ.gain.value = state.surround ? 8 : 0;
        updateUI();
    });



    let knobSensitivity = 0.03; // Reduce sensitivity for smoother movement
    
    document.querySelectorAll(".knob-container").forEach(knob => {
        let isDragging = false;
        let startAngle = 0;
        let currentRotation = 0;
    
        knob.addEventListener("mousedown", (event) => {
            isDragging = true;
            const rect = knob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            startAngle = angle - (currentRotation * (Math.PI / 180));
            
            // Prevent default dragging behavior
            event.preventDefault();
        });
    
        document.addEventListener("mousemove", (event) => {
            if (!isDragging) return;
            
            const rect = knob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            let rotation = (angle - startAngle) * (180 / Math.PI) + currentRotation;
            
            // Ensure continuous movement back and forth
            if (rotation < -135) rotation = -135;
            if (rotation > 135) rotation = 135;
            
            knob.querySelector("img").style.transform = `rotate(${rotation}deg)`;
            
            // Map the rotation value to audio effect adjustments
            const normalizedValue = (rotation + 135) / 270; // Convert -135 to 135 into 0 to 1
            if (knob.id === "bassKnob") bassEQ.gain.value = normalizedValue * 15 - 5;
            if (knob.id === "trebleKnob") trebleEQ.gain.value = normalizedValue * 15 - 5;
            if (knob.id === "balanceKnob") panNode.pan.value = (normalizedValue * 2) - 1;
            if (knob.id === "volumeON") {
                gainNode.gain.value = Math.pow(normalizedValue, 2); // Exponential scaling for volume
            }
        });
    
        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                currentRotation = parseFloat(knob.querySelector("img").style.transform.replace(/[^0-9-]/g, '')) || 0;
            }
        });
    });
    
    

    updateUI();
});