// ========== LANGUAGE SWITCHER ==========

// Set language function
function setLanguage(lang) {
    localStorage.setItem("currentLanguage", lang);
    window.currentLanguage = lang;
    
    // Update homepage poem display
    if (typeof window.updatePoemDisplay === 'function') {
        window.updatePoemDisplay();
    }
    
    // Update all UI text
    translateUI(lang);
    
    // Update all-poems list if on that page
    if (typeof renderPoemsList === 'function') {
        renderPoemsList();
    }
    
    // Update favorites list if on that page
    if (typeof loadFavorites === 'function') {
        loadFavorites();
    }
    
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
}

// Update dropdown button text (mobile only)
function updateDropdownButton(lang) {
    const langDropdownBtn = document.getElementById("langDropdownBtn");
    if (!langDropdownBtn) return;
    
    let displayText = "EN ▼";
    if (lang === "ro") displayText = "RO ▼";
    if (lang === "zh") displayText = "中文 ▼";
    
    langDropdownBtn.innerHTML = displayText;
}

// Main translation function - translates EVERYTHING
function translateUI(lang) {
    // 1. MENU ITEMS
    const menuItems = {
        en: { home: "Home", allPoems: "All Poems", favorites: "My Favorites", about: "About Li Bai" },
        ro: { home: "Acasă", allPoems: "Toate Poeziile", favorites: "Favoritele Mele", about: "Despre Li Bai" },
        zh: { home: "首页", allPoems: "全部诗", favorites: "我的收藏", about: "关于李白" }
    };

    document.querySelectorAll(".menu-item").forEach(item => {
        const text = item.innerText.trim();
        if (text === "Home" || text === "Acasă" || text === "首页") {
            item.innerHTML = menuItems[lang].home;
        } else if (text === "All Poems" || text === "Toate Poeziile" || text === "全部诗") {
            item.innerHTML = menuItems[lang].allPoems;
        } else if (text === "My Favorites" || text === "Favoritele Mele" || text === "我的收藏") {
            item.innerHTML = menuItems[lang].favorites;
        } else if (text === "About Li Bai" || text === "Despre Li Bai" || text === "关于李白") {
            item.innerHTML = menuItems[lang].about;
        }
    });
    
    // 2. HOMEPAGE - Daily Poem header
    const dailyHeader = document.querySelector(".poem-text h1");
    if (dailyHeader) {
        const dailyTexts = { en: "Daily Poem", ro: "Poezia Zilei", zh: "每日一诗" };
        dailyHeader.innerHTML = dailyTexts[lang];
    }
    
    // 3. ALL POEMS PAGE
    const allPoemsTitle = document.querySelector(".poems-list-card h1");
    if (allPoemsTitle) {
        const titles = { en: "All Poems", ro: "Toate Poeziile", zh: "全部诗" };
        allPoemsTitle.innerHTML = titles[lang];
    }
    
    const allPoemsSubtitle = document.querySelector(".poems-list-card .subtitle");
    if (allPoemsSubtitle) {
        const subtitles = { en: "7 poems by Li Bai — The Immortal Poet", ro: "7 poezii de Li Bai — Poetul nemuritor", zh: "李白七首诗 — 诗仙" };
        allPoemsSubtitle.innerHTML = subtitles[lang];
    }
    
    // 4. FAVORITES PAGE
    const favoritesTitle = document.querySelector(".favorites-card h1");
    if (favoritesTitle) {
        const favTitles = { en: "My Favorite Poems", ro: "Poeziile Mele Favorite", zh: "我最喜欢的诗" };
        favoritesTitle.innerHTML = favTitles[lang];
    }
    
    const favoritesSubtitle = document.querySelector(".favorites-card .subtitle");
    if (favoritesSubtitle) {
        const subTexts = { en: "Poems you've saved with the star button", ro: "Poeziile pe care le-ai salvat cu butonul stea", zh: "你用星号按钮保存的诗" };
        favoritesSubtitle.innerHTML = subTexts[lang];
    }
    
    const emptyFavorites = document.querySelector(".empty-favorites");
    if (emptyFavorites) {
        const emptyTexts = {
            en: "You haven't saved any poems yet.<br>Go to Daily Poem or All Poems and click the Save button!",
            ro: "Nu ai salvat nicio poezie încă.<br>Mergi la Poezia Zilei sau Toate Poeziile și apasă butonul Salvează!",
            zh: "你还没有保存任何诗。<br>去每日一诗或全部诗点击保存按钮！"
        };
        emptyFavorites.innerHTML = emptyTexts[lang];
    }
    
    // 5. ABOUT LI BAI PAGE
    const aboutTitle = document.querySelector(".about-card h1");
    if (aboutTitle) {
        const aboutTitles = { en: "Li Bai", ro: "Li Bai", zh: "李白" };
        aboutTitle.innerHTML = aboutTitles[lang];
    }
    
    const aboutSubtitle = document.querySelector(".about-subtitle");
    if (aboutSubtitle) {
        const subTexts = { en: "701–762 · The Immortal Poet", ro: "701–762 · Poetul Nemuritor", zh: "701–762年 · 诗仙" };
        aboutSubtitle.innerHTML = subTexts[lang];
    }
    
    // About page paragraphs
    const aboutParagraphs = document.querySelectorAll(".about-content p");
    if (aboutParagraphs.length >= 4) {
        const aboutTexts = {
            en: [
                "Li Bai (also known as Li Po) is widely regarded as one of the greatest poets in Chinese history. Often called the \"Immortal Poet\" (诗仙), he lived during the Tang Dynasty — a golden age of Chinese poetry.",
                "His poems are known for their vivid imagination, love of nature, celebration of wine, and deep friendship. He traveled extensively throughout China, and his wanderings deeply influenced his work.",
                "Legend says Li Bai died attempting to embrace the reflection of the moon from a boat on the Yangtze River — a fitting end for a poet who so loved the moon and wine.",
                "Over 1,000 of his poems survive today, and they continue to be recited, studied, and cherished across the world."
            ],
            ro: [
                "Li Bai (cunoscut și ca Li Po) este considerat unul dintre cei mai mari poeți din istoria chineză. Adesea numit \"Poetul Nemuritor\" (诗仙), a trăit în timpul Dinastiei Tang — o epocă de aur a poeziei chineze.",
                "Poeziile sale sunt cunoscute pentru imaginația lor vie, dragostea pentru natură, celebrarea vinului și prietenia profundă. A călătorit extensiv prin China, iar rătăcirile sale i-au influențat profund opera.",
                "Legenda spune că Li Bai a murit încercând să îmbrățișeze reflectarea lunii dintr-o barcă pe râul Yangtze — un sfârșit potrivit pentru un poet care a iubit atât de mult luna și vinul.",
                "Peste 1.000 dintre poeziile sale supraviețuiesc astăzi și continuă să fie recitate, studiate și prețuite în întreaga lume."
            ],
            zh: [
                "李白被广泛认为是中国历史上最伟大的诗人之一。常被称为\"诗仙\"，他生活在唐朝——中国诗歌的黄金时代。",
                "他的诗以生动的想象力、对自然的热爱、对酒的赞美和深厚的友谊而闻名。他游历中国各地，他的游历深刻影响了他的作品。",
                "传说李白在长江上试图从船上拥抱月亮的倒影时去世——对于一个如此热爱月亮和酒的诗人来说，这是一个恰当的结局。",
                "今天有超过1000首他的诗作存世，它们继续在世界各地被诵读、研究和珍惜。"
            ]
        };
        
        aboutParagraphs.forEach((p, index) => {
            if (aboutTexts[lang] && aboutTexts[lang][index]) {
                p.innerHTML = aboutTexts[lang][index];
            }
        });
    }
    
    // 6. POEM DETAIL PAGE
    const dynastyEl = document.querySelector(".dynasty");
    if (dynastyEl) {
        const dynastyTexts = { en: "Tang Dynasty · 8th Century", ro: "Dinastia Tang · Secolul 8", zh: "唐朝 · 8世纪" };
        dynastyEl.innerHTML = dynastyTexts[lang];
    }
    
    const reflectionsEl = document.querySelector(".commentary-section h2");
    if (reflectionsEl) {
        const reflectionTexts = { en: "Reflections on the Poem", ro: "Reflecții asupra Poeziei", zh: "诗之感悟" };
        reflectionsEl.innerHTML = reflectionTexts[lang];
    }
    
    // 7. BUTTONS (all pages)
    // Update star button text (if not in "Saved!" state)
document.querySelectorAll(".star-btn, #starBtn, .star-btn-detail, #starDetailBtn").forEach(btn => {
    // Only update if it's not showing "Saved!" in any language
    const isSaved = btn.innerHTML === "Saved!" || btn.innerHTML === "Salvat!" || btn.innerHTML === "已保存！";
    if (!isSaved) {
        const starTexts = { en: "Save to Favorites", ro: "Salvează la Favorite", zh: "收藏" };
        btn.innerHTML = starTexts[lang];
    }
});
    
    document.querySelectorAll(".next-btn, #nextBtn, .nav-next").forEach(btn => {
        const nextTexts = { en: "Next Poem", ro: "Următoarea Poezie", zh: "下一首" };
        btn.innerHTML = nextTexts[lang];
    });
    
    document.querySelectorAll(".nav-prev, #prevPoemBtn").forEach(btn => {
        const prevTexts = { en: "Previous Poem", ro: "Poezia Anterioară", zh: "上一首" };
        btn.innerHTML = prevTexts[lang];
    });
    
    document.querySelectorAll(".read-btn").forEach(btn => {
        const readTexts = { en: "Read Poem", ro: "Citește Poezia", zh: "读诗" };
        btn.innerHTML = readTexts[lang];
    });
    
    document.querySelectorAll(".remove-btn").forEach(btn => {
        const removeTexts = { en: "Remove", ro: "Șterge", zh: "删除" };
        btn.innerHTML = removeTexts[lang];
    });
    
    // 8. CONTACT SECTION (in footer)
 // Contact page menu items (inside the footer)
const footerLinks = document.querySelectorAll(".footer-links a");
if (footerLinks.length === 4) {
    const linkTexts = {
        en: ["Home", "All Poems", "My Favorites", "About Li Bai"],
        ro: ["Acasă", "Toate Poeziile", "Favoritele Mele", "Despre Li Bai"],
        zh: ["首页", "全部诗", "我的收藏", "关于李白"]
    };
    
    footerLinks.forEach((link, index) => {
        if (linkTexts[lang] && linkTexts[lang][index]) {
            link.innerHTML = linkTexts[lang][index];
        }
    });
}

// Footer legal text (copyright)
const footerLegal = document.querySelectorAll(".footer-legal span");
if (footerLegal.length >= 3) {
    const legalTexts = {
        en: ["© 2024 The Wine Poet", "•", "Li Bai — Tang Dynasty"],
        ro: ["© 2024 The Wine Poet", "•", "Li Bai — Dinastia Tang"],
        zh: ["© 2024 酒仙诗人", "•", "李白 — 唐朝"]
    };
    
    footerLegal.forEach((span, index) => {
        if (legalTexts[lang] && legalTexts[lang][index]) {
            span.innerHTML = legalTexts[lang][index];
        }
    });
}

// Designer credit (already translated in your code, but ensure it works)
const designerCredit = document.querySelector(".designer-credit");
if (designerCredit) {
    const creditTexts = {
        en: "Calligraphy and website design by Diana Ș.",
        ro: "Toată caligrafia și designul site-ului de Diana Ș.",
        zh: "所有书法和网站设计由Diana Ș完成。"
    };
    designerCredit.innerHTML = creditTexts[lang];
}

// ========== DESKTOP LANGUAGE BUTTONS ==========
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const lang = this.dataset.lang;
        setLanguage(lang);
        updateDropdownButton(lang);
        
        document.querySelectorAll(".lang-btn").forEach(b => {
            b.style.backgroundColor = "transparent";
            b.style.color = "white";
        });
        this.style.backgroundColor = "white";
        this.style.color = "#C62828";
        
        setTimeout(() => {
            this.style.backgroundColor = "transparent";
            this.style.color = "white";
        }, 500);
    });
});
}
// ========== MOBILE LANGUAGE DROPDOWN ==========
const langDropdownBtn = document.getElementById("langDropdownBtn");
const langDropdownContent = document.getElementById("langDropdownContent");

if (langDropdownBtn && langDropdownContent) {
    langDropdownBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        langDropdownContent.classList.toggle("show");
    });
    
    document.addEventListener("click", function() {
        langDropdownContent.classList.remove("show");
    });
    
    const langOptions = document.querySelectorAll(".lang-option");
    langOptions.forEach(option => {
        option.addEventListener("click", function(e) {
            e.stopPropagation();
            const lang = this.dataset.lang;
            setLanguage(lang);
            updateDropdownButton(lang);
            
            document.querySelectorAll(".lang-btn").forEach(btn => {
                btn.style.backgroundColor = "transparent";
                btn.style.color = "white";
                if (btn.dataset.lang === lang) {
                    btn.style.backgroundColor = "white";
                    btn.style.color = "#C62828";
                    setTimeout(() => {
                        btn.style.backgroundColor = "transparent";
                        btn.style.color = "white";
                    }, 500);
                }
            });
            
            langDropdownContent.classList.remove("show");
            
            langOptions.forEach(opt => {
                opt.style.backgroundColor = "transparent";
            });
            this.style.backgroundColor = "#8B0000";
            
            setTimeout(() => {
                this.style.backgroundColor = "transparent";
            }, 300);
        });
    });
}

// ========== INITIALIZE ==========
const savedLang = localStorage.getItem("currentLanguage") || "en";
setLanguage(savedLang);
updateDropdownButton(savedLang);