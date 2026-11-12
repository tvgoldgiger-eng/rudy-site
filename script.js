function switchTab(tabId, btnElement) {
    var contents = document.querySelectorAll('.page-content');
    for (var i = 0; i < contents.length; i++) { contents[i].classList.remove('active'); }
    
    var buttons = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < buttons.length; i++) { buttons[i].classList.remove('active'); }
    
    document.getElementById(tabId).classList.add('active');
    if (btnElement) { btnElement.classList.add('active'); }
}

function goToTab(tabId) {
    var btn = Array.from(document.querySelectorAll('.nav-btn')).find(b => {
        if (tabId === 'server') return b.innerText.includes('Сервер');
        if (tabId === 'media') return b.innerText.includes('Медиа');
        return false;
    });
    switchTab(tabId, btn);
}

function openSocialModal() { document.getElementById('social-modal').classList.add('active'); }

function closeSocialModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-btn')) return;
    document.getElementById('social-modal').classList.remove('active');
}

function copyIP() {
    var ipText = document.getElementById("server-ip").innerText;
    navigator.clipboard.writeText(ipText).then(function() {
        alert("✅ IP скопирован: " + ipText + "\n\nВставляй его в Minecraft и заходи на сервер!");
    }).catch(function(err) {
        alert("Не удалось скопировать автоматически. Выдели IP вручную: " + ipText);
    });
}

const counterElement = document.getElementById('secret-counter');
const key = 'rudy-site-visits-v1';
async function updateCounter() {
    try {
        const BASE = "https://countapi.mileshilliard.com/api/v1";
        await fetch(BASE + "/get/" + key);
        let response = await fetch(BASE + "/hit/" + key);
        let data = await response.json();
        counterElement.innerText = "👑 Только для Руди: " + data.value + " визитов";
    } catch (error) {
        console.error("Ошибка счетчика:", error);
        counterElement.innerText = "Статистика недоступна";
    }
}
updateCounter();
