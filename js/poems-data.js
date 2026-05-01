// ========== POEMS DATA - ALL 7 POEMS ==========

let currentLanguage = "en";
let currentPoemIndex = 0;

const poemsData = [
    {
        id: "quiet-night",
        title: { en: "Quiet Night Thoughts", ro: "Gânduri într-o noapte liniștită", zh: "静夜思" },
        chinese: "床前明月光<br>疑是地上霜<br>举头望明月<br>低头思故乡",
        english: "Before my bed, the moon shines bright<br>I think it's frost upon the ground<br>I raise my head to watch the moon<br>I lower my head and think of home",
        romanian: "Lângă pat, luna strălucește<br>Cred că este gheață pe pământ<br>Ridic capul să privesc luna<br>Las capul în jos și mă gândesc acasă"
    },
    {
        id: "drinking-alone",
        title: { en: "Drinking Alone Under the Moon", ro: "Bea singur sub lună", zh: "月下独酌" },
        chinese: "花间一壶酒<br>独酌无相亲<br>举杯邀明月<br>对影成三人",
        english: "Among the flowers, a pot of wine<br>Drinking alone, no friends near<br>Raising my cup, I invite the bright moon<br>With my shadow, that makes three of us",
        romanian: "Printre flori, un ulcior de vin<br>Beau singur, niciun prieten aproape<br>Ridic paharul, invit luna strălucitoare<br>Cu umbra mea, suntem trei"
    },
    {
        id: "hard-is-the-way",
        title: { en: "Hard is the Way of the World", ro: "Greu este drumul lumii", zh: "行路难" },
        chinese: "金樽清酒斗十千<br>玉盘珍羞直万钱<br>停杯投箸不能食<br>拔剑四顾心茫然<br>欲渡黄河冰塞川<br>将登太行雪满山<br>闲来垂钓碧溪上<br>忽复乘舟梦日边<br>行路难，行路难<br>多歧路，今安在<br>长风破浪会有时<br>直挂云帆济沧海",
        english: "Pure wine in golden cup costs ten thousand coppers<br>Fine food in jade plate is worth as much<br>I put down my cup and chopsticks, unable to eat<br>I draw my sword and look around, my heart confused<br>I want to cross Yellow River, but ice blocks the stream<br>I want to climb Taihang Mountain, but snow covers the path<br>Leisurely I fish in the green stream<br>Then I board a boat and dream of the sun's edge<br>Hard is the way, hard is the way<br>Many crossroads, where am I now?<br>Someday I will ride the wind and break the waves<br>Hoist my sail and cross the vast sea",
        romanian: "Vin pur în cupă de aur costă zece mii de monede<br>Mâncare fină pe farfurie de jad valorează la fel<br>Las paharul și bețele de mâncat, nu pot să mănânc<br>Scot sabia și privesc în jur, inima mea confuză<br>Vreau să traversez Fluviul Galben, dar gheața blochează râul<br>Vreau să urc pe Muntele Taihang, dar zăpada acoperă calea<br>Lenevos pescuiesc în pârâul verde<br>Apoi mă urc într-o barcă și visez la marginea soarelui<br>Greu este drumul, greu este drumul<br>Multe răscruci, unde sunt acum?<br>Într-o zi voi călări vântul și voi sparge valurile<br>Voi ridica pânza și voi traversa marea vastă"
    },
    {
        id: "to-wang-lun",
        title: { en: "To Wang Lun", ro: "Către Wang Lun", zh: "赠汪伦" },
        chinese: "李白乘舟将欲行<br>忽闻岸上踏歌声<br>桃花潭水深千尺<br>不及汪伦送我情",
        english: "Li Bai aboard a boat, about to depart<br>Suddenly hears stomping and singing from shore<br>Peach Blossom Pool's water is a thousand feet deep<br>But not as deep as Wang Lun's farewell feeling",
        romanian: "Li Bai într-o barcă, pe punctul de a pleca<br>Deodată aude bătăi din picioare și cântece de pe mal<br>Apa din Bazinul Florilor de Piersic are o mie de picioare adâncime<br>Dar nu la fel de adânc ca sentimentul de rămas-bun al lui Wang Lun"
    },
    {
        id: "mount-lu",
        title: { en: "Mount Lu Waterfall", ro: "Cascada Muntelui Lu", zh: "望庐山瀑布" },
        chinese: "日照香炉生紫烟<br>遥看瀑布挂前川<br>飞流直下三千尺<br>疑是银河落九天",
        english: "The sun lights up Incense Peak, purple mist rises<br>From afar I see the waterfall hanging like a river<br>The torrent plunges three thousand feet straight down<br>I suspect it's the Milky Way falling from the Ninth Heaven",
        romanian: "Soarele luminează Vârful Tămâiei, ceață violetă se ridică<br>De departe văd cascada atârnând ca un râu<br>Torrentul se prăbușește trei mii de picioare direct în jos<br>Bănuiesc că este Calea Lactee căzând din al Nouălea Cer"
    },
    {
        id: "invitation-to-wine",
        title: { en: "Invitation to Wine", ro: "Invitație la vin", zh: "将进酒" },
        chinese: "君不见黄河之水天上来<br>奔流到海不复回<br>君不见高堂明镜悲白发<br>朝如青丝暮成雪<br>人生得意须尽欢<br>莫使金樽空对月<br>天生我材必有用<br>千金散尽还复来<br>烹羊宰牛且为乐<br>会须一饮三百杯",
        english: "Do you not see the Yellow River come from the sky<br>Rushing to the sea, never to return?<br>Do you not see the bright mirror in the high hall grieves over white hair<br>At dawn like black silk, at dusk turns to snow?<br>When life is good, enjoy it to the fullest<br>Don't let the golden cup face the moon empty<br>Heaven gave me talent, it must be useful<br>Spend a thousand pieces of gold, they'll come back again<br>Cook lamb and slaughter oxen for joy<br>We must drink three hundred cups at once",
        romanian: "Nu vezi cum Fluviul Galben vine din cer<br>Grăbindu-se spre mare, niciodată să nu se întoarcă?<br>Nu vezi cum oglinda strălucitoare din sala înaltă se întristează pentru părul alb<br>În zori ca mătasea neagră, în amurg se transformă în zăpadă?<br>Când viața este bună, bucură-te din plin<br>Nu lăsa cupa de aur să privească luna goală<br>Cerul mi-a dat talent, trebuie să fie folositor<br>Cheltuiește o mie de bucăți de aur, vor veni din nou<br>Gătește miel și junghie boi pentru bucurie<br>Trebuie să bem trei sute de căni dintr-o dată"
    },
    {
        id: "hard-road-to-shu",
        title: { en: "The Hard Road to Shu", ro: "Drumul greu către Shu", zh: "蜀道难" },
        chinese: "噫吁嚱，危乎高哉<br>蜀道之难，难于上青天<br>蚕丛及鱼凫，开国何茫然<br>尔来四万八千岁，不与秦塞通人烟<br>西当太白有鸟道，可以横绝峨眉巅<br>地崩山摧壮士死，然后天梯石栈相钩连",
        english: "Oh my! How perilous and high!<br>The road to Shu is harder than climbing to the blue sky<br>Can Cong and Yu Fu founded the kingdom in a daze<br>For 48,000 years, no traffic with Qin's frontier<br>To the west, there's a bird path over Mount Taibai<br>That can cross the peak of Mount Emei<br>The earth collapsed, mountains crumbled, warriors died<br>Then sky ladders and stone plank roads were linked together",
        romanian: "O, Doamne! Cât de periculos și de înalt!<br>Drumul către Shu este mai greu decât să urci pe cerul albastru<br>Can Cong și Yu Fu au fondat regatul în ceață<br>Timp de 48.000 de ani, niciun trafic cu frontiera Qin<br>La vest, există o potecă de păsări peste Muntele Taibai<br>Care poate traversa vârful Muntelui Emei<br>Pământul s-a prăbușit, munții s-au sfărâmat, războinicii au murit<br>Apoi scările cerului și drumurile de piatră au fost legate între ele"
    }
];

function getCurrentPoem() {
    return poemsData[currentPoemIndex];
}

function updatePoemDisplay() {
    const poem = getCurrentPoem();
    const currentLang = localStorage.getItem("currentLanguage") || "en";
    
    const titleEl = document.getElementById("poem-title");
    if (titleEl) {
        if (currentLang === "en") titleEl.innerHTML = poem.title.en;
        else if (currentLang === "ro") titleEl.innerHTML = poem.title.ro;
        else titleEl.innerHTML = poem.title.zh;
    }
    
    const chineseEl = document.getElementById("poem-chinese");
    if (chineseEl) chineseEl.innerHTML = poem.chinese;
    
    const englishEl = document.getElementById("poem-english");
    if (englishEl) {
        if (currentLang === "zh") {
            englishEl.style.display = "none";
        } else {
            englishEl.style.display = "block";
            englishEl.innerHTML = currentLang === "en" ? poem.english : poem.romanian;
        }
    }
    
    const poemImage = document.querySelector(".poem-image img");
    if (poemImage) {
        const imageMap = {
            "quiet-night": "daily-quiet-night.png",
            "drinking-alone": "daily-drinking-alone.png",
            "hard-is-the-way": "daily-hard-road.png",
            "to-wang-lun": "daily-to-wang-lun.png",
            "mount-lu": "daily-mount-lu.png",
            "invitation-to-wine": "daily-invitation-to-wine.png",
            "hard-road-to-shu": "daily-hard-road-to-shu.png"
        };
        poemImage.src = imageMap[poem.id] || "daily-quiet-night.png";
    }
}

function setLanguage(lang) {
    localStorage.setItem("currentLanguage", lang);
    window.currentLanguage = lang;
    updatePoemDisplay();
}

// DIRECT Next button handling
document.addEventListener("DOMContentLoaded", function() {
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            currentPoemIndex = (currentPoemIndex + 1) % poemsData.length;
            updatePoemDisplay();
            
            // Update star button in favorites.js
            if (typeof updateStarButton === 'function') {
                updateStarButton();
            }
        });
    }
    
    // Initial display
    updatePoemDisplay();
});

window.poemsData = poemsData;
window.getCurrentPoem = getCurrentPoem;
window.updatePoemDisplay = updatePoemDisplay;
window.setLanguage = setLanguage;
window.currentLanguage = currentLanguage;