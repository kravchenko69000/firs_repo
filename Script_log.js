class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.counter = 0; // Лічильник спроб входу або відвідувань
  }

  // Метод для перевірки пароля
  checkPassword(inputPassword) {
    if (inputPassword === this.password) {
      console.log(`✅ Вітаю, ${this.name}!`);
      this.counter++;
      return true;
    } else {
      console.log("❌ Невірний пароль!");
      this.counter++;
      return false;
    }
  }

  // Метод для виводу інформації про користувача
  info() {
    console.log(`👤 Користувач: ${this.name}, входів: ${this.counter}`);
  }
}

// 🔹 Приклад використання:
const user1 = new User("Vlad", "1234");

// Імітація входу
user1.checkPassword("1111"); // ❌ Невірний пароль
user1.checkPassword("1234"); // ✅ Вітаю, Vlad!
user1.info(); // 👤 Користувач: Vlad, входів: 2
