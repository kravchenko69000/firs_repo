document.addEventListener("DOMContentLoaded", () => {
  const correctPassword = "1234"; // 🔒 заміни на свій пароль

  const loginDiv = document.getElementById("login");
  const contentDiv = document.getElementById("content");
  const loginBtn = document.getElementById("loginBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginMsg = document.getElementById("loginMsg");

  // 🔸 Функція оновлення вигляду
  function updateView() {
    const logged = localStorage.getItem("loggedIn") === "true";
    if (logged) {
      if (loginDiv) loginDiv.style.display = "none";
      if (contentDiv) contentDiv.style.display = "block";
    } else {
      if (loginDiv) loginDiv.style.display = "block";
      if (contentDiv) contentDiv.style.display = "none";
    }
  }

  // 🔸 Обробник кнопки логіну
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const pw = document.getElementById("password").value;
      if (pw === correctPassword) {
        localStorage.setItem("loggedIn", "true");
        if (loginMsg) loginMsg.style.display = "none";
        updateView();
      } else {
        if (loginMsg) {
          loginMsg.textContent = "Невірний пароль!";
          loginMsg.style.display = "block";
        }
      }
    });
  }

  // 🔸 Вихід
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      updateView();
    });
  }

  // 🔸 Кнопка "На головну"
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      location.href = "index.html";
    });
  }

  updateView();
});
