class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.counter = 0;
    this.lastLogin = null;
  }

  checkPassword(inputPassword) {
    this.counter++;
    if (inputPassword === this.password) {
      this.lastLogin = new Date().toLocaleString();
      console.log(`✅ Вітаю, ${this.name}!`);
      console.log(`🕒 Час входу: ${this.lastLogin}`);
      return true;
    } else {
      console.log("❌ Невірний пароль!");
      return false;
    }
  }

  info() {
    console.log(`👤 ${this.name} | Входів: ${this.counter} | Останній: ${this.lastLogin || "немає"}`);
  }
}

// 🔹 Список користувачів
const users = [
  new User("Vlad", "1234"),
  new User("Robert", "12345")
];

// Пошук користувача за іменем
function findUser(name) {
  return users.find(u => u.name === name);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMsg = document.getElementById("loginMsg");

  loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const user = findUser(username);

    if (!user) {
      loginMsg.style.display = "block";
      loginMsg.textContent = "❌ Користувача не знайдено!";
      return;
    }

    if (user.checkPassword(password)) {
      // ✅ Зберігаємо дані про користувача у sessionStorage
      sessionStorage.setItem("userName", user.name);
      sessionStorage.setItem("loginTime", user.lastLogin);
      sessionStorage.setItem("loginCount", user.counter);

      // Перехід на сторінку PO_EN.html
      window.location.href = "PO_EN.html";
    } else {
      loginMsg.style.display = "block";
      loginMsg.textContent = "❌ Невірний пароль!";
    }
  });

  // Натискання Enter теж запускає логін
  passwordInput.addEventListener("keydown", e => {
    if (e.key === "Enter") loginBtn.click();
  });
});
