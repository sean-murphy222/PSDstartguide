// Illustrator Script: Export Layer Positions Correctly for CSS
function exportAllLayerPositions() {
    var doc = app.activeDocument;

    if (doc.artboards.length < 1) {
        alert("No artboard found. Create an artboard first.");
        return;
    }

    var layers = doc.layers;
    if (layers.length < 2) {
        alert("Ensure all interactive elements are on separate layers, and the last layer is the background.");
        return;
    }

    var artboard = doc.artboards[0]; // Get the first artboard
    var artboardBounds = artboard.artboardRect; // Save the artboard's original size
    var artboardLeft = artboardBounds[0]; // X position
    var artboardTop = artboardBounds[1]; // Y position
    var artboardBottom = artboardBounds[3]; // Bottom edge of the artboard

    var bgLayer = layers[layers.length - 1]; // Assume last layer is the background
    var bgItem = bgLayer.pageItems[0]; // Get the first item in the background layer

    if (!bgItem) {
        alert("No background item found. Ensure the background layer has an image.");
        return;
    }

    // LOCK the background so the script does NOT accidentally move it
    bgLayer.locked = true;

    // Get background dimensions & position relative to artboard
    var bgX = bgItem.left;
    var bgY = bgItem.top;
    var bgWidth = bgItem.width;
    var bgHeight = bgItem.height;

    var cssOutput = "/* Auto-Generated CSS from Illustrator (Corrected Y-Order) */\n\n";

    // Loop through all layers except the background
    for (var i = 0; i < layers.length - 1; i++) {
        var layer = layers[i];

        if (layer.pageItems.length > 0) {
            for (var j = 0; j < layer.pageItems.length; j++) {
                var item = layer.pageItems[j];

                // Get the position relative to the background's TOP-LEFT corner
                var x = item.left - bgX;
                var y = bgHeight - (item.top - artboardBottom); // **Fix: Invert Y positioning to match CSS order**

                // Convert to percentage-based positioning
                var leftPercent = ((x / bgWidth) * 100).toFixed(2);
                var topPercent = ((y / bgHeight) * 100).toFixed(2);
                var widthPercent = ((item.width / bgWidth) * 100).toFixed(2);

                // Generate CSS Rule
                cssOutput += "#" + layer.name + " {\n";
                cssOutput += "    position: absolute;\n";
                cssOutput += "    top: " + topPercent + "%;\n";
                cssOutput += "    left: " + leftPercent + "%;\n";
                cssOutput += "    width: " + widthPercent + "%;\n";
                cssOutput += "    height: auto;\n";
                cssOutput += "}\n\n";
            }
        }
    }

    // Save CSS Output to File
    var cssFile = File.saveDialog("Save CSS File", "*.css");
    if (cssFile) {
        cssFile.open("w");
        cssFile.write(cssOutput);
        cssFile.close();
        alert("CSS file saved successfully! Elements should now be in the correct order.");
    }

    // UNLOCK the background after execution
    bgLayer.locked = false;
}

// Run the function
exportAllLayerPositions();
