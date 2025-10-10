document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
        const password = document.getElementById("password").value;
        const correctPassword = "1234"; // заміни на свій пароль

        if (password === correctPassword) {
            document.getElementById("login").style.display = "none";
            document.getElementById("content").style.display = "block";
        } else {
            alert("Невірний пароль!");
        }
    });
});
