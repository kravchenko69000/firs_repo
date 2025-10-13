document.addEventListener("DOMContentLoaded", () => {
  const themeCheckbox = document.getElementById('themeCheckbox');
  const themeLink = document.getElementById('themeLink');

  if (!themeCheckbox || !themeLink) {
    console.warn("⚠️ Не знайдено елементи для перемикача теми!");
    return;
  }

  // Завантажуємо попередню тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    themeLink.setAttribute('href', 'dark.css');
    themeCheckbox.checked = true;
  }

  // Зміна теми при натисканні
  themeCheckbox.addEventListener('change', () => {
    if (themeCheckbox.checked) {
      themeLink.setAttribute('href', 'dark.css');
      localStorage.setItem('theme', 'dark');
    } else {
      themeLink.setAttribute('href', 'light.css');
      localStorage.setItem('theme', 'light');
    }
  });
});



const flags = document.querySelectorAll('.language-widget .flag');
let currentLang = localStorage.getItem('lang') || 'en';

// Функція вибору мови (без переходу на інші сторінки)
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Візуальне виділення вибраного прапора
  flags.forEach(f => f.classList.toggle('selected', f.dataset.lang === lang));

  console.log("Вибрана мова:", lang);
}

// Обробка кліку по прапору
flags.forEach(flag => {
  flag.addEventListener('click', () => setLanguage(flag.dataset.lang));
});

// Ініціалізація при завантаженні
setLanguage(currentLang);



document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
});

// 🔴 Функція виходу
function handleLogout() {
  // Очищення локального сховища
  localStorage.clear();

  // Перехід на головну сторінку
  window.location.href = "index.html"; // Замінити, якщо головна має іншу назву
}
