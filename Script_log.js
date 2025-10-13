class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.counter = 0;
    this.loginTimes = []; // масив дат входів
  }

  checkPassword(inputPassword) {
    this.counter++;
    if (inputPassword === this.password) {
      const currentTime = new Date().toLocaleString();
      this.loginTimes.push(currentTime);

      console.log(`✅ Вітаю, ${this.name}!`);
      console.log(`🕒 Час входу: ${currentTime}`);
      return true;
    } else {
      console.log("❌ Невірний пароль!");
      return false;
    }
  }

  info() {
    console.log(`👤 ${this.name} | Входів: ${this.counter} | Всі часи: ${this.loginTimes.join(", ")}`);
  }

  // Метод для експорту даних у масив
  toArray() {
    return [this.name, this.counter, this.loginTimes];
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
      sessionStorage.setItem("loginCount", user.counter);
      sessionStorage.setItem("loginTimes", JSON.stringify(user.loginTimes));

      // 🔹 Створюємо масив усіх користувачів для логування
      const userDataArray = users.map(u => u.toArray());
      console.log("📊 Дані всіх користувачів:");
      console.log(userDataArray);

      // Перехід на сторінку
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
