// ========== FAVORITES PAGE ==========

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesList = document.getElementById("favoritesList");
    const emptyDiv = document.getElementById("emptyFavorites");
    
    if (!favoritesList) return;
    
    favoritesList.innerHTML = "";
    
    if (favorites.length === 0) {
        if (emptyDiv) emptyDiv.style.display = "block";
        favoritesList.style.display = "none";
        return;
    }
    
    if (emptyDiv) emptyDiv.style.display = "none";
    favoritesList.style.display = "block";
    
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    
    // Button texts based on language
    const readTexts = { en: "Read Poem", ro: "Citește", zh: "读诗" };
    const removeTexts = { en: "Remove", ro: "Șterge", zh: "删除" };
    
    favorites.forEach(poemId => {
        const poem = window.poemsData.find(p => p.id === poemId);
        if (poem) {
            let title = poem.title.en;
            if (currentLang === "ro") title = poem.title.ro;
            if (currentLang === "zh") title = poem.title.zh;
            
            const favoriteItem = document.createElement("div");
            favoriteItem.className = "favorite-item";
            favoriteItem.innerHTML = `
                <div class="favorite-content">
                    <h3 class="favorite-title">${title}</h3>
                    <div class="favorite-preview">${poem.chinese.split("<br>")[0]}</div>
                </div>
                <div class="favorite-actions">
                    <button class="read-btn" data-id="${poem.id}">${readTexts[currentLang]}</button>
                    <button class="remove-btn" data-id="${poem.id}">${removeTexts[currentLang]}</button>
                </div>
            `;
            favoritesList.appendChild(favoriteItem);
        }
    });
    
    document.querySelectorAll(".read-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const poemId = this.dataset.id;
            const poemIndex = window.poemsData.findIndex(p => p.id === poemId);
            localStorage.setItem("selectedPoemIndex", poemIndex);
            window.location.href = "poem-detail.html";
        });
    });
    
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const poemId = this.dataset.id;
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favorites = favorites.filter(id => id !== poemId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            loadFavorites();
        });
    });
}

document.addEventListener("DOMContentLoaded", loadFavorites);
document.addEventListener("languageChanged", loadFavorites);