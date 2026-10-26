/*

* GREENHILL HIGH SCHOOL, KISAASI
* Website interactions
  */

document.addEventListener("DOMContentLoaded", function () {
"use strict";

// =========================================
// ELEMENTS
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
const yearElement = document.getElementById("current-year");

// =========================================
// MOBILE NAVIGATION
// =========================================

if (menuToggle && navigation) {
    function openMenu() {
        navigation.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        menuToggle.textContent = "✕";
    }

    function closeMenu() {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    }

    function toggleMenu() {
        const isOpen = navigation.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuToggle.addEventListener("click", toggleMenu);

    // Close the menu after selecting a navigation link.
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when the user presses Escape.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close the mobile menu when the user taps outside it.
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navigation.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // Reset the menu when switching to a desktop-sized screen.
    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}

// =========================================
// AUTOMATIC FOOTER YEAR
// =========================================

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =========================================
// SMOOTH SECTION NAVIGATION
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        // Ignore empty fragment links.
        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Update the browser fragment without a sudden jump.
            if (window.location.hash !== targetId) {
                history.replaceState(null, "", targetId);
            }
        }
    });
});

// =========================================
// SCHOOL LOGO ERROR HANDLING
// =========================================

document.querySelectorAll(".school-logo, .about-school-logo")
    .forEach(function (logo) {
        logo.addEventListener("error", function () {
            console.warn(
                "School logo could not be loaded. Check the image path:",
                logo.getAttribute("src")
            );
        });
    });

// =========================================
// IMAGE LOADING DIAGNOSTICS
// =========================================

document.querySelectorAll(".gallery-photo").forEach(function (image) {
    image.addEventListener("error", function () {
        console.warn(
            "Gallery image could not be loaded:",
            image.getAttribute("src")
        );
    });
});

// =========================================
// WEBSITE READY
// =========================================

console.log("Greenhill High School website is ready.");

});
