// Store and retrieve responses from local storage
let responses = JSON.parse(localStorage.getItem("inspectionResponses")) || [];
let currentInspection = 0;
const inspections = document.querySelectorAll('.inspection-container');
const table = document.getElementById('inspection-table');

function logResponse(status, failReason = '') {
    const inspection = inspections[currentInspection];
    const itemNumber = inspection.getAttribute('data-id');
    const interval = inspection.getAttribute('data-interval');
    const item = inspection.getAttribute('data-item');

    // Save response
    const response = {
        "Item Number": itemNumber,
        "Interval": interval,
        "Item": item,
        "Status": status,
        "Failure Reason": failReason
    };
    responses.push(response);
    
    // Store in local storage
    localStorage.setItem("inspectionResponses", JSON.stringify(responses));
    
    nextInspection();
}

function nextInspection() {
    if (currentInspection < inspections.length - 1) {
        inspections[currentInspection].classList.remove('active');
        currentInspection++;
        inspections[currentInspection].classList.add('active');
    } else {
        alert("All inspections completed!");
    }
}

function openFailForm() {
    document.getElementById('fail-popup').style.display = 'block';
}

function closeFailForm() {
    document.getElementById('fail-popup').style.display = 'none';
}

function submitFailure() {
    const failReason = document.getElementById('failure-reason').value;
    closeFailForm();
    logResponse("Fail", failReason);
}

function toggleTableView() {
    if (table.classList.contains("full-table")) {
        table.classList.remove("full-table");
        inspections.forEach((row, index) => {
            row.classList.remove("active");
            if (index === currentInspection) {
                row.classList.add("active");
            }
        });
    } else {
        table.classList.add("full-table");
        inspections.forEach(row => row.classList.add("active"));
    }
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item Number,Interval,Item,Status,Failure Reason\n";

    responses.forEach(row => {
        csvContent += `${row["Item Number"]},${row["Interval"]},${row["Item"]},${row["Status"]},${row["Failure Reason"]}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inspection_log.csv");
    document.body.appendChild(link);
    link.click();
}

function openFailForm() {
    const inspection = inspections[currentInspection]; 

    // Get table values
    const itemNo = inspection.getAttribute('data-id'); // Column 1
    const section = inspection.getAttribute('data-interval'); // Column 2
    const description = inspection.querySelector("td:nth-child(5)")?.innerText || ""; // Column 5

    // Populate fields
    document.getElementById("fault-item").value = itemNo;
    document.getElementById("fault-section").value = section;
    document.getElementById("fault-date").value = new Date().toISOString().slice(0, 16).replace("T", " ");
    document.getElementById("fault-status").selectedIndex = 0; // Default to placeholder
    document.getElementById("fault-description").value = description;

    // Show popup
    document.getElementById("fail-popup").style.display = "block";
}

function closeFailForm() {
    document.getElementById("fail-popup").style.display = "none";
}

function submitFailure() {
    const faultData = {
        itemNo: document.getElementById("fault-item").value,
        section: document.getElementById("fault-section").value,
        date: document.getElementById("fault-date").value,
        status: document.getElementById("fault-status").value,
        description: document.getElementById("fault-description").value,
        corrective: document.getElementById("fault-corrective").value,
        hrs: document.getElementById("fault-hrs").value,
        lic: document.getElementById("fault-lic").value
    };

    console.log("Fault Recorded:", faultData);

    closeFailForm();
}