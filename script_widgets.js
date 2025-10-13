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
