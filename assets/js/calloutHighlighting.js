function highlightSVG(calloutNumber) {
    console.log("Highlight function triggered: " + calloutNumber);

    let svgObject = document.getElementById("svg-image");
    let svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();

    if (svgDoc) {
        let targetElement = svgDoc.getElementById(`svg-number-${calloutNumber}`);

        if (targetElement) {
            // Get the bounding box of the text element
            let bbox = targetElement.getBBox();

            // Create a highlight rectangle
            let highlightBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            highlightBox.setAttribute("x", bbox.x - 20); // Padding
            highlightBox.setAttribute("y", bbox.y - 20);
            highlightBox.setAttribute("width", bbox.width + 40);
            highlightBox.setAttribute("height", bbox.height + 40);
            highlightBox.setAttribute("stroke", "red"); // Border color
            highlightBox.setAttribute("stroke-width", "20");
            highlightBox.setAttribute("fill", "none");
            highlightBox.setAttribute("id", `highlight-box-${calloutNumber}`);

            // Add the bounding box to the SVG
            svgDoc.documentElement.appendChild(highlightBox);

            // Remove the highlight after 1.5s
            setTimeout(() => {
                let removeBox = svgDoc.getElementById(`highlight-box-${calloutNumber}`);
                if (removeBox) {
                    removeBox.remove();
                }
            }, 1500);
        } else {
            console.log("Element not found in SVG: svg-number-" + calloutNumber);
        }
    }
}
