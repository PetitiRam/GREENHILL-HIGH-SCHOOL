// GREENHILL HIGH SCHOOL WEBSITE

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    // Mobile navigation
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the menu after selecting a section
        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Automatically display the current year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
