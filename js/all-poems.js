// ========== ALL POEMS PAGE ==========

// Function to render the poems list
function renderPoemsList() {
    const poemsList = document.getElementById("poemsList");
    if (!poemsList) {
        console.log("poemsList element not found");
        return;
    }
    
    // Make sure poemsData exists
    if (!window.poemsData) {
        console.log("poemsData not found!");
        return;
    }
    
    // Get current language from localStorage
    function renderPoemsList() {
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    // ... rest of code using currentLang for titles
}
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    
    // Clear existing content
    poemsList.innerHTML = "";
    
    // Loop through each poem and create a list item
    window.poemsData.forEach((poem, index) => {
        const poemItem = document.createElement("div");
        poemItem.className = "poem-list-item";
        
        // Get title in current language
        let title = poem.title.en;
        if (currentLang === "ro") title = poem.title.ro;
        if (currentLang === "zh") title = poem.title.zh;
        
        poemItem.innerHTML = `
            <div class="poem-list-content">
                <h3 class="poem-list-title">${title}</h3>
                <div class="poem-list-preview">${poem.chinese.split("<br>")[0]}</div>
            </div>
            <div class="poem-list-arrow">→</div>
        `;
        
        // Add click event to open poem detail page
        poemItem.addEventListener("click", () => {
            localStorage.setItem("selectedPoemIndex", index);
            window.location.href = "poem-detail.html";
        });
        
        poemsList.appendChild(poemItem);
    });
    
    console.log("Poems rendered, count:", window.poemsData.length);
}

// Listen for language changes
document.addEventListener("languageChanged", function() {
    console.log("Language changed, re-rendering poems list");
    renderPoemsList();
});

// Initial render when page loads
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, rendering poems list");
    renderPoemsList();
});
