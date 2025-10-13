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

// Функція зміни мови та переходу на відповідну сторінку
function setLanguage(lang, redirect = true) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Візуальне виділення вибраного прапора
  flags.forEach(f => f.classList.toggle('selected', f.dataset.lang === lang));

  console.log("Вибрана мова:", lang);

  if (redirect) {
    // Перенаправлення на відповідну сторінку
    const pageMap = {
      en: 'PO_EN.html',
      ru: 'PO_RU.html',
      si: 'PO_SI.html',
      uk: 'PO_UK.html'
    };

    const targetPage = pageMap[lang];
    if (targetPage) {
      window.location.href = targetPage;
    }
  }
}

// Обробка кліку по прапору
flags.forEach(flag => {
  flag.addEventListener('click', () => setLanguage(flag.dataset.lang));
});

// Ініціалізація при завантаженні — лише підсвічування, без переходу
setLanguage(currentLang, false);
