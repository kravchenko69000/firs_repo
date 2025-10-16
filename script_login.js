document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginMsg = document.getElementById("loginMsg");

  loginBtn.addEventListener("click", async () => {
    const name = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !password) {
      loginMsg.textContent = "⚠️ Введіть ім'я та пароль.";
      loginMsg.style.color = "red";
      return;
    }

    // 🔗 URL Google Apps Script
    const url = `https://script.google.com/macros/s/AKfycbwZTU4tRfdWrVqKlmrQw0GjhWtmsXGWgxrCngb7yt4-XG0ODRSxjsc8S8sVW1aclmTw/exec?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;

    try {
      loginMsg.textContent = "⏳ Перевірка...";
      loginMsg.style.color = "black";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        let loginsHTML = "";

        // Якщо logins — об'єкт, це Admin
        if (typeof data.logins === "Admin") {
          loginsHTML = "<b>Лічильник входів усіх користувачів:</b><br>";
          for (const user in data.logins) {
            loginsHTML += `${user}: ${data.logins[user]} раз(ів)<br>`;
          }
        } else {
          // Для інших користувачів показуємо лише їх власний лічильник
          loginsHTML = "";
        }

        loginMsg.innerHTML = `
          ✅ Вітаю, <b>${data.name}</b>!<br>
          ${loginsHTML}<br><br>
          <b>Ваші файли:</b><br>
          ${data.files.map(f => `<a href="${f}" target="_blank">📁 Завантажити файл</a>`).join("<br>")}
        `;
        loginMsg.style.color = "limegreen";
      } else {
        loginMsg.textContent = `❌ ${data.message}`;
        loginMsg.style.color = "red";
      }
    } catch (err) {
      loginMsg.textContent = "❌ Помилка з'єднання із сервером.";
      loginMsg.style.color = "red";
      console.error(err);
    }
  });
});
