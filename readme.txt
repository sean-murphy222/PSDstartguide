# HTML Maintenance Guide

## Introduction
This guide explains how to edit the HTML structure of this project while keeping the CSS and JavaScript untouched. The goal is to make updates easy while maintaining consistency.

## Project Structure
- `index.html` – Main landing page.
- `landing.html` – Landing page with authentication details.
- `main-menu.html` – Contains navigation links to different sections.
- `general-info.html` – General information about the system.
- `operation.html` – Details about system operation.
- `operation-proc.html` – Step-by-step operation procedures.
- `pmcs.html` – Preventive Maintenance Checks and Services.
- `maintenance.html` – Interactive maintenance guide.
- `rpstl.html` – Repair Parts and Special Tools List.
- `supporting-info.html` – Additional supporting information.
- `troubleshooting.html` – Troubleshooting procedures and guided diagnostics.
- `header.html` – Standard header used across pages.
- `sidebar.html` – Sidebar navigation component.
- `footer.html` – Footer with additional navigation and references.

## General Editing Rules
- Modify only the **HTML structure**.
- Follow the **predefined styles** instead of adding new ones.
- Ensure all elements follow the defined structure to avoid breaking the layout.

---

## Common HTML Elements & Usage

### 1. Page Containers
#### **`<main>` - Primary Content Area**
- **Purpose:** Holds the main content of the page.
- **Allowed Attributes:** None.
- **Typical Children:** `<section>`, `<article>`, `<aside>`.

```html
<main>
    <section class="content-block">
        <h2>Section Title</h2>
        <p>Content goes here.</p>
    </section>
</main>
```

### 2. Sections & Layout Blocks
#### **`<section>` - Content Grouping**
- **Purpose:** Groups related content.
- **Allowed Attributes:** `class` (e.g., `class="content-block"`).
- **Typical Children:** `<h2>`, `<p>`, `<ul>`, `<div>`.

```html
<section class="content-block">
    <h2>Title</h2>
    <p>Paragraph text.</p>
</section>
```

#### **`<div class="container">` - Main Wrapping Div**
- **Purpose:** Ensures consistent spacing and alignment.
- **Allowed Attributes:** `class="container"`.
- **Typical Children:** `<main>`, `<section>`.

```html
<div class="container">
    <main>
        <section>
            <h2>Content</h2>
        </section>
    </main>
</div>
```

---

## Tables & Lists
### 3. Data Tables
#### **Inspection Table (`pmcs.html`)**
- **Purpose:** Displays PMCS procedures.
- **Allowed Attributes:** `id`, `class`.
- **Typical Children:** `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.

```html
<table id="inspection-table">
    <thead>
        <tr>
            <th>ITEM NO.</th>
            <th>INTERVAL</th>
            <th>ITEM TO BE CHECKED OR SERVICED</th>
            <th>PROCEDURE</th>
            <th>NON-MISSION CAPABLE IF</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>001</td>
            <td>Monthly</td>
            <td>System Check</td>
            <td>Check for errors</td>
            <td>Failure to start</td>
        </tr>
    </tbody>
</table>
```

### 4. Shopping Cart Table (`rpstl.html`)
- **Purpose:** Allows users to select parts.
- **Allowed Attributes:** `id`, `class`.
- **Typical Children:** `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.

```html
<table class="cart-table" id="cart-table">
    <thead>
        <tr>
            <th>Item</th>
            <th>NSN</th>
            <th>Part Number</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Filter Drier</td>
            <td>4130-01-610-6656</td>
            <td>10-52700</td>
            <td>1</td>
            <td><button class="cart-btn">🛒</button></td>
        </tr>
    </tbody>
</table>
```

---

## Forms & Interactive Elements
### 5. Popups (`general-info.html`, `pmcs.html`, `footer.html`)
#### **Popup Windows**
- **Purpose:** Provides additional information in a modal.
- **Allowed Attributes:** `id`, `class`.
- **Typical Children:** `<button>`, `<h3>`, `<form>`.

```html
<div id="fail-popup" class="popup">
    <div class="popup-content">
        <h3>Record Fault</h3>
        <button onclick="closePopup()">Close</button>
    </div>
</div>
```

---

## Header & Footer
### 6. Header (`header.html`)
#### **Navigation Header**
- **Purpose:** Displays the title and logos.
- **Allowed Attributes:** `class="header-content"`.

```html
<header>
    <div class="header-content">
        <img class="header-logo" src="../assets/images/PSD-TOOLS.png" alt="CECOM Logo" width="100">
        <h1 class="header-title">PSD TM APP</h1>
        <img class="header-logo" src="../assets/images/cecom.png" alt="Weapon System Logo" width="100">
    </div>
</header>
```

### 7. Footer (`footer.html`)
#### **Slide-Out Menu & Navigation**
- **Purpose:** Contains extra navigation options and references.

```html
<footer>
    <div class="footer-left">
        <button id="open-menu" class="footer-button">🏠</button>
        <button id="open-info" class="footer-button">ℹ️</button>
    </div>
    <div class="footer-right">
        <button onclick="window.history.back();" class="footer-button">←</button>
        <a href="#" class="footer-button" id="next-button">→</a>
    </div>
</footer>
```

---

## Final Notes
- **Follow the existing structure** to maintain consistency.
- **Use predefined classes** instead of modifying CSS files.
- **JavaScript should not be edited** unless absolutely necessary.

For further clarification, contact the project maintainer.