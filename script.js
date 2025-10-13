document.getElementById("loginBtn").addEventListener("click", () => {
  const passwordInput = document.getElementById("password").value;
  const loginMsg = document.getElementById("loginMsg");

  // Задай свій пароль
  const correctPassword = "1234";

  if (passwordInput === correctPassword) {
    // Перехід на PO_EN.html
    window.location.href = "PO_EN.html";
  } else {
    loginMsg.style.display = "block";
    loginMsg.textContent = "Невірний пароль!";
  }
});

  // Натискання кнопки "Увійти"
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const pw = document.getElementById("password").value;
      if (pw === correctPassword) {
        localStorage.setItem("loggedIn", "true");
        updateView();
      } else {
        msg.textContent = "Невірний пароль!";
        msg.style.display = "block";
      }
    });
  }

  // Натискання кнопки "Вийти"
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      updateView();
    });
  }

  updateView();
});

/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const themeLink = document.getElementById("themeLink");
  const checkbox = document.getElementById("themeCheckbox");

  // При завантаженні сторінки
  const savedTheme = localStorage.getItem("theme") || "light";
  themeLink.href = savedTheme + ".css";
  if (checkbox) checkbox.checked = savedTheme === "dark";

  // Перемикання теми
  if (checkbox) {
    checkbox.addEventListener("change", () => {
      const newTheme = checkbox.checked ? "dark" : "light";
      themeLink.href = newTheme + ".css";
      localStorage.setItem("theme", newTheme);
    });
  }
});
