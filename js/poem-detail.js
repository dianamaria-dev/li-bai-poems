// ========== POEM DETAIL PAGE ==========

// Get selected poem from localStorage
let selectedIndex = parseInt(localStorage.getItem("selectedPoemIndex")) || 0;
let currentLang = localStorage.getItem("currentLanguage") || "en";

// Get current poem
function getCurrentPoem() {
    return window.poemsData[selectedIndex];
}

// Update the page content
function updatePoemDetail() {
    const poem = getCurrentPoem();
    if (!poem) return;
    
    // Update title
    const titleEl = document.getElementById("poemTitle");
    if (titleEl) {
        if (currentLang === "en") titleEl.innerHTML = poem.title.en;
        else if (currentLang === "ro") titleEl.innerHTML = poem.title.ro;
        else titleEl.innerHTML = poem.title.zh;
    }
    
    // Update Chinese text
    const chineseEl = document.getElementById("poemChinese");
    if (chineseEl) chineseEl.innerHTML = poem.chinese;
    
    // Update translation
    const translationEl = document.getElementById("poemTranslation");
    if (translationEl) {
        if (currentLang === "zh") {
            translationEl.style.display = "none";
        } else {
            translationEl.style.display = "block";
            translationEl.innerHTML = currentLang === "en" ? poem.english : poem.romanian;
        }
    }
    
    // Update vertical title image
    const verticalImg = document.getElementById("verticalTitleImg");
if (verticalImg) {
    const imageMap = {
        "quiet-night": "assets/images/titles/title-quiet-night.png",
        "drinking-alone": "assets/images/titles/title-drinking-alone.png",
        "hard-is-the-way": "assets/images/titles/title-hard-road.png",
        "to-wang-lun": "assets/images/titles/title-to-wang-lun.png",
        "mount-lu": "assets/images/titles/title-mount-lu.png",
        "invitation-to-wine": "assets/images/titles/title-invitation-to-wine.png",
        "hard-road-to-shu": "assets/images/titles/title-hard-road-to-shu.png"
    };
    verticalImg.src = imageMap[poem.id] || "assets/images/titles/title-quiet-night.png";
}
const stampImg = document.querySelector(".red-stamp");
if (stampImg) {
    stampImg.src = "assets/images/decorative/stamp-taibai.png";
}
    
    // Update commentary
    const commentaryEl = document.getElementById("commentaryText");
    if (commentaryEl) {
        commentaryEl.innerHTML = getCommentary(poem.id, currentLang);
    }
    
    // Update star button
    updateDetailStarButton();
}

// ========== COMMENTARIES ==========
function getCommentary(poemId, lang) {
    const commentaries = {
        "quiet-night": {
            en: "This is perhaps the most beloved poem in all of Chinese literature. Written by Li Bai while wandering far from home, it captures that universal ache we all know — lying awake in an unfamiliar place, seeing moonlight, and for just a moment, mistaking it for frost. The genius of this poem is its simplicity. Four short lines, yet they hold an ocean of feeling.",
            ro: "Acesta este probabil cel mai iubit poem din toată literatura chineză. Scris de Li Bai în timp ce rătăcea departe de casă, capturează acea durere universală pe care o știm cu toții. Geniul acestui poem este simplitatea sa.",
            zh: "这是中国文学中最受喜爱的诗之一。李白在外漂泊时写下这首诗，捕捉了我们都知道的那种普遍的心痛。这首诗的天才在于它的简单。"
        },
        "drinking-alone": {
            en: "This poem is pure Li Bai — drunk, lonely, and absolutely alive. He turns solitude into a party. With just a pot of wine, he invites the moon and his shadow to drink with him. Three companions from one lonely man. This poem teaches us that solitude doesn't have to be sad.",
            ro: "Acest poem este purul Li Bai — beat, singur și absolut viu. El transformă singurătatea într-o petrecere. Acest poem ne învață că singurătatea nu trebuie să fie tristă.",
            zh: "这首诗是纯粹的李白——醉醺醺的，孤独的，但绝对充满生机。这首诗教会我们孤独不一定是悲伤的。"
        },
        "hard-is-the-way": {
            en: "Life is hard. Li Bai knew this well. In this poem, he faces frozen rivers and snow-covered mountains — metaphors for the obstacles in his path. But here's the miracle: he doesn't give up. 'Someday I will ride the wind and break the waves,' he declares.",
            ro: "Viața este grea. Li Bai știa bine acest lucru. Dar iată miracolul: nu renunță. 'Într-o zi voi călări vântul și voi sparge valurile', declară el.",
            zh: "生活是艰难的。李白深知这一点。但奇迹就在这里：他没有放弃。'总有一天我会乘风破浪，'他宣称。"
        },
        "to-wang-lun": {
            en: "This is a poem about friendship, written as Li Bai was leaving his friend Wang Lun. The last two lines are famous: 'Peach Blossom Pool's water is a thousand feet deep, but not as deep as Wang Lun's farewell feeling.'",
            ro: "Acesta este un poem despre prietenie. Ultimele două versuri sunt celebre: 'Apa din Bazinul Florilor de Piersic este adâncă de o mie de picioare, dar nu la fel de adâncă precum sentimentul de rămas-bun al lui Wang Lun.'",
            zh: "这是一首关于友谊的诗。最后两行很有名：'桃花潭水深千尺，不及汪伦送我情。'"
        },
        "mount-lu": {
            en: "Li Bai loved nature, and no poem shows this better than 'Mount Lu Waterfall.' The magical line: 'I suspect it's the Milky Way falling from the Ninth Heaven.' A waterfall becomes the galaxy itself.",
            ro: "Li Bai a iubit natura. Versul magic: 'Bănuiesc că este Calea Lactee căzând din al Nouălea Cer.' O cascadă devine Calea Lactee.",
            zh: "李白热爱自然。神奇的一行：'疑是银河落九天。'瀑布变成了银河。"
        },
        "invitation-to-wine": {
            en: "This is Li Bai at his wildest, most glorious, most drunk. 'Invitation to Wine' is a party in poetic form. 'Heaven gave me talent, it must be useful.' This poem is a reminder to celebrate life and trust your gifts.",
            ro: "Acesta este Li Bai în forma sa cea mai sălbatică. 'Invitație la vin' este o petrecere în formă poetică. 'Cerul mi-a dat talent, trebuie să fie folositor.'",
            zh: "这是李白最狂野的状态。《将进酒》是一场诗意的派对。'天生我材必有用。'"
        },
        "hard-road-to-shu": {
            en: "This is Li Bai's most ambitious poem — a wild journey through the mountains of Sichuan. 'The road to Shu is harder than climbing to the blue sky.' This poem speaks to anyone who has taken a difficult path in life.",
            ro: "Acesta este cel mai ambițios poem al lui Li Bai. 'Drumul către Shu este mai greu decât să urci pe cerul albastru.' Acest poem vorbește oricui a luat o cale dificilă în viață.",
            zh: "这是李白最具雄心的诗。'蜀道之难，难于上青天。'这首诗献给任何在生活中走过艰难道路的人。"
        }
    };
    
    if (commentaries[poemId] && commentaries[poemId][lang]) {
        return commentaries[poemId][lang];
    }
    return "A beautiful poem by Li Bai that continues to inspire readers across the world.";
}

// ========== FAVORITES FOR DETAIL PAGE ==========
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const starDetailBtn = document.getElementById("starDetailBtn");

function updateDetailStarButton() {
    if (!starDetailBtn) return;
    const poem = getCurrentPoem();
    if (!poem) return;
    
    const savedTexts = { en: "Saved!", ro: "Salvat!", zh: "已保存！" };
    const starTexts = { en: "Save to Favorites", ro: "Salvează la Favorite", zh: "收藏" };
    
    if (favorites.includes(poem.id)) {
        starDetailBtn.innerHTML = savedTexts[currentLang];
    } else {
        starDetailBtn.innerHTML = starTexts[currentLang];
    }
}

if (starDetailBtn) {
    updateDetailStarButton();
    
    starDetailBtn.addEventListener("click", function() {
        const poem = getCurrentPoem();
        if (!poem) return;
        
        const savedTexts = { en: "Saved!", ro: "Salvat!", zh: "已保存！" };
        const starTexts = { en: "Save to Favorites", ro: "Salvează la Favorite", zh: "收藏" };
        
        if (favorites.includes(poem.id)) {
            favorites = favorites.filter(id => id !== poem.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            starDetailBtn.innerHTML = starTexts[currentLang];
        } else {
            favorites.push(poem.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            starDetailBtn.innerHTML = savedTexts[currentLang];
        }
    });
}

// ========== NAVIGATION ==========
function goToPreviousPoem() {
    selectedIndex = (selectedIndex - 1 + window.poemsData.length) % window.poemsData.length;
    localStorage.setItem("selectedPoemIndex", selectedIndex);
    window.location.reload();
}

function goToNextPoem() {
    selectedIndex = (selectedIndex + 1) % window.poemsData.length;
    localStorage.setItem("selectedPoemIndex", selectedIndex);
    window.location.reload();
}

// ========== LANGUAGE CHANGE HANDLER ==========
document.addEventListener("languageChanged", function(e) {
    currentLang = e.detail.language || localStorage.getItem("currentLanguage") || "en";
    updatePoemDetail();
});

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", function() {
    updatePoemDetail();
    
    const prevBtn = document.getElementById("prevPoemBtn");
    const nextBtn = document.getElementById("nextPoemBtn");
    
    if (prevBtn) prevBtn.addEventListener("click", goToPreviousPoem);
    if (nextBtn) nextBtn.addEventListener("click", goToNextPoem);
});