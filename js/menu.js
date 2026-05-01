// ========== SLIDING MENU ==========
document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menuBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuPanel = document.getElementById("menuPanel");
    const closeMenu = document.getElementById("closeMenu");

    if (!menuBtn || !menuOverlay || !menuPanel || !closeMenu) {
        console.log("Menu elements not found!");
        return;
    }

    // Open menu
    menuBtn.addEventListener("click", function() {
        menuOverlay.classList.add("open");
        menuPanel.classList.add("open");
    });

    // Close menu (X button)
    closeMenu.addEventListener("click", function() {
        menuOverlay.classList.remove("open");
        menuPanel.classList.remove("open");
    });

    // Close menu when clicking on overlay
    menuOverlay.addEventListener("click", function() {
        menuOverlay.classList.remove("open");
        menuPanel.classList.remove("open");
    });

    // Menu item clicks - let browser handle navigation
    // No preventDefault() on valid links
});