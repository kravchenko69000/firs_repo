document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginMsg = document.getElementById("loginMsg");
  const fileContainer = document.getElementById("fileContainer");

  loginBtn.addEventListener("click", async () => {
    const name = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !password) {
      loginMsg.textContent = "⚠️ Введіть ім'я та пароль.";
      loginMsg.style.color = "red";
      return;
    }

    const url = `https://script.google.com/macros/s/AKfycbwZTU4tRfdWrVqKlmrQw0GjhWtmsXGWgxrCngb7yt4-XG0ODRSxjsc8S8sVW1aclmTw/exec?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;

    try {
      loginMsg.textContent = "⏳ Перевірка...";
      loginMsg.style.color = "black";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        let loginsHTML = "";

        if (typeof data.logins === "object") {
          loginsHTML = "<b>Лічильник входів усіх користувачів:</b><br>";
          for (const user in data.logins) {
            loginsHTML += `${user}: ${data.logins[user]} раз(ів)<br>`;
          }
        } else {
          loginsHTML = `Ви увійшли ${data.logins} раз(ів).`;
        }

        loginMsg.innerHTML = `
          ✅ Вітаю, <b>${data.name}</b>!<br>
          ${loginsHTML}<br><br>
          <b>Ваші графіки:</b><br>
          ${data.files.map(f => `<button class="openFile" data-file="${f}">Відкрити ${f}</button>`).join("<br>")}
        `;
        loginMsg.style.color = "limegreen";

        // Додаємо події для кнопок відкриття HTML
        document.querySelectorAll(".openFile").forEach(btn => {
          btn.addEventListener("click", () => {
            const fileName = btn.getAttribute("data-file");
            fileContainer.innerHTML = ""; // очистити контейнер
            const iframe = document.createElement("iframe");
            iframe.src = `https://script.google.com/macros/s/AKfycbwZTU4tRfdWrVqKlmrQw0GjhWtmsXGWgxrCngb7yt4-XG0ODRSxjsc8S8sVW1aclmTw/exec?file=${fileName}&name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;
            iframe.width = "100%";
            iframe.height = "600px";
            iframe.style.border = "1px solid #ccc";
            fileContainer.appendChild(iframe);
          });
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
