document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "1234"; // 🔒 заміни на свій пароль
  const loginDiv = document.getElementById("login");
  const contentDiv = document.getElementById("content");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const msg = document.getElementById("loginMsg");

  // Функція оновлення вигляду сторінки
  function updateView() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn) {
      loginDiv.style.display = "none";
      contentDiv.style.display = "block";
    } else {
      loginDiv.style.display = "block";
      contentDiv.style.display = "none";
    }
  }

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
