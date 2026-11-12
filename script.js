// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
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

// ОКНО ВЫБОРА СОЦСЕТЕЙ
function openSocialModal() { document.getElementById('social-modal').classList.add('active'); }

function closeSocialModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-btn')) return;
    document.getElementById('social-modal').classList.remove('active');
}

// ОКНО ПРАВИЛ
function openRulesModal() { document.getElementById('rules-modal').classList.add('active'); }

function closeRulesModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close-btn')) return;
    document.getElementById('rules-modal').classList.remove('active');
}

// КОПИРОВАНИЕ IP
function copyIP() {
    var ipText = document.getElementById("server-ip").innerText;
    navigator.clipboard.writeText(ipText).then(function() {
        alert("✅ IP скопирован: " + ipText + "\n\nВставляй его в Minecraft и заходи на сервер!");
    }).catch(function(err) {
        alert("Не удалось скопировать автоматически. Выдели IP вручную: " + ipText);
    });
}

// СКРЫТЫЙ СЧЕТЧИК ПОСЕЩЕНИЙ
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

// ПРОВЕРКА ОНЛАЙНА СЕРВЕРА
async function checkServerOnline() {
    const el = document.getElementById('server-online-status');
    if (!el) return;

    try {
        const response = await fetch('https://api.mcsrvstat.us/3/95.216.92.71:25817');
        const data = await response.json();

        if (data.online) {
            el.innerText = '🟢 Онлайн: ' + data.players.online + ' / ' + data.players.max;
            el.style.color = '#4CAF50'; 
        } else {
            el.innerText = '🔴 Сервер офлайн';
            el.style.color = '#fe0979'; 
        }
    } catch (e) {
        el.innerText = '⚪ Не удалось проверить статус';
    }
}
checkServerOnline();

// КНОПКА ПОДЕЛИТЬСЯ
async function shareSite() {
    const shareData = {
        title: 'RUDI | Официальный сайт',
        text: 'Залетай на мой сайт и на сервер в Майнкрафте!',
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Ошибка при попытке поделиться:', err);
            }
        }
    } else {
        // Запасной вариант для компов (копируем ссылку)
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("✅ Ссылка на сайт скопирована в буфер обмена!");
        } catch (err) {
            alert("Не удалось скопировать ссылку. Скопируй вручную из адресной строки.");
        }
    }
}

// ОПРОС (Демо-режим)
function vote(option) {
    // Убираем выделение со всех кнопок
    document.querySelectorAll('.poll-option').forEach(btn => btn.classList.remove('selected'));
    
    // Подсвечиваем выбранную кнопку
    if (event) {
        event.target.classList.add('selected');
    }
    
    // Показываем сообщение, что голос учтен
    document.getElementById('poll-result').style.display = 'block';
}
