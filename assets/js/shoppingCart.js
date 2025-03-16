console.log("✅ JavaScript is running!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded!");

    let cartButtons = document.querySelectorAll(".cart-btn");
    console.log("🛒 Found cart buttons:", cartButtons.length);

    let cart = []; // Global cart array

    // Attach event listeners to cart buttons
    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("🛒 Cart button clicked! Item ID:", this.getAttribute("data-item-id"));

            let row = this.closest("tr");
            console.log("🔍 Closest row:", row);

            if (!row) {
                console.log("⚠️ No row found! Check table structure.");
                return;
            }

            // Extract item data
            let itemData = {
                item: row.cells[0]?.textContent.trim() || "N/A",
                smr: row.cells[1]?.textContent.trim() || "N/A",
                nsn: row.cells[2]?.textContent.trim() || "N/A",
                partNumber: row.cells[3]?.textContent.trim() || "N/A",
                cageCode: row.cells[4]?.textContent.trim() || "N/A",
                nomenclature: row.cells[5]?.textContent.trim() || "N/A",
                quantity: row.cells[6]?.textContent.trim() || "N/A",
            };

            console.log("📦 Extracted Item Data:", itemData);

            // Check if item is already in cart
            let exists = cart.some(cartItem => cartItem.item === itemData.item);
            if (!exists) {
                cart.push(itemData);
                console.log("✅ Cart updated:", cart);
                updateCartUI();
            } else {
                console.log("⚠️ Item already in cart:", itemData.item);
            }
        });
    });

    function updateCartUI() {
        console.log("🔄 Updating cart UI. Current cart:", cart);

        let cartTable = document.querySelector("#cart-table tbody");
        cartTable.innerHTML = ""; // Clear cart display

        cart.forEach((item, index) => {
            let row = cartTable.insertRow();
            row.innerHTML = `
                <td>${item.item}</td>
                <td>${item.smr}</td>
                <td>${item.nsn}</td>
                <td>${item.partNumber}</td>
                <td>${item.cageCode}</td>
                <td>${item.nomenclature}</td>
                <td>${item.quantity}</td>
                <td><button class="remove-btn" data-index="${index}">❌</button></td>
            `;
        });

        document.querySelector("#cart-count").textContent = cart.length;

        // Attach remove functionality
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                console.log("🗑️ Removing item at index:", index);
                cart.splice(index, 1);
                updateCartUI();
            });
        });

        console.log("✅ Cart UI Updated!");
    }

    // Open & Close Cart Modal
    let cartButton = document.getElementById("cart-button");
    let cartModal = document.getElementById("cart-modal");

    if (cartButton && cartModal) {
        cartButton.addEventListener("click", function () {
            console.log("🛍️ Cart button clicked! Opening modal.");
            cartModal.style.display = "block";
        });

        document.getElementById("close-cart").addEventListener("click", function () {
            console.log("❌ Closing cart modal.");
            cartModal.style.display = "none";
        });
    } else {
        console.log("⚠️ Cart button or modal not found!");
    }

    // Export Cart to CSV
    document.getElementById("export-cart").addEventListener("click", function () {
        console.log("📄 Exporting cart to CSV!");
        
        let csvContent = "data:text/csv;charset=utf-8," 
            + "Item,SMR,NSN,Part Number,CAGE Code,Nomenclature,Quantity\n" 
            + cart.map(item => 
                `${item.item},${item.smr},${item.nsn},${item.partNumber},${item.cageCode},${item.nomenclature},${item.quantity}`
            ).join("\n");

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "shopping_cart.csv");
        document.body.appendChild(link);
        link.click();
    });

});
