function checkPassword() {
    const password = document.getElementById("password").value;
    const correctPassword = "mysecret"; // 🧩 Тут твій пароль

    if (password === correctPassword) {
        document.getElementById("login").style.display = "none";
        document.getElementById("content").style.display = "block";
    } else {
        alert("Невірний пароль. Спробуйте ще раз.");
    }
}
