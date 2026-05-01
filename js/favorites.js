// ========== FAVORITES FOR HOMEPAGE ==========

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const starBtn = document.getElementById("starBtn");

// Helper function to get "Saved" text in current language
function getSavedText() {
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    const savedTexts = { en: "Saved!", ro: "Salvat!", zh: "已保存！" };
    return savedTexts[currentLang];
}

// Helper function to get "Save to Favorites" text in current language
function getSaveText() {
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    const starTexts = { en: "Save to Favorites", ro: "Salvează la Favorite", zh: "收藏" };
    return starTexts[currentLang];
}

window.updateStarButton = function() {
    if (!starBtn) return;
    if (!window.getCurrentPoem) return;
    
    const currentPoemId = window.getCurrentPoem().id;
    
    if (favorites.includes(currentPoemId)) {
        starBtn.innerHTML = getSavedText();
    } else {
        starBtn.innerHTML = getSaveText();
    }
}

if (starBtn && window.getCurrentPoem) {
    window.updateStarButton();
    
    starBtn.addEventListener("click", function() {
        const currentPoemId = window.getCurrentPoem().id;
        
        if (favorites.includes(currentPoemId)) {
            // Unsave
            favorites = favorites.filter(id => id !== currentPoemId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            starBtn.innerHTML = getSaveText();
        } else {
            // Save
            favorites.push(currentPoemId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            starBtn.innerHTML = getSavedText();
        }
    });
    
    // Listen for language changes
    document.addEventListener("languageChanged", function() {
        window.updateStarButton();
    });
}