    // === 🌓 Перемикач теми ===
    const themeCheckbox = document.getElementById('themeCheckbox');
    const themeLink = document.getElementById('themeLink');

    // Завантажуємо попередню тему
    if (localStorage.getItem('theme') === 'dark') {
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
