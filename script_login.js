document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginMsg = document.getElementById("loginMsg");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZTU4tRfdWrVqKlmrQw0GjhWtmsXGWgxrCngb7yt4-XG0ODRSxjsc8S8sVW1aclmTw/exec"; // твій Apps Script URL

  loginBtn.addEventListener("click", async () => {
    const name = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !password) {
      loginMsg.textContent = "⚠️ Введіть ім'я та пароль.";
      loginMsg.style.color = "red";
      return;
    }

    const url = `${SCRIPT_URL}?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;

    try {
      loginMsg.textContent = "⏳ Перевірка...";
      loginMsg.style.color = "black";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        // Показати одну кнопку для відкриття звіту
        loginMsg.innerHTML = `
          ✅ Вітаю, <b>${data.name}</b>!<br>
          <button id="showReport" style="
            background-color: orange;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">Показати звіт</button>
        `;
        loginMsg.style.color = "green";

        document.getElementById("showReport").addEventListener("click", () => {
          // Відкриваємо один файл Report.html
          window.open(`${SCRIPT_URL}?file=Report&name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, "_blank");
        });

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
